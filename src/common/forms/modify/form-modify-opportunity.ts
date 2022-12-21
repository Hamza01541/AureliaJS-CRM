import { customElement, bindable } from "aurelia-framework";
import { nonEmpty, digitsOnly } from '../../../tools/validators';
import { ModifyFormViewModel } from '../../../abstract/ModifyFormViewModel';
import { enums } from "../../../constants";

@customElement('form-modify-opportunity')
export class ModifyOpportunityForm extends ModifyFormViewModel {

    formBasis = {
        customerId: {
            content: '',
            rules: [],
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
        opportunityStatus: {
            content: '',
            options: Object.keys(enums.opportunityStatus),
            isInvalid: false,
            rules: [nonEmpty],
        },
    };

    @bindable pickera: any;

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

    pickeraChanged() {
        this.pickera.events.onChange = e => this.form.dueDate.content = e.date;
        this.pickera.methods.clear();
        this.datepickersOff();
    }

    hydrateDatepickers() {
        this.pickera.methods.date(this.form.dueDate.content);
    }

    datepickersOff() {
        this.pickera.methods.disable();
    }

    datepickersOn() {
        this.pickera.methods.enable();
    }
}