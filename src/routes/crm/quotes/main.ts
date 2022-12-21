import { MainViewModel } from '../../../abstract/MainViewModel';
import { nameKeys } from '../../../constants';

export class QuotesMain extends MainViewModel {

    elementsName = nameKeys.quotes;
    getMethodName = 'getQuotes';

    constructor(...deps) {
        //@ts-ignore
        super(...deps);
    }
}