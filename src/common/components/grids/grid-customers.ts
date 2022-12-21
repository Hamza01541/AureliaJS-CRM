import { dateSort } from './../../../tools/momentjs';
import { GridViewModel } from '../../../abstract/GridViewModel';
import { customElement } from 'aurelia-framework';
import { eventKeys, nameKeys, idKeys } from '../../../constants';

@customElement('grid-customers')
export class CustomersGrid extends GridViewModel {
    elementsName = nameKeys.customers;
    elementIdKey = idKeys.customerId;
    addEventKey = eventKeys.addCustomer;
    pageSize = 10;
    dateSort = dateSort('modifiedDate');

    constructor(...deps) {
        //@ts-ignore
        super(...deps)
    }
}