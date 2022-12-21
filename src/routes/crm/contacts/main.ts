import { MainViewModel } from '../../../abstract/MainViewModel';
import { nameKeys } from '../../../constants';

export class ContactsMain extends MainViewModel {

    elementsName = nameKeys.contacts;
    getMethodName = 'getContacts';

    constructor(...deps) {
        //@ts-ignore
        super(...deps);
    }
}