import { map, clone, reject } from 'ramda';
import { nameKeys, Context } from './../constants';
import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from 'aurelia-framework';
import { eventKeys } from '../constants';

export const emptyContext: Context = map(() => null, nameKeys);

@inject(EventAggregator)
export class ContextStore {
    _context: Context;

    constructor(
        private eve: EventAggregator
    ) { 
        this.reset();
        //@ts-ignore
        window.store = this;
    }

    private publishContextReady() {
        this.eve.publish(eventKeys.contextReady, this.context);
        //@ts-ignore
        window.context = this.context;
    }

    reset() {
        this._context = emptyContext;
    }

    get context(): Context {
        return clone(this._context);
    }

    set context(obj) {
        if (obj) {
            console.log('[STORE] merging into context:', obj);
            this._context = { ...this._context, ...obj };
            this.publishContextReady();
        } else {
            console.warn('[STORE] received empty object to merge');
        }
    }

    associateWithContext(key, value) {
        this.context = { ...this.context, [key]: value };
    }
}