import { customElement, bindable } from 'aurelia-framework';

@customElement('controls-bar')
export class ControlsBar {
    @bindable filter: any; 
    @bindable add: any;
    @bindable edit: any;
    @bindable remove: any;
    @bindable i: any;

    @bindable isFilterDisabled: boolean; 
    @bindable isAddDisabled: boolean;
    @bindable edisabled: boolean;
    @bindable rdisabled: boolean;

}