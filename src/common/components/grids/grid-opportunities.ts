import { dateSort } from './../../../tools/momentjs';
import { GridViewModel } from '../../../abstract/GridViewModel';
import { customElement } from 'aurelia-framework';
import { eventKeys, nameKeys, idKeys } from '../../../constants';
import { routes } from '../../../app';

@customElement('grid-opportunities')
export class OpportunitiesGrid extends GridViewModel {
    elementsName = nameKeys.opportunities;
    elementIdKey = idKeys.opportunityId;
    addEventKey = eventKeys.addOpportunity;
    pageSize = 10;
    dateSort = dateSort('modifiedDate');

    constructor(...deps) {
        //@ts-ignore
        super(...deps)
    }
}