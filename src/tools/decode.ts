import { phone_numbers } from './../constants';
import { mapObjIndexed, isNil, prop, map } from "ramda";
import { Functor } from "./functor";
import { enums } from "../constants";
import { keyForValue } from "./obj";
import { ISOtoddmmyyyy } from "./momentjs";
import { isKnownEnum, isDateInName } from "./other";

// {k: v} -> v -> k -> {k: v}
const hydrateField = element => (fieldValue, fieldName) => {
    const elementValueOnMaybeMatchingField = prop(fieldName, element);

    return isNil(elementValueOnMaybeMatchingField)
        ? { ...fieldValue }
        : { ...fieldValue, content: elementValueOnMaybeMatchingField };
};

const hydrateForm = formBase => element => mapObjIndexed(hydrateField(element), formBase);

const decodeIfWithPhonesList = element => {
    const numbers = element.phoneNumbers;

    if (Array.isArray(numbers)) {
        const [p1, p2, p3] = numbers;
        (numbers.length > 3) && console.warn('[FORM] more than 3 phones');
    
        p1
            ? element.phone1 = p1.number
            : element.phone1 = '';
        p2
            ? element.phone2 = p2.number
            : element.phone2 = '';
        p3
            ? element.phone3 = p3.number
            : element.phone3 = '';
    }

    return element;
};

const decodeIfKnownEnum = (elementPropValue, elementPropName) => {
    const targetedEnum = prop(elementPropName, enums);

    return targetedEnum
        ? keyForValue(elementPropValue, targetedEnum)
        : elementPropValue;
}

const decodeEnums = element => mapObjIndexed(decodeIfKnownEnum, element);

export const decodeElementToForm = (formBase, element) => {
    console.log('[FORM] base form for decoding', formBase);
    const hydrateFormBase = hydrateForm(formBase);

    const decoded = Functor.of(element)
        .inspect('[FORM] decoding started, element input:')
        .fmap(decodeEnums)
        .fmap(decodeIfWithPhonesList)
        .fmap(hydrateFormBase)
        .inspect('[FORM] decoding finished, out form:')
        ;
        
    return decoded.payload;
};


const breedDisplayable$ValueBased = (predicate, f) => obj => {
    const g = (acc, [key, val]) => predicate(val)
        ? { ...acc, ['$' + key]: f(val, key), [key]: val }
        : { ...acc, [key]: val };
    
    return Object.entries(obj).reduce(g, {});
};

const breedDisplayable$KeyBased = (predicate, f) => obj => {
    const g = (acc, [key, val]) => predicate(key)
        ? { ...acc, ['$' + key]: f(val, key), [key]: val }
        : { ...acc, [key]: val };
    
    return Object.entries(obj).reduce(g, {});
};

const rejectNils = obj => {
    const g = (acc, [key, val]) => isNil(val)
        ? { ...acc }
        : { ...acc, [key]: val };
    
    return Object.entries(obj).reduce(g, {});
};

const breed$Dates = breedDisplayable$KeyBased(isDateInName, ISOtoddmmyyyy);
const breed$Enums = breedDisplayable$KeyBased(isKnownEnum, decodeIfKnownEnum);
const breed$Elements = breedDisplayable$ValueBased(e => e.name && e.id && e.isDeleted === false, e => e.name);
const breed$Phones = breedDisplayable$KeyBased(key => key === phone_numbers, map((pn: any) => pn.number));

export const decodeElementForGridDisplay = element => {
    const decoded = Functor.of(element)
        .fmap(rejectNils)
        .fmap(breed$Enums)
        .fmap(breed$Dates)
        .fmap(breed$Elements)
        .fmap(breed$Phones)
        ;
    
    return decoded.payload;
}