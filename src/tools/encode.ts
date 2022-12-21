import { phone_numbers } from './../constants';
import { mapObjIndexed, pluck, props, filter } from "ramda";
import { toISOStringIfMomentObject } from "./momentjs";
import { nameKeys, enums } from "../constants";
import { Functor } from "./functor";

const pluckContents = fm => pluck('content', fm);

const convertMoments = compiledForm =>
    mapObjIndexed(m => toISOStringIfMomentObject(m), compiledForm);

const convertElements = compiledForm => {
    const names = Object.values(nameKeys);
    const withConvertedIds = {};
    for (const [key, value] of Object.entries(compiledForm)) {
        if (names.includes(key)) {
            //@ts-ignore
            withConvertedIds[key + 'Id'] = value.id;
        } else {
            withConvertedIds[key] = value;
        }
    }

    return withConvertedIds;
};

const convertPhones = compiledForm => {
    const mightBePhones = props(['phone1', 'phone2', 'phone3'], compiledForm);

    const phones = mightBePhones.filter(x => !!x);

    const phonesObjList = phones.map(v => ({ number: v }));
    compiledForm[phone_numbers] = phonesObjList;

    return compiledForm;
};

const convertEnum = (fieldValue, fieldName) => {
    const enumLookup = enums[fieldName];
    
    return enumLookup
        ? enumLookup[fieldValue]
        : fieldValue;
};

const convertEnums = compiledForm => mapObjIndexed(convertEnum, compiledForm);

const trim = compiledForm => filter(x => x !== '', compiledForm);

export const encodeForm = form => {
    const encoded = Functor.of(form)
    
        //@ts-ignore
        .fmap(filter(field => !field.isExcluded))
        .inspect('[FORM] encoding')
        .fmap(pluckContents)
        .fmap(convertPhones)
        .fmap(convertMoments)
        .fmap(convertElements)
        .fmap(convertEnums)
        .fmap(trim)
        .inspect('[FORM] encoded')
        ;

    return encoded.payload;
};
