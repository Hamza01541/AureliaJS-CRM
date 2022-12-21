import { HTTP } from '.././../../services/http';
import { customElement, bindable, inject } from "aurelia-framework";
import { clone } from 'ramda';
import { validateField, validateForm, isFormValid } from "../../../tools/formCore";
import { ContextStore } from '../../../services/ContextStore';
import { nonEmpty, digitsOnly } from '../../../tools/validators';
import { encodeForm } from '../../../tools/encode';
import { enums, emptyElement } from '../../../constants';

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
    quote: {
        content: emptyElement,
        isInvalid: false,
        rules: [nonEmpty],
        options: [],
        isDisabled: false
    },
    name: {
        content: 'order#',
        isInvalid: false,
        rules: [nonEmpty],
    },
    description: {
        content: 'hello there',
        isInvalid: false,
        rules: [nonEmpty],
    },
    offerDate: {
        content: '',
        isInvalid: false,
        rules: [nonEmpty],
    },
    signDate: {
        content: '',
        isInvalid: false,
        rules: [nonEmpty],
    },
    isBoardApproval: {
        content: false,
        isInvalid: false,
        rules: [],
    },
    boardApprovalDate: {
        content: '',
        isInvalid: false,
        rules: [nonEmpty],
        isExcluded: true
    },
    currency: {
        content: '',
        options: Object.keys(enums.currency),
        isInvalid: false,
        rules: [nonEmpty],
    },
    orderStatus: {
        content: '',
        options: [],
        isInvalid: false,
        rules: [nonEmpty],
    },
    amount: {
        content: '150',
        isInvalid: false,
        rules: [nonEmpty, digitsOnly],
    },
};


@customElement('form-add-order')
@inject(HTTP, ContextStore)
export class AddOrderForm {

    @bindable success: any;
    form: any;
    currentState: 'A_fetching' | 'B_customer' | 'C_opportunity' | 'D_quote' | 'E_complete';
    totalOpportunityOptions = [];
    totalQuoteOptions = [];
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
        this.pickera.events.onChange = e => this.form.offerDate.content = e.date;
        this.pickerb.events.onChange = e => this.form.signDate.content = e.date;
        this.pickerc.events.onChange = e => this.form.boardApprovalDate.content = e.date;

        this.pickera.methods.clear();
        this.pickerb.methods.clear();
        this.pickerc.methods.clear();
    }


    pickLocals() {
        this.pickLocalCustomer()
        if (this.store.context.opportunity) {
            this.pickLocalOpportunity();
            if (this.store.context.quote) {
                this.pickLocalQuote();
            }
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
        this.currentState = 'D_quote';
    }

    pickLocalQuote() {
        this.form.quote.content = this.store.context.quote;
        this.form.order.options = this.pickedCustomer.orders;

        this.form.quote.isDisabled = true;
        this.currentState = 'E_complete';
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
        const opportunity = this.form.opportunity.content;
        const quotes = this.pickedCustomer.quotes;
        this.form.quote.options = quotes.filter(q => q.opportunityId === opportunity.id);

        this.currentState = 'D_quote';
    }

    chooseQuote = () => {
        this.currentState = 'E_complete';
    }

    goBackToCustomer() {
        if (this.isCurrentStateLaterThan('B')) {
            this.form.quote.content = emptyElement;
            this.form.opportunity.content = emptyElement;

            this.form.quote.options = [];
            this.form.opportunity.options = [];

            this.currentState = 'B_customer';
        }
    }

    goBackToOpportunity() {
        if (this.isCurrentStateLaterThan('C')) {
            this.form.quote.content = emptyElement;

            this.form.quote.options = [];

            this.currentState = 'C_opportunity';
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
        console.log(this.form);
    }

    submitForm(compiled) {
        this.http.fetchWrapper('createOrder', '', compiled)
            .then(createdElement => createdElement && this.success({ payload: createdElement }));
    }

    validateField(fieldName) {
        this.form = validateField(fieldName, this.form);
    }

    isCurrentStateLaterThan(stateLetter) {
        return this.currentState[0] > stateLetter;
    }

    evaluateDatepickerShowStatus() {
        this.form.boardApprovalDate.isExcluded = !this.form.isBoardApproval.content;
    }
}