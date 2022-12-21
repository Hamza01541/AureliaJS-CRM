import { dateSort } from './../../../tools/momentjs';
import { GridViewModel } from '../../../abstract/GridViewModel';
import { customElement } from 'aurelia-framework';
import { eventKeys, nameKeys, idKeys } from '../../../constants';
import { routes } from '../../../app';

import * as $ from 'jquery';
import 'fullcalendar';

@customElement('grid-calendars')
export class CalendarsGrid extends GridViewModel {
    elementsName = nameKeys.tasks;
    elementIdKey = idKeys.taskId;
    addEventKey = eventKeys.addTask;
    pageSize = 10;
    dateSort = dateSort('modifiedDate');

    today = new Date();
    currentTasks: any[];
    selectedTask: any;
    displayCalendar: boolean = true;
    calendar;

    constructor(...deps) {
        //@ts-ignore
        super(...deps);
    }

    attached() {
        let __this = this;
        this.sub = this.eve.subscribe(eventKeys.contextReady, __this.extractElements.bind(this));

        this.calendar = ($('#calendar') as any)
        this.calendar.fullCalendar({
            height: 420,
            showNonCurrentDates: true,
            selectable: true,
            defaultDate: __this.today,
            defaultView: 'month',
            month: {
                titleFormat: 'MMMM YYYY'
            },
            header: {
                left: 'prev',
                center: 'title',
                right: ' next',
            },
            events: __this.elements,
            select: function (date) {
                __this.eve.publish('selectedDate', date);
            },
        });
    }

    extractElements = context => {
        this.elements = context[this.elementsName];
        this.convertData();
        this.calendar.fullCalendar('renderEvents', this.elements, true);
    }

    convertData() {
        if (this.elements && this.elements != undefined && this.elements.length > 0) {
            let uniqueObj = this.elements.map(item => item.dateStart.slice(0, 10)).filter((value, index, self) => self.indexOf(value) === index);
            uniqueObj.forEach(element => {
                let uniqueElements = this.elements.find(x => x.dateStart.slice(0, 10) === element);
                uniqueElements.rendering = 'background';
            });
            var data = $.map(this.elements, function (obj) {
                obj.start = obj.start || obj.dateStart.slice(0, 10);
                return obj;
            });
            console.log("ConvertedData:", data);
            return this.elements = data;
        }
    }
}