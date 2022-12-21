import { HTTP } from '.././../../services/http';
import { customElement, bindable, inject } from "aurelia-framework";
import { clone } from 'ramda';
import { validateField, validateForm, isFormValid } from "../../../tools/formCore";
import { ContextStore } from '../../../services/ContextStore';
import { nonEmpty } from '../../../tools/validators';
import { encodeForm } from '../../../tools/encode';

const emptyElement = { name: '' };

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
        content: 'invoice#',
        isInvalid: false,
        rules: [nonEmpty],
    },
};


@customElement('form-add-invoice')
@inject(HTTP, ContextStore)
export class AddInvoiceForm {

    @bindable success: any;
    form: any;
    currentState: 'A_fetching' | 'B_customer' | 'C_opportunity' | 'D_quote' | 'E_order' | 'F_complete';
    flag = false;
    totalOpportunityOptions = [];
    totalQuoteOptions = [];
    totalOrderOptions = [];
    pickedCustomer: any;

    constructor(
        private http: HTTP,
        private store: ContextStore
    ) { }

    inspect() {
        this.flag = true;
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
        this.http.fetchWrapper('createInvoice', '', compiled)
            .then(createdElement => createdElement && this.success({ payload: createdElement }));
    }

    validateField(fieldName) {
        this.form = validateField(fieldName, this.form);
    }

    isCurrentStateLaterThan(stateLetter) {
        return this.currentState[0] > stateLetter;
    }
}