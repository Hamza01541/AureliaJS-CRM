import { HTTP } from '.././../../services/http';
import { customElement, bindable, inject } from "aurelia-framework";
import { clone } from 'ramda';
import { validateField, validateForm, isFormValid } from "../../../tools/formCore";
import { ContextStore } from '../../../services/ContextStore';
import { nonEmpty, digitsOnly } from '../../../tools/validators';
import { encodeForm } from '../../../tools/encode';
import { enums, emptyElement, rootUserId } from '../../../constants';

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
        content: 'quote#',
        isInvalid: false,
        rules: [nonEmpty],
    },
    description: {
        content: 'hello there',
        isInvalid: false,
        rules: [nonEmpty],
    },
    quoteStatus: {
        content: '',
        options: Object.keys(enums.quoteStatus),
        isInvalid: false,
        rules: [nonEmpty],
    },
    submitDecisionDate: {
        content: '',
        isInvalid: false,
        rules: [nonEmpty],
    },
    submitDate: {
        content: '',
        isInvalid: false,
        rules: [nonEmpty],
    },
    clientDecisionDate: {
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
    assignedTo: {
        content: rootUserId,
        isInvalid: false,
        rules: [nonEmpty],
    },
};


@customElement('form-add-quote')
@inject(HTTP, ContextStore)
export class AddQuoteForm {

    @bindable success: any;
    form: any;
    currentState: 'A_fetching' | 'B_customer' | 'C_opportunity' | 'D_complete';
    totalOpportunityOptions = [];
    pickedCustomer: any;
    // Cannot use uppercase
    @bindable pickera;
    @bindable pickerb;
    @bindable pickerc;

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
    pickercChanged() {
        this.pickera.events.onChange = e => this.form.submitDecisionDate.content = e.date;
        this.pickerb.events.onChange = e => this.form.submitDate.content = e.date;
        this.pickerc.events.onChange = e => this.form.clientDecisionDate.content = e.date;

        this.pickera.methods.clear();
        this.pickerb.methods.clear();
        this.pickerc.methods.clear();
    }

    pickLocals() {
        this.pickLocalCustomer()
        if (this.store.context.opportunity) {
            this.pickLocalOpportunity();
        }
    }

    pickLocalCustomer() {
        const customer = this.store.context.customer;
        this.pickedCustomer = customer;
        this.form.customer.content = customer;
        this.form.customer.options = [customer];
        this.form.opportunity.options = customer.opportunities;

        this.form.customer.isDisabled = true;
        this.currentState = 'C_opportunity';
    }

    pickLocalOpportunity() {
        this.form.opportunity.content = this.store.context.opportunity;
        this.form.quote.options = this.pickedCustomer.quotes;

        this.form.opportunity.isDisabled = true;
        this.currentState = 'D_complete';
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
            this.form.opportunity.options = customer.opportunities;
            this.currentState = 'C_opportunity';
        }
    }

    chooseOpportunity = () => {
        this.currentState = 'D_complete';
    }

    goBackToCustomer() {
        if (this.isCurrentStateLaterThan('B')) {
            this.form.opportunity.content = emptyElement;
            this.form.opportunity.options = [];

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

    submitForm(compiled) {
        this.http.fetchWrapper('createQuote', '', compiled)
            .then(createdElement => createdElement && this.success({ payload: createdElement }));
    }

    validateField(fieldName) {
        this.form = validateField(fieldName, this.form);
    }

    isCurrentStateLaterThan(stateLetter) {
        return this.currentState[0] > stateLetter;
    }
}