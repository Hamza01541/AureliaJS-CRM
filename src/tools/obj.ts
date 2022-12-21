import { prop, mergeDeepRight, pickBy } from "ramda";

export const isObject = x => {
    return x !== null && typeof x === 'object';
};

export const filterObj = (predicate, obj) =>
    Object.keys(obj)
        .filter(key => predicate(prop(key, obj)))
        .reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {});

export const splitObj = keys => obj => {
    let differences = {};
    let matches = {};
    let index = {};
    let idx = 0;
    let len = keys.length;

    while (idx < len) {
        index[keys[idx]] = 1;
        idx += 1;
    }

    for (let prop in obj) {
        if (!index.hasOwnProperty(prop)) {
            differences[prop] = obj[prop];
        } else {
            matches[prop] = obj[prop];
        }
    }
    return [differences, matches];
};

export const dissocMany = keys => obj => pickBy((v, k) => !keys.includes(k), obj);

export const mappendObj = (acc, kvp) => ({ ...acc, ...kvp });

export const keysToObject = (keys, val) => keys.reduce((acc, x) => ({ ...acc, [x]: val }), {})

export const fullMerge = os => os.reduce(mergeDeepRight);

export const renameKey = (oldKey, newKey, { [oldKey]: oldValue, ...others }) => ({
    [newKey]: oldValue,
    ...others
});

export const updateKey = (keyName, newValue, obj) => ({
    ...obj,
    [keyName]: newValue
});

export const fmapKey = (keyName, f, { [keyName]: oldValue, ...others }) => ({
    [keyName]: f(oldValue),
    ...others
});

export const breed = (newKey, oldKey, f) => ({ [oldKey]: oldValue, ...others }) => ({
    [newKey]: f(oldValue),
    [oldKey]: oldValue,
    ...others
});

export const reduceObjCurried = f => obj => Object.entries(obj).reduce(f, {});
    
export const reduceObj = (f, obj) => Object.entries(obj).reduce(f, {});

export const keyForValue = (value, obj) => {
    for (const key of Object.keys(obj)) {
        if (value === obj[key]) {
            return key;
        }
    }
    console.error('Key for value function should find a key! Check if', obj, 'could have key for value', value)
}