import { dateSort } from './../../../tools/momentjs';
import { GridViewModel } from '../../../abstract/GridViewModel';
import { customElement } from 'aurelia-framework';
import { eventKeys, nameKeys, idKeys } from '../../../constants';
import { routes } from '../../../app';

@customElement('grid-contacts')
export class ContactsGrid extends GridViewModel {
    elementsName = nameKeys.contacts;
    elementIdKey = idKeys.contactId;
    addEventKey = eventKeys.addContact;
    pageSize = 10;
    dateSort = dateSort('modifiedDate');

    constructor(...deps) {
        //@ts-ignore
        super(...deps)
    }
}