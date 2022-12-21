import { dateSort } from './../../../tools/momentjs';
import { GridViewModel } from '../../../abstract/GridViewModel';
import { customElement } from 'aurelia-framework';
import { eventKeys, nameKeys, idKeys } from '../../../constants';
import { routes } from '../../../app';

@customElement('grid-invoices')
export class InvoicesGrid extends GridViewModel {
    elementsName = nameKeys.invoices;
    elementIdKey = idKeys.invoiceId;
    addEventKey = eventKeys.addInvoice;
    pageSize = 10;
    dateSort = dateSort('modifiedDate');

    constructor(...deps) {
        //@ts-ignore
        super(...deps)
    }
}