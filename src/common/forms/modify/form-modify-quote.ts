import { ModifyFormViewModel } from "../../../abstract/ModifyFormViewModel";
import { customElement, bindable } from "aurelia-framework";
import { nonEmpty, digitsOnly } from "../../../tools/validators";
import { enums, rootUserId } from "../../../constants";

@customElement('form-modify-quote')
export class ModifyQuoteForm extends ModifyFormViewModel {

    formBasis = {
        customerId: {
            content: '',
            rules: []
        },
        opportunityId: {
            content: '',
            rules: []
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
        quoteStatus: {
            content: '',
            options: Object.keys(enums.quoteStatus),
            isInvalid: false,
            rules: [nonEmpty],
        },
        assignedTo: {
            content: rootUserId,
            isInvalid: false,
            rules: [nonEmpty],
        },
    };

    @bindable pickera;
    @bindable pickerb;
    @bindable pickerc;

    constructor(...deps) { 
        //@ts-ignore
        super(...deps);
    }

    isFetchedChanged(isFetched) {
        if (isFetched) {
            this.hydrateDatepickers();
        }
    }

    isEditingChanged(isEditing) {
        if (isEditing) {
            this.datepickersOn();
            this.hydrateDatepickers();
        } else if (isEditing === false) {
            this.datepickersOff();
            this.hydrateDatepickers();
        }
    }

    pickercChanged() {
        this.pickera.events.onChange = e => this.form.submitDecisionDate.content = e.date;
        this.pickerb.events.onChange = e => this.form.submitDate.content = e.date;
        this.pickerc.events.onChange = e => this.form.clientDecisionDate.content = e.date;

        this.pickera.methods.clear();
        this.pickerb.methods.clear();
        this.pickerc.methods.clear();


        this.datepickersOff();
    }

    hydrateDatepickers() {
        this.pickera.methods.date(this.form.submitDecisionDate.content);
        this.pickerb.methods.date(this.form.submitDate.content);
        this.pickerc.methods.date(this.form.clientDecisionDate.content);
    }

    datepickersOff() {
        this.pickera.methods.disable();
        this.pickerb.methods.disable();
        this.pickerc.methods.disable();
    }

    datepickersOn() {
        this.pickera.methods.enable();
        this.pickerb.methods.enable();
        this.pickerc.methods.enable();
    }
}