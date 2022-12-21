import { enums } from "../constants";
import { tail, head } from "ramda";

export const raiseError = message => { throw new Error(message) };

export const isKnownEnum = name => Object.keys(enums).includes(name);

export const isDateInName = name => name.toLowerCase
    ? name.toLowerCase().includes('date')
    : false;

//@ts-ignore
export const capitalize = str => head(str).toUpperCase() + tail(str);
