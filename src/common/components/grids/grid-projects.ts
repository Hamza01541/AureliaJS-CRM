import { dateSort } from './../../../tools/momentjs';
import { GridViewModel } from '../../../abstract/GridViewModel';
import { customElement } from 'aurelia-framework';
import { eventKeys, nameKeys, idKeys } from '../../../constants';
import { routes } from '../../../app';

@customElement('grid-projects')
export class ProjectsGrid extends GridViewModel {
    elementsName = nameKeys.projects;
    elementIdKey = idKeys.projectId;
    addEventKey = eventKeys.addProject;
    pageSize = 10;
    dateSort = dateSort('modifiedDate');

    constructor(...deps) {
        //@ts-ignore
        super(...deps)
    }
}