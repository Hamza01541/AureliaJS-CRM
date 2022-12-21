import { dateSort } from './../../../tools/momentjs';
import { GridViewModel } from '../../../abstract/GridViewModel';
import { customElement } from 'aurelia-framework';
import { eventKeys, nameKeys, idKeys } from '../../../constants';
import { routes } from '../../../app';

@customElement('grid-quotes')
export class QuotesGrid extends GridViewModel {
    elementsName = nameKeys.quotes;
    elementIdKey = idKeys.quoteId;
    addEventKey = eventKeys.addQuote;
    pageSize = 10;
    dateSort = dateSort('modifiedDate');

    constructor(...deps) {
        //@ts-ignore
        super(...deps)
    }
}