import { HTTP } from './../../../services/http';
import { customElement, bindable, inject } from "aurelia-framework";
import { clone } from 'ramda';
import { validateField, validateForm, isFormValid } from "../../../tools/formCore";
import { nonEmpty } from '../../../tools/validators';
import { encodeForm } from '../../../tools/encode';
import { rootAccountParentId, rootUserId } from '../../../constants';

const _form = {
    name: {
        content: '',
        isInvalid: false,
        rules: [nonEmpty],
        isDisplayed: true
    },
    startDate: {
        content: '',
        start: '2018-06-03',
        isInvalid: false,
        rules: [nonEmpty],
        isDisplayed: true
    },
    endDate: {
        content: '',
        end: '2018-06-04',
        isInvalid: false,
        rules: [nonEmpty],
        isDisplayed: true
    },
    type: {
        content: [],
        isInvalid: false,
        rules: [nonEmpty],
        options: [
            { id: 1, name: 'Meeting' },
            { id: 2, name: 'Party' },
            { id: 3, name: 'Phone' }
        ]
    },
    realisationBy: {
        content: [],
        isInvalid: false,
        rules: [nonEmpty],
        options: [
            { id: 1, name: 'Owner' },
            { id: 2, name: 'Manager' },
            { id: 3, name: 'Employee' }
        ]
    },
    inProgress: {
        content: [],
        isInvalid: false,
        rules: [nonEmpty],
        options: [
            { id: 1, name: 'completed' },
            { id: 2, name: 'Hold' },
            { id: 3, name: 'Delay' }
        ]
    },
    customers: {
        content: [],
        isInvalid: false,
        rules: [nonEmpty],
        options: [
            { id: 1, name: 'David' },
            { id: 2, name: 'John' },
            { id: 3, name: 'Mark' }
        ]
    },
    contacts: {
        content: [],
        isInvalid: false,
        rules: [nonEmpty],
        options: [
            { id: 1, firstName: 'abc' },
            { id: 2, firstName: 'fgh' },
            { id: 3, firstName: 'xyz' }
        ]
    },
    comments: {
        content: [],
        isInvalid: false,
        rules: [nonEmpty],
        options: [
            { id: 1, comment: 'Good' },
            { id: 2, comment: 'fair' },
            { id: 3, comment: 'fail' }
        ]
    },
};

@customElement('form-add-task')
@inject(HTTP)
export class addTaskForm {

    @bindable success: any;
    form: any
    ddselectedItem: any[] = [];
    enteredStartDate: any;
    enteredEndDate: any;
    products: any[] = [
        { id: '0', name: 'Motherboard' },
        { id: '1', name: 'CPU' },
        { id: '2', name: 'Memory' },
    ];

    constructor(
        private http: HTTP,
    ) { }

    attached() {
        this.form = clone(_form);
        console.log("this.form:", this.form);
    }

    submitIfValid() {
        if (isFormValid(this.form)) {
            console.log('Before Encode: ', this.form);
            const readyForSubmission = encodeForm(this.form);
            console.log("*readyForSubmission:", readyForSubmission);
            this.submitForm(readyForSubmission);
        }
    }

    runValidation() {
        this.form = validateForm(this.form);
    }

    submitForm(readyForSubmission) {
        console.log("*readyForSubmission:", readyForSubmission)
        this.http.fetchWrapper('createTask', '', readyForSubmission)
            .then(createdTask => createdTask && this.success({ payload: createdTask }));
    }

    validateField(fieldName) {
        this.form = validateField(fieldName, this.form);
    }

    // addPhoneField() {
    //     if (this.form.phone2.isExluded) {
    //         this.form.phone2.isExcluded = false;
    //     } else {
    //         this.form.phone3.isExcluded = false;
    //     }
    // }

    // removePhoneField2() {
    //     this.form.phone2.content = '';
    //     this.form.phone2.isExcluded = true;
    // }

    // removePhoneField3() {
    //     this.form.phone3.content = '';
    //     this.form.phone3.isExcluded = true;
    // }
}