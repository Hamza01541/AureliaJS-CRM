import { inject } from 'aurelia-framework';
import { HTTP } from '../services/http';
import { ContextStore } from '../services/ContextStore';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { eventKeys } from '../constants';
import { uriQuery } from '../tools/uriQuery';
import { activationStrategy } from 'aurelia-router';
import { capitalize } from '../tools/other';

@inject(HTTP, ContextStore, EventAggregator)
export abstract class DetailsViewModel {
    sub: Subscription;
    getMethod: string;
    elementName: string;
    elementId: string;

    isGridShown = {
        comments: false,
        opportunities: false,
        contacts: false,
        quotes: false,
        orders: false,
        invoices: false,
    };

    constructor(
        private http: HTTP,
        private store: ContextStore,
        private eve: EventAggregator
    ) {
        this.http = http;
        this.store = store;
        this.eve = eve;

        const [elementName, _, elementId] = uriQuery();
        this.elementName = elementName;
        this.elementId = elementId;
        this.getMethod = 'get' + capitalize(elementName);
    }

    attached() {
        this.prep();
        this.eve.publish(eventKeys.forceModalExit);
        this.sub = this.eve.subscribe(eventKeys.contextReload, this.prep);
    }

    detached() {
        this.sub.dispose();
    }

    prep = async () => {
        const ctx = await this.http.fetchWrapper(this.getMethod, this.elementId);
        
        if (!!ctx && ctx !== []) {
            var el = ctx[0][this.elementName];
            this.store.context = ctx[0];
            this.store.context.tasks = el['tasks']
            this.store.context.comments = el['comments']
        }
    }

    toggleGrid(gridName) {
        this.isGridShown[gridName] = !this.isGridShown[gridName];
    }

    determineActivationStrategy() {
        return activationStrategy.replace;
    }
}