import { inject, customElement } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { eventKeys } from '../../../constants';

@inject(EventAggregator)
@customElement('modal-handler')    
export class ModalHandler {

    currentModal: string;
    subs: any;

    constructor(
        private eve: EventAggregator
    ) {
        this.currentModal = 'none';
    }

    attached() {
        const makeSub = modalName => this.eve.subscribe(modalName, this.launch(modalName));
        this.subs = Object.keys(eventKeys).map(makeSub);
        
        this.subs.push(this.eve.subscribe(eventKeys.forceModalExit, this.forceExit));
    } 

    detached() {
        this.subs.forEach(s => s.dispose());
    }

    launch = modalName => () =>  {
        console.log(`[MODAL] launch modal ${modalName} requested.`);
        this.currentModal = modalName;
    }

    exit = payload => {
        this.currentModal = 'none';
        this.eve.publish(eventKeys.modalExit, payload);
    }

    forceExit = () => {
        this.currentModal = 'none';
    }
}
