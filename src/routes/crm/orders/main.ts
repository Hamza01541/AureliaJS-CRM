import { MainViewModel } from '../../../abstract/MainViewModel';
import { nameKeys } from '../../../constants';

export class OrdersMain extends MainViewModel {

    elementsName = nameKeys.orders;
    getMethodName = 'getOrders';

    constructor(...deps) {
        //@ts-ignore
        super(...deps);
    }
}