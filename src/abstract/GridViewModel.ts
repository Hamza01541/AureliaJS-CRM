import { inject } from 'aurelia-framework';
import { HTTP } from '../services/http';
import { Navigation } from '../services/navigation';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { eventKeys } from '../constants';
import { decodeElementForGridDisplay } from '../tools/decode';
import { find, prop, dropLast } from 'ramda';
import { capitalize } from '../tools/other';

@inject(HTTP, Navigation, EventAggregator)
export abstract class GridViewModel {
    abstract pageSize: number;
    abstract elementsName: string;
    abstract elementIdKey: string;
    abstract addEventKey: string;

    elements = [];
    lastSelected = undefined;
    sub: Subscription;

    constructor(
        private http: HTTP,
        private nav: Navigation,
        public eve: EventAggregator
    ) { }

    inspect() {
        console.log(this);
    }

    attached() {

        this.sub = this.eve.subscribe(eventKeys.contextReady, this.extractElements.bind(this));
    }

    detached() {
        if (this.sub) {
            this.sub.dispose();
        }
    }

    extractElements = context => {
        const elements = context[this.elementsName];
        if (elements) {
            this.elements = elements.map(decodeElementForGridDisplay);
        }
    }

    setLastSelected(x) {
        this.lastSelected = x;
    }

    goToLastSelected() {
        this.nav.goToDetails(
            this.elementIdKey,
            this.lastSelected.id
        );
    }

    launchAddModal = () => {
        this.eve.publish(this.addEventKey);
        this.sub = this.eve.subscribe(eventKeys.modalExit, payload => payload && this.eve.publish(eventKeys.contextReload));
    }


    removeSelected = () => {
        const deleteMethod = 'delete' + capitalize(dropLast(2, this.elementIdKey));
        this.http.fetchWrapper(deleteMethod, this.lastSelected.id)
            .then(id => id && this.eve.publish(eventKeys.contextReload));
    }

    get isAllDeselected() {
        return !find(prop('$isSelected'), this.elements);
    }
}