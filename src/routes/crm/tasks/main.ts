import { MainViewModel } from '../../../abstract/MainViewModel';
import { nameKeys } from '../../../constants';

export class TasksMain extends MainViewModel {
    elementsName = nameKeys.tasks;
    getMethodName = 'getTasks';

    selectedTask: any;

    constructor(...deps) {
        //@ts-ignore
        super(...deps);
    }

    getSelectedTask(id) {
        this.selectedTask = this.elements.find(x => x.id == id);
        if (this.selectedTask) {
            console.log("selectedTask:", this.selectedTask);
        }
    }

}