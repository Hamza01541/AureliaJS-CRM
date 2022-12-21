import { MainViewModel } from '../../../abstract/MainViewModel';
import { nameKeys } from '../../../constants';

export class InvoicesMain extends MainViewModel {

    elementsName = nameKeys.invoices;
    getMethodName = 'getInvoices';

    constructor(...deps) { 
        //@ts-ignore
        super(...deps);
    }
}