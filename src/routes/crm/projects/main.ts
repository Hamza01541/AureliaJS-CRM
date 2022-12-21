import { MainViewModel } from '../../../abstract/MainViewModel';
import { nameKeys } from '../../../constants';

export class ProjectsMain extends MainViewModel {

    elementsName = nameKeys.projects;
    getMethodName = 'getProjects';

    constructor(...deps) {
        //@ts-ignore
        super(...deps);
    }
}