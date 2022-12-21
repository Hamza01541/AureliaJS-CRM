import { inject, observable } from 'aurelia-framework';
import { HTTP } from '../services/http';
import { ContextStore } from '../services/ContextStore';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { Form, eventKeys } from '../constants';
import { clone } from 'ramda';
import { Navigation } from '../services/navigation';
import { isFormValid, validateForm, validateField } from '../tools/formCore';
import { encodeForm } from '../tools/encode';
import { decodeElementToForm } from '../tools/decode';
import { uriQuery } from '../tools/uriQuery';
import { capitalize } from '../tools/other';

@inject(HTTP, ContextStore, EventAggregator, Navigation)
export abstract class ModifyFormViewModel {

    abstract formBasis: Form;

    elementName: string;
    elementId: string;
    elementIdKey: string;
    methodName: string;

    form: Form;
    sub: Subscription;

    @observable isEditing = undefined;
    @observable isFetched = undefined;

    constructor(
        private http: HTTP,
        private store: ContextStore,
        private eve: EventAggregator,
        private nav: Navigation
    ) {
        [this.elementName, this.elementIdKey, this.elementId] = uriQuery();
        this.methodName = 'modify' + capitalize(this.elementName);
    }

    inspect() {
        console.log(this);
    }

    attached() {
        const ready = () => {
            this.form = decodeElementToForm(this.formBasis, this.store.context[this.elementName]);
            this.isFetched = true;
        };

        this.sub = this.eve.subscribe(eventKeys.contextReady, ready);
        this.form = clone(this.formBasis);
    }

    detached() {
        this.sub.dispose();
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

    submitForm = readyForSubmission => {
        const success = () => {
            this.eve.publish(eventKeys.contextReload);
            this.isEditing = false;
        }

        this.http.fetchWrapper(
            this.methodName,
            this.elementId,
            readyForSubmission
        )
            .then(modifiedElement => modifiedElement && success());
    }

    validateField(fieldName) {
        this.form = validateField(fieldName, this.form);
    }

    cancelEditing() {
        this.form = decodeElementToForm(this.formBasis, this.store.context[this.elementName]);
        this.isEditing = false;
    }

    goToDetailsIfReady(targetName) {
        if (this.isReadyForNavigation) {
            const targetIdKey = targetName + 'Id';
            const targetId = this.store.context[targetName]['id'];

            this.nav.goToDetails(targetIdKey, targetId);
        }
    }

    get isReadyForNavigation() {
        return !this.isEditing && this.isFetched;
    }
}