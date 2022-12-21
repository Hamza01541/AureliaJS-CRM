import { ContextStore } from '../../../services/ContextStore';
import { HTTP } from './../../../services/http';
import { customElement, bindable, inject } from "aurelia-framework";
import { clone } from 'ramda';
import { validateField, validateForm, isFormValid } from "../../../tools/formCore";
import { nonEmpty } from '../../../tools/validators';
import { encodeForm } from '../../../tools/encode';
import { emptyElement } from '../../../constants';

const _form = {
    name: {
        content: 'contact#',
        isInvalid: false,
        rules: [nonEmpty],
    },
    customer: {
        content: emptyElement,
        isInvalid: false,
        rules: [nonEmpty],
        options: [],
        isDisabled: false
    },
    email: {
        content: 'a@b.com',
        isInvalid: false,
        rules: [nonEmpty],
    },
    phone1: {
        content: '123',
        isInvalid: false,
        rules: [nonEmpty],
    },
    phone2: {
        content: '',
        isInvalid: false,
        rules: [nonEmpty],
        isExcluded: true
    },
    phone3: {
        content: '',
        isInvalid: false,
        rules: [nonEmpty],
        isExcluded: true
    },
    position: {
        content: 'pos',
        isInvalid: false,
        rules: [nonEmpty],
    },
    department: {
        content: 'dep',
        isInvalid: false,
        rules: [nonEmpty],
    },
    street: {
        content: 'st',
        isInvalid: false,
        rules: [nonEmpty],
    },
    zipCode: {
        content: 'zc',
        isInvalid: false,
        rules: [nonEmpty],

    },
    city: {
        content: 'ct',
        isInvalid: false,
        rules: [nonEmpty],
    },
    country: {
        content: 'co',
        isInvalid: false,
        rules: [nonEmpty],
    },
    region: {
        content: 'reg',
        isInvalid: false,
        rules: [nonEmpty],
    },
    description: {
        content: 'desc',
        isInvalid: false,
        rules: [nonEmpty],
    }
};

@customElement('form-add-contact')
@inject(HTTP, ContextStore)
export class AddContactForm {

    @bindable success: any;
    currentState: 'A_fetching' | 'B_customer' | 'C_complete';
    pickedCustomer: any;
    form: any

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

    pickLocals() {
        this.pickLocalCustomer()
    }

    pickLocalCustomer() {
        const customer = this.store.context.customer;
        this.pickedCustomer = customer;
        this.form.customer.content = customer;
        this.form.customer.options = [customer];

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
        console.log(this.form);
    }

    submitForm(readyForSubmission) {
        this.http.fetchWrapper('createContact', '', readyForSubmission)
            .then(createdElement => createdElement && this.success({ payload: createdElement }));
    }

    validateField(fieldName) {
        this.form = validateField(fieldName, this.form);
    }

    addPhoneField() {
        if (this.form.phone2.Excluded) {
            this.form.phone3.Excluded = true;
        }

        this.form.phone2.Excluded = true;
    }

    removePhoneField2() {
        this.form.phone2.Excluded = false;
        this.form.phone2.content = '';
    }

    removePhoneField3() {
        this.form.phone3.Excluded = false;
        this.form.phone3.content = '';
    }

    isCurrentStateLaterThan(stateLetter) {
        return this.currentState[0] > stateLetter;
    }
}
