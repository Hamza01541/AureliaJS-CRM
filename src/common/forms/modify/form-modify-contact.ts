import { nonEmpty } from "../../../tools/validators";
import { customElement } from "aurelia-framework";
import { ModifyFormViewModel } from "../../../abstract/ModifyFormViewModel";

@customElement('form-modify-contact')
export class ModifyContactForm extends ModifyFormViewModel {

    formBasis = {
        customerId: {
            content: '',
            rules: [nonEmpty],
        },
        name: {
            content: 'contact#',
            isInvalid: false,
            rules: [nonEmpty],
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

    constructor(...deps) {
        //@ts-ignore
        super(...deps)
    }


    isFetchedChanged(isFetched) {
        if (isFetched) {
            this.resolvePhonesExclusion();
        }
    }

    isEditingChanged(isEditing) {
        if (isEditing) {

        } else if (isEditing === false) {
            this.resolvePhonesExclusion();
        }
    }

    addPhoneField() {
        if (this.form.phone2.isExcluded) {
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

    resolvePhonesExclusion() {
        this.form.phone2.isExcluded = !this.form.phone2.content;
        this.form.phone3.isExcluded = !this.form.phone3.content;
    }
}