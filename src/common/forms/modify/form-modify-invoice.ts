import { customElement } from "aurelia-framework";
import { nonEmpty } from '../../../tools/validators';
import { ModifyFormViewModel } from '../../../abstract/ModifyFormViewModel';
import { enums } from "../../../constants";

@customElement('form-modify-invoice')
export class ModifyInvoiceForm extends ModifyFormViewModel {

    formBasis = {
        opportunityStatus: {
            content: '',
            options: Object.keys(enums.opportunityStatus),
            isInvalid: false,
            rules: [nonEmpty],
        },
    };

    constructor(...deps) {
        //@ts-ignore
        super(...deps);
    }

    isFetchedChanged(isFetched) {
    }

    isEditingChanged(isEditing) {
    }

}