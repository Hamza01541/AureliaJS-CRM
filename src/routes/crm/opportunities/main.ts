import { MainViewModel } from '../../../abstract/MainViewModel';
import { nameKeys } from '../../../constants';

export class OpportunitiesMain extends MainViewModel {

    elementsName = nameKeys.opportunities;
    getMethodName = 'getOpportunities';

    constructor(...deps) {
        //@ts-ignore
        super(...deps);
    }
}