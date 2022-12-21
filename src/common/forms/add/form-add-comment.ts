import { HTTP } from './../../../services/http';
import { customElement, bindable, inject } from "aurelia-framework";
import { clone } from 'ramda';
import { validateField, validateForm, isFormValid } from "../../../tools/formCore";
import { nonEmpty } from '../../../tools/validators';
import { encodeForm } from '../../../tools/encode';
import { uriQuery } from '../../../tools/uriQuery';

const _form = {
    opportunityId: {
        content: '',
        isInvalid: false,
        rules: [nonEmpty],
    },
    quoteId: {
        content: '',
        isInvalid: false,
        rules: [nonEmpty],
    },
    invoiceId: {
        content: '',
        isInvalid: false,
        rules: [nonEmpty],
    },
    contactId: {
        content: '',
        isInvalid: false,
        rules: [nonEmpty],
    },
    customerId: {
        content: '',
        isInvalid: false,
        rules: [nonEmpty],
    },
    orderId: {
        content: '',
        isInvalid: false,
        rules: [nonEmpty],
    },
    context: {
        content: 'an',
        isInvalid: false,
        rules: [nonEmpty],
    },
};

@customElement('form-add-comment')
@inject(HTTP)
export class AddCommentForm {

    @bindable success: any;
    form: any

    constructor(
        private http: HTTP,
    ) { }

    attached() {
        this.initializeForm();
    }

    initializeForm() {
        this.form = clone(_form);

        const [elementId, id] = uriQuery();
        this.form[elementId]['content'] = id;
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
        this.http.fetchWrapper('createComment', '', readyForSubmission)
            .then(created => created && this.success({ payload: created }));
    }

    validateField(fieldName) {
        this.form = validateField(fieldName, this.form);
    }
}