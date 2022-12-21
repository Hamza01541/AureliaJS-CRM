import { customElement, bindable } from "aurelia-framework";
import { nonEmpty, digitsOnly } from '../../../tools/validators';
import { ModifyFormViewModel } from '../../../abstract/ModifyFormViewModel';
import { enums } from "../../../constants";

@customElement('form-modify-project')
export class ModifyProjectForm extends ModifyFormViewModel {

    formBasis = {
        customerId: {
            content: '',
            rules: [],
        },
        opportunityId: {
            content: '',
            rules: [],
        },
        quoteId: {
            content: '',
            rules: [],
        },
        orderId: {
            content: '',
            rules: [],
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

    @bindable pickera;
    @bindable pickerb;

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

    pickerbChanged() {
        this.pickera.events.onChange = e => this.form.startDate.content = e.date;
        this.pickerb.events.onChange = e => this.form.dueDate.content = e.date;

        this.pickera.methods.clear();
        this.pickerb.methods.clear();


        this.datepickersOff();
    }

    hydrateDatepickers() {
        this.pickera.methods.date(this.form.submitDecisionDate.content);
        this.pickerb.methods.date(this.form.submitDate.content);
    }

    datepickersOff() {
        this.pickera.methods.disable();
        this.pickerb.methods.disable();
    }

    datepickersOn() {
        this.pickera.methods.enable();
        this.pickerb.methods.enable();
    }
}