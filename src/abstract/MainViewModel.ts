import { inject } from 'aurelia-framework';
import { HTTP } from '../services/http';
import { ContextStore } from '../services/ContextStore';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { eventKeys } from '../constants';

import { decodeElementForGridDisplay } from 'tools/decode';

@inject(HTTP, ContextStore, EventAggregator)
export abstract class MainViewModel {

    sub: Subscription;
    abstract elementsName: string;
    abstract getMethodName: string;

    elements = [];

    constructor(
        private http: HTTP,
        private store: ContextStore,
        public eve: EventAggregator
    ) { }

    activate() {
        this.prep();
        this.eve.publish(eventKeys.forceModalExit);
        this.sub = this.eve.subscribe(eventKeys.contextReload, this.prep);
    }

    detached() {
        this.sub.dispose();
    }

    prep = async () => {
        this.store.reset();
        const elements = await this.http.fetchWrapper(this.getMethodName);
        if (elements) {  
            this.store.associateWithContext(this.elementsName, elements);
            this.elements = elements.map(decodeElementForGridDisplay);
            
        }
    }
}