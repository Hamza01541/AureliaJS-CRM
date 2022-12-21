import { dropLast } from 'ramda';
import { Router } from 'aurelia-router';

export class Navigation {
    router: Router

    constructor() { }

    goToDetails(elementIdKey, elementId) {
        const elementName = dropLast(2, elementIdKey) as any;
        this.router.navigateToRoute(elementName + 'Details', { [elementIdKey]: elementId }, { trigger: true });
    }
}