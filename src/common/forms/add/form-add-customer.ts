import { HTTP } from './../../../services/http';
import { customElement, bindable, inject } from "aurelia-framework";
import { clone } from 'ramda';
import { validateField, validateForm, isFormValid } from "../../../tools/formCore";
import { nonEmpty } from '../../../tools/validators';
import { encodeForm } from '../../../tools/encode';
import { rootAccountParentId, rootUserId } from '../../../constants';

const _form = {
    buisnessDeveloperId: {
        content: rootUserId,
        isInvalid: false,
        rules: [nonEmpty],
    },
    accountName: {
        content: 'an',
        isInvalid: false,
        rules: [nonEmpty],
    },
    accountParent: {
        content: rootAccountParentId,
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
    industry: {
        content: '',
        isInvalid: false,
        rules: [nonEmpty],
        options: ['none', 'a', 'b'],
    },
    areaActivity: {
        content: 'area X',
        isInvalid: false,
        rules: [nonEmpty],
    },
    marketSegment: {
        content: 'marketsegment',
        isInvalid: false,
        rules: [nonEmpty],
    },
    numberEmployees: {
        content: '123',
        isInvalid: false,
        rules: [nonEmpty],
    },
    webSite: {
        content: 'www',
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
        content: 'region',
        isInvalid: false,
        rules: [nonEmpty],
    },
    description: {
        content: 'dc',
        isInvalid: false,
        rules: [nonEmpty],
    },
};

@customElement('form-add-customer')
@inject(HTTP)
export class addCustomerForm {

    @bindable success: any;
    form: any

    constructor(
        private http: HTTP,
    ) { }

    attached() {
        this.form = clone(_form);
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
        this.http.fetchWrapper('createCustomer', '', readyForSubmission)
            .then(createdCustomer => createdCustomer && this.success({ payload: createdCustomer }));
    }

    validateField(fieldName) {
        this.form = validateField(fieldName, this.form);
    }

    addPhoneField() {
        if (this.form.phone2.isExluded) {
            this.form.phone2.isExcluded = false;
        } else {
            this.form.phone3.isExcluded = false;
        }
    }

    removePhoneField2() {
        this.form.phone2.content = '';
        this.form.phone2.isExcluded = true;
    }

    removePhoneField3() {
        this.form.phone3.content = '';
        this.form.phone3.isExcluded = true;
    }
}