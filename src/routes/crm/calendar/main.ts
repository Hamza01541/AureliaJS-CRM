import { MainViewModel } from '../../../abstract/MainViewModel';
import { nameKeys } from '../../../constants';

export class CalendarMain extends MainViewModel {
    elementsName = nameKeys.tasks;
    getMethodName = 'getTasks';

    currentTasks: any[];
    selectedTask: any;

    constructor(...deps) {
        // @ts-ignore
        super(...deps);
    }

    attached() {
        this.eve.subscribe('selectedDate', date => {
            this.showTasksList(date);
        });
    }

    showTasksList(date) {
        this.currentTasks = [];
        if (this.elements && this.elements != undefined && this.elements.length > 0) {
            this.elements.forEach(element => {
                if (element.dateStart.slice(0, 10) == date.format()) {
                    this.currentTasks.push(element);
                }
            });
        }
        console.log("currentTasks:", this.currentTasks);
    }

    getSelectedTask(id) {
        console.log("selectedTaskId", id);
        this.selectedTask = this.elements.find(x => x.id == id);
        if (this.selectedTask) {
            console.log("selectedTask:", this.selectedTask);
        }
    }

}