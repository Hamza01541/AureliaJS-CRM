import { customElement } from "aurelia-framework";
import { rootUserId } from "../../../constants";
import { nonEmpty } from "../../../tools/validators";
import { ModifyFormViewModel } from "../../../abstract/ModifyFormViewModel";

@customElement('form-modify-customer')
export class ModifyCustomerForm extends ModifyFormViewModel {

    formBasis = {
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
        phone1: {
            content: '',
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
            content: 'mini',
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
        city: {
            content: 'ct',
            isInvalid: false,
            rules: [nonEmpty],
        },
        description: {
            content: 'dc',
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
            this.form.phone3.isExcluded = true;
        }
        
        this.form.phone2.isExcluded = true;
    }

    removePhoneField2() {
        this.form.phone2.isExcluded = false;
        this.form.phone2.content = '';
    }

    removePhoneField3() {
        this.form.phone3.isExcluded = false;
        this.form.phone3.content = '';
    }
    
    resolvePhonesExclusion() {
        this.form.phone2.isExcluded = !this.form.phone2.content;
        this.form.phone3.isExcluded = !this.form.phone3.content;
    }
}