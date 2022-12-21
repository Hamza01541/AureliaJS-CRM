import { HTTP } from '.././../../services/http';
import { customElement, bindable, inject } from "aurelia-framework";
import { clone } from 'ramda';
import { ContextStore } from '../../../services/ContextStore';
import * as moment from 'moment';
import { nonEmpty, digitsOnly } from '../../../tools/validators';
import { validateField, validateForm, isFormValid } from '../../../tools/formCore';
import { enums, emptyElement } from '../../../constants';
import { encodeForm } from '../../../tools/encode';

const _form = {
    customer: {
        content: emptyElement,
        isInvalid: false,
        rules: [nonEmpty],
        options: [],
        isDisabled: false
    },
    opportunity: {
        content: emptyElement,
        isInvalid: false,
        rules: [nonEmpty],
        options: [],
        isDisabled: false
    },
    name: {
        content: 'opportunity#',
        isInvalid: false,
        rules: [nonEmpty],
    },
    description: {
        content: 'hello there',
        isInvalid: false,
        rules: [nonEmpty],
    },
    opportunityStatus: {
        content: '',
        options: Object.keys(enums.opportunityStatus),
        isInvalid: false,
        rules: [nonEmpty],
    },
    dueDate: {
        content: '',
        isInvalid: false,
        rules: [nonEmpty],
    },
    currency: {
        content: '',
        options: Object.keys(enums.currency),
        isInvalid: false,
        rules: [nonEmpty],
    },
    amount: {
        content: '150',
        isInvalid: false,
        rules: [nonEmpty, digitsOnly],
    },
};


@customElement('form-add-opportunity')
@inject(HTTP, ContextStore)
export class AddOpportunityForm {

    @bindable success: any;
    form: any;
    currentState: 'A_fetching' | 'B_customer' | 'C_complete';
    pickedCustomer: any;
    // Cannot use uppercase
    @bindable pickera;

    constructor(
        private http: HTTP,
        private store: ContextStore
    ) { }

    inspect() {
        console.log(this);
    }

    attached() {
        this.initializeForm();
    }

    initializeForm() {
        this.form = clone(_form);

        this.store.context.customer
            ? this.pickLocals()
            : this.requestCustomerOptions();
    }

    // despite the name it is called only once when binding takes place
    pickeraChanged() {
        this.pickera.events.onChange = e => this.form.dueDate.content = e.date;
        this.pickera.methods.clear();
    }

    pickLocals() {
        this.pickLocalCustomer()
    }

    pickLocalCustomer() {
        const customer = this.store.context.customer;
        this.pickedCustomer = customer;
        this.form.customer.content = customer;
        this.form.customer.options = [customer];
        this.form.opportunity.options = customer.opportunities;

        this.form.customer.isDisabled = true;
        this.currentState = 'C_complete';
    }

    requestCustomerOptions = async () => {
        this.currentState = 'A_fetching';
        const customers = await this.http.fetchWrapper('getCustomers');

        if (customers) {
            this.form.customer.options = customers;
            this.currentState = 'B_customer';
        }
    }

    chooseCustomer = async () => {
        const customer = await this.http.fetchWrapper('getCustomer', this.form.customer.content.id);

        if (customer) {
            this.pickedCustomer = customer;
            this.currentState = 'C_complete';
        }
    }

    goBackToCustomer() {
        if (this.isCurrentStateLaterThan('B')) {
            this.currentState = 'B_customer';
        }
    }

    submitIfValid() {
        if (isFormValid(this.form)) {
            const readyForSubmission = encodeForm(this.form);
            this.submitForm(readyForSubmission);
        }
    }

    runValidation() {
        this.form = validateForm(this.form);
    }

    submitForm(readyForSubmission) {
        this.http.fetchWrapper('createOpportunity', '', readyForSubmission)
            .then(createdElement => createdElement && this.success({ payload: createdElement }));
    }

    validateField(fieldName) {
        this.form = validateField(fieldName, this.form);
    }

    isCurrentStateLaterThan(stateLetter) {
        return this.currentState[0] > stateLetter;
    }
}