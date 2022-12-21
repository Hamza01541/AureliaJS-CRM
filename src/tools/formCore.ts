import { mapObjIndexed, prop, none, all, pickBy } from "ramda";
import { updateKey } from './obj';

const _validateField = field => ({
    ...field,
    // @ts-ignore
    isInvalid: !all(f => f(field.content), field.rules)
});

const validateFieldIfIncluded = field => field.isExcluded
    ? field
    : _validateField(field);

//@ts-ignore
export const isFormValid = fm => none(prop('isInvalid'), Object.values(fm).filter(f => !f.isExcluded));

export const validateForm = fm => {
    const validatedForm = mapObjIndexed(validateFieldIfIncluded, fm);
    
    if (!isFormValid(validatedForm)) {
        const invalidFields = pickBy(prop('isInvalid'), validatedForm);
        console.log('[FORM] presented form is invalid', validatedForm);
        console.log('[FORM] showing invalid fields', invalidFields);
    }

    return validatedForm;
};

export const validateField = (fieldName, fm) => {
    const newField = _validateField(prop(fieldName, fm));
    const updatedForm = updateKey(fieldName, newField, fm);

    return updatedForm;
};
