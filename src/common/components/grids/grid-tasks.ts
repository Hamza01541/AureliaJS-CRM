import { dateSort } from './../../../tools/momentjs';
import { GridViewModel } from '../../../abstract/GridViewModel';
import { customElement } from 'aurelia-framework';
import { eventKeys, nameKeys, idKeys } from '../../../constants';
import { routes } from '../../../app';

@customElement('grid-tasks')
export class TasksGrid extends GridViewModel {
    elementsName = nameKeys.tasks;
    elementIdKey = idKeys.taskId;
    addEventKey = eventKeys.addTask;
    pageSize = 10;
    dateSort = dateSort('modifiedDate');

    constructor(...deps) {
       
        //@ts-ignore
        super(...deps)
      
    }
}