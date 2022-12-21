import { last, dropLast } from 'ramda';
import { Functor } from './functor';

// [ElementName, ElementIdKey, ID]
export const uriQuery = () => {
    const currentURI = window.location.href;
    const splitLast = substr => str => last(str.split(substr));
    const split = substr => str => str.split(substr);
    const addName = ([a, b]) => [dropLast(2, a), a, b];

    const value = Functor.of(currentURI)
        .fmap(splitLast('?'))        
        .fmap(splitLast('&'))        
        .fmap(split('='))
        .fmap(addName)
        ;

    return value.payload;
}
