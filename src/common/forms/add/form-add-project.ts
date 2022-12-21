import { HTTP } from '.././../../services/http';
import { customElement, bindable, inject } from "aurelia-framework";
import { clone } from 'ramda';
import { ContextStore } from '../../../services/ContextStore';
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
    quote: {
        content: emptyElement,
        isInvalid: false,
        rules: [nonEmpty],
        options: [],
        isDisabled: false
    },
    order: {
        content: emptyElement,
        isInvalid: false,
        rules: [nonEmpty],
        options: [],
        isDisabled: false
    },
    name: {
        content: 'project#',
        isInvalid: false,
        rules: [nonEmpty],
    },
    description: {
        content: 'hello there',
        isInvalid: false,
        rules: [nonEmpty],
    },
    projectStatus: {
        content: '',
        options: Object.keys(enums.projectStatus),
        isInvalid: false,
        rules: [nonEmpty],
    },
    startDate: {
        content: '',
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
    projectManager: {
        content: 'projectManager',
        isInvalid: false,
        rules: [nonEmpty],
    },
};


@customElement('form-add-project')
@inject(HTTP, ContextStore)
export class AddProjectForm {

    @bindable success: any;
    form: any;
    currentState: 'A_fetching' | 'B_customer' | 'C_opportunity' | 'D_quote' | 'E_order' | 'F_complete';
    flag = false;
    totalOpportunityOptions = [];
    totalQuoteOptions = [];
    totalOrderOptions = [];
    pickedCustomer: any;

    @bindable pickera;
    @bindable pickerb;

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
    pickerbChanged() {
        this.pickera.events.onChange = e => this.form.startDate.content = e.date;
        this.pickerb.events.onChange = e => this.form.dueDate.content = e.date;

        this.pickera.methods.clear();
        this.pickerb.methods.clear();
    }

    pickLocals() {
        this.pickLocalCustomer()
        if (this.store.context.opportunity) {
            this.pickLocalOpportunity();
            if (this.store.context.quote) {
                this.pickLocalQuote();
                if (this.store.context.order) {
                    this.pickLocalOrder();
                }
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
        this.currentState = 'E_order';
    }

    pickLocalOrder() {
        this.form.order.content = this.store.context.order;

        this.form.order.isDisabled = true;
        this.currentState = 'F_complete';
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
        const quote = this.form.quote.content;
        const orders = this.pickedCustomer.orders;
        this.form.order.options = orders.filter(o => o.quoteId === quote.id);

        this.currentState = 'E_order';
    }

    chooseOrder = () => {
        this.currentState = 'F_complete';
    }

    goBackToCustomer() {
        if (this.isCurrentStateLaterThan('B')) {
            this.form.order.content = emptyElement;
            this.form.quote.content = emptyElement;
            this.form.opportunity.content = emptyElement;

            this.form.order.options = [];
            this.form.quote.options = [];
            this.form.opportunity.options = [];

            this.currentState = 'B_customer';
        }
    }

    goBackToOpportunity() {
        if (this.isCurrentStateLaterThan('C')) {
            this.form.order.content = emptyElement;
            this.form.quote.content = emptyElement;

            this.form.order.options = [];
            this.form.quote.options = [];

            this.currentState = 'C_opportunity';
        }
    }

    goBackToQuote() {
        if (this.isCurrentStateLaterThan('D')) {
            this.form.order.content = emptyElement;
            this.form.quote.content = emptyElement;

            this.form.order.options = [];
            this.form.quote.options = [];

            this.currentState = 'D_quote';
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
        this.http.fetchWrapper('createProject', '', compiled)
            .then(createdElement => createdElement && this.success({ payload: createdElement }));
    }

    validateField(fieldName) {
        this.form = validateField(fieldName, this.form);
    }

    isCurrentStateLaterThan(stateLetter) {
        return this.currentState[0] > stateLetter;
    }
}