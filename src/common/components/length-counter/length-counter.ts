import { empty } from './../../../tools/maybe';
import { eventKeys } from './../../../constants';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { customElement, inject, bindable } from "aurelia-framework";
import { ContextStore } from '../../../services/ContextStore';
import { nameKeys } from '../../../constants';
import { prop } from 'ramda';

const possibleTargets = nameKeys;

@customElement('length-counter')
@inject(ContextStore, EventAggregator)
export class LengthCounter {

    @bindable title;
    @bindable targetname;
    count: any;
    sub: Subscription;

    constructor(
        private store: ContextStore,
        private eve: EventAggregator,
    ) { }

    attached() {
        this.sub = this.eve.subscribe(eventKeys.contextReady, this.prep);
    }

    prep = () => {
        this.count = this.store.context[this.targetname].length;
    }

    detached() {
        this.sub.dispose();
    }

    get displayedText() {
        return this.count
            ? `${this.title} (${this.count})`
            : this.title;
        }
}