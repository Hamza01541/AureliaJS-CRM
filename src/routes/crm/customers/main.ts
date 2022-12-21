import { MainViewModel } from '../../../abstract/MainViewModel';
import { nameKeys } from '../../../constants';

export class CustomersMain extends MainViewModel {

    elementsName = nameKeys.customers;
    getMethodName = 'getCustomers';

    constructor(...deps) {
        //@ts-ignore
        super(...deps);
    }
}