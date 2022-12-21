import { Navigation } from './services/navigation';
import { Aurelia, PLATFORM, inject } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';
import { values } from 'ramda';

export const routes = {
    home: {
        route: ['', 'home'],
        name: 'home',
        settings: { icon: 'home' },
        moduleId: PLATFORM.moduleName('./routes/home/home'),
        nav: true,
        title: 'Home'
    },
    customers: {
        route: 'customers',
        name: 'customers',
        settings: { icon: 'education' },
        moduleId: PLATFORM.moduleName('./routes/crm/customers/main'),
        nav: true,
        title: 'Customers',
    },
    customerDetails: {
        route: 'customers/details',
        name: 'customerDetails',
        moduleId: PLATFORM.moduleName('./routes/crm/customers/details'),
        nav: false,
        title: 'Customers',
    },
    contacts: {
        route: 'contacts',
        name: 'contacts',
        settings: { icon: 'education' },
        moduleId: PLATFORM.moduleName('./routes/crm/contacts/main'),
        nav: true,
        title: 'Contacts',
    },
    contactDetails: {
        route: 'contacts/details',
        name: 'contactDetails',
        moduleId: PLATFORM.moduleName('./routes/crm/contacts/details'),
        nav: false,
        title: 'Contacts',
    },
    opportunities: {
        route: 'opportunities',
        name: 'opportunities',
        settings: { icon: 'education' },
        moduleId: PLATFORM.moduleName('./routes/crm/opportunities/main'),
        nav: true,
        title: 'Opportunities',
    },
    opportunityDetails: {
        route: 'opportunities/details',
        name: 'opportunityDetails',
        moduleId: PLATFORM.moduleName('./routes/crm/opportunities/details'),
        nav: false,
        title: 'Opportunities',
    },
    quotes: {
        route: 'quotes',
        name: 'quotes',
        settings: { icon: 'education' },
        moduleId: PLATFORM.moduleName('./routes/crm/quotes/main'),
        nav: true,
        title: 'Quotes',
    },
    quoteDetails: {
        route: 'quotes/details',
        name: 'quoteDetails',
        moduleId: PLATFORM.moduleName('./routes/crm/quotes/details'),
        nav: false,
        title: 'Quotes',
    },
    orders: {
        route: 'orders',
        name: 'orders',
        settings: { icon: 'education' },
        moduleId: PLATFORM.moduleName('./routes/crm/orders/main'),
        nav: true,
        title: 'Orders',
    },
    orderDetails: {
        route: 'orders/details',
        name: 'orderDetails',
        moduleId: PLATFORM.moduleName('./routes/crm/orders/details'),
        nav: false,
        title: 'orders',
    },
    projects: {
        route: 'projects',
        name: 'projects',
        settings: { icon: 'education' },
        moduleId: PLATFORM.moduleName('./routes/crm/projects/main'),
        nav: true,
        title: 'Projects',
    },
    projectDetails: {
        route: 'projects/details',
        name: 'projectDetails',
        moduleId: PLATFORM.moduleName('./routes/crm/projects/details'),
        nav: false,
        title: 'projects',
    },
    invoices: {
        route: 'invoices',
        name: 'invoices',
        settings: { icon: 'education' },
        moduleId: PLATFORM.moduleName('./routes/crm/invoices/main'),
        nav: true,
        title: 'Invoices',
    },
    invoiceDetails: {
        route: 'invoices/details',
        name: 'invoiceDetails',
        moduleId: PLATFORM.moduleName('./routes/crm/invoices/details'),
        nav: false,
        title: 'Invoices',
    },
    tasks: {
        route: 'tasks',
        name: 'tasks',
        settings: { icon: 'education' },
        moduleId: PLATFORM.moduleName('./routes/crm/tasks/main'),
        nav: true,
        title: 'Tasks',
    },
    calendar:
    {
        route: 'calendar',
        name: 'calendar',
        settings: { icon: 'lyphicon glyphicon-calendar' },
        moduleId: PLATFORM.moduleName('./routes/crm/calendar/main'),
        nav: true,
        title: 'Calendar'
    },
};

@inject(Navigation)
export class App {
    router: Router;

    constructor(
        private nav: Navigation
    ) { }

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Flexi.Web';
        config.map(values(routes));

        this.router = router;
        this.nav.router = router;
    }
}
