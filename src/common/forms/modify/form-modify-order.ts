import { customElement, bindable } from "aurelia-framework";
import { ModifyFormViewModel } from "../../../abstract/ModifyFormViewModel";
import { nonEmpty, digitsOnly } from "../../../tools/validators";
import { enums } from "../../../constants";

@customElement('form-modify-order')
export class ModifyOrderForm extends ModifyFormViewModel {

    formBasis = {
        customerId: {
            content: '',
            rules: [nonEmpty],
        },
        quoteId: {
            content: '',
            rules: [nonEmpty],
        },
        name: {
            content: 'an',
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
            content: true,
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
        amount: {
            content: '150',
            isInvalid: false,
            rules: [nonEmpty, digitsOnly],
        },
        orderStatus: {
            content: '',
            options: Object.keys(enums.orderStatus),
            isInvalid: false,
            rules: [nonEmpty],
        }
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
            //@ts-ignore
            // this.form.boardApprovalDate.isExcluded = !this.store.context.order.isBoardApproval;
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
        this.pickera.events.onChange = e => this.form.offerDate.content = e.date;
        this.pickerb.events.onChange = e => this.form.signDate.content = e.date;
        this.pickerc.events.onChange = e => this.form.boardApprovalDate.content = e.date;

        this.pickera.methods.clear();
        this.pickerb.methods.clear();
        this.pickerc.methods.clear();


        this.datepickersOff();
    }

    hydrateDatepickers() {
        this.pickera.methods.date(this.form.offerDate.content);
        this.pickerb.methods.date(this.form.signDate.content);
        this.pickerc.methods.date(this.form.boardApprovalDate.content);
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

    evaluateDatepickerShowStatus() {
        this.form.boardApprovalDate.isExcluded = !this.form.isBoardApproval.content;
    }
}