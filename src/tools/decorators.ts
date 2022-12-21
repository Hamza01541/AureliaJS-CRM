import { isNil } from 'ramda';

// export function inspect(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
//     const originalMethod = descriptor.value; // save a reference to the original method

//     // NOTE: Do not use arrow syntax here. Use a function expression in 
//     // order to use the correct value of `this` in this method (see notes below)
//     console.log(descriptor);
//     console.log(target);

//     descriptor.value = function (...args: any[]) {
//         // pre
//         console.log('The method args are: ' + JSON.stringify(args));
//         // run and store result
//         const result = originalMethod.apply(this, args);
//         // post
//         console.log('The return value is: ' + result);
//         // return the result of the original method (or modify it before returning)
//         return result;
//     };

//     return descriptor;
// }

export function log(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    const originalMethod = descriptor.value;
    
    console.log(target, descriptor, propertyKey);

    descriptor.value = function (...args: any[]) {
        console.log(`[${'form'.toUpperCase()}] ${originalMethod.name}`);
        console.log('$', args);
        const result = originalMethod.apply(this, args);
        console.log('=>>', result);
        return result;
    };

    return descriptor;
}


export function nilGuard(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        if (args.every(arg => !isNil(arg))) {
            const result = originalMethod.apply(this, args);
            return result;
        } else {
            return undefined;
        }
    };

    return descriptor;
}