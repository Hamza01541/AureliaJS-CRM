import { dateSort } from './../../../tools/momentjs';
import { GridViewModel } from '../../../abstract/GridViewModel';
import { customElement } from 'aurelia-framework';
import { eventKeys, nameKeys, idKeys } from '../../../constants';
import { routes } from '../../../app';

@customElement('grid-orders')
export class OrdersGrid extends GridViewModel {
    elementsName = nameKeys.orders;
    elementIdKey = idKeys.orderId;
    addEventKey = eventKeys.addOrder;
    pageSize = 10;
    dateSort = dateSort('modifiedDate');

    constructor(...deps) {
        //@ts-ignore
        super(...deps)
    }
}