import { error, API_FAILURE } from '../tools/alert';
import { identity, prop } from 'ramda';
import 'isomorphic-fetch';
import { fullMerge } from '../tools/obj';

const log = response => { console.log(response); return response; }
const json = response => response.json();
const takeResult = response => {
console.log("**Response:", response);
    if (response.status && response.status !== 'Success') {
        // console.error(response.result);
        console.error(response.result.InnerException.Message);
        return undefined;

    } else {
        return response.result;
    }
}


const loggerCatcher = e => { console.error(e); return undefined };
const standardCatcher = _ => { error(API_FAILURE); return undefined };
const silentCatcher = identity;

const GET = { method: 'GET' };
const POST = { method: 'POST' };
const PUT = { method: 'PUT' };
const DELETE = { method: 'DELETE' };

const jsonContent = { headers: { 'Content-Type': 'application/json' } };
const bodify = x => x
    ? [{ body: JSON.stringify(x) }]
    : [];

const controllers = {
    customer: 'Customer/',
    contact: 'Contact/',
    document: 'Document/',
    invoice: 'Invoice/',
    opportunity: 'Opportunity/',
    order: 'Order/',
    quote: 'Quote/',
    task: 'Task/',
    expense: 'Expense/',
    project: 'Project/',
    comment: 'Comment/',
}

export class HTTP {
    private baseURL: string;
    private token: string;

    public methodsMap = {
        //#region 
        getCustomer: {
            name: '',
            controller: controllers.customer,
            config: [GET],
            extractionSteps: [identity],
        },
        getCustomers: {
            name: '',
            controller: controllers.customer,
            config: [GET],
            extractionSteps: [identity],
        },
        createCustomer: {
            name: '',
            controller: controllers.customer,
            config: [POST, jsonContent],
            extractionSteps: [identity],
        },
        modifyCustomer: {
            name: '',
            controller: controllers.customer,
            config: [PUT, jsonContent],
            extractionSteps: [identity],
        },
        deleteCustomer: {
            name: '',
            controller: controllers.customer,
            config: [DELETE],
            extractionSteps: [identity],
        },
        //#endregion
        //#region 
        getInvoice: {
            name: '',
            controller: controllers.invoice,
            config: [GET],
            extractionSteps: [identity],
        },
        getInvoices: {
            name: '',
            controller: controllers.invoice,
            config: [GET],
            extractionSteps: [identity],
        },
        createInvoice: {
            name: '',
            controller: controllers.invoice,
            config: [POST, jsonContent],
            extractionSteps: [identity],
        },
        modifyInvoice: {
            name: '',
            controller: controllers.invoice,
            config: [PUT, jsonContent],
            extractionSteps: [identity],
        },
        deleteInvoice: {
            name: '',
            controller: controllers.invoice,
            config: [DELETE],
            extractionSteps: [identity],
        },
        //#endregion
        //#region 
        getOpportunity: {
            name: '',
            controller: controllers.opportunity,
            config: [GET],
            extractionSteps: [identity],
        },
        getOpportunities: {
            name: '',
            controller: controllers.opportunity,
            config: [GET],
            extractionSteps: [identity],
        },
        createOpportunity: {
            name: '',
            controller: controllers.opportunity,
            config: [POST, jsonContent],
            extractionSteps: [identity],
        },
        modifyOpportunity: {
            name: '',
            controller: controllers.opportunity,
            config: [PUT, jsonContent],
            extractionSteps: [identity],
        },
        deleteOpportunity: {
            name: '',
            controller: controllers.opportunity,
            config: [DELETE],
            extractionSteps: [identity],
        },
        //#endregion
        //#region 
        getOrder: {
            name: '',
            controller: controllers.order,
            config: [GET],
            extractionSteps: [identity],
        },
        getOrders: {
            name: '',
            controller: controllers.order,
            config: [GET],
            extractionSteps: [identity],
        },
        createOrder: {
            name: '',
            controller: controllers.order,
            config: [POST, jsonContent],
            extractionSteps: [log],
        },
        modifyOrder: {
            name: '',
            controller: controllers.order,
            config: [PUT, jsonContent],
            extractionSteps: [identity],
        },
        deleteOrder: {
            name: '',
            controller: controllers.order,
            config: [DELETE],
            extractionSteps: [identity],
        },
        //#endregion
        //#region 
        getContact: {
            name: '',
            controller: controllers.contact,
            config: [GET],
            extractionSteps: [identity],
        },
        getContacts: {
            name: '',
            controller: controllers.contact,
            config: [GET],
            extractionSteps: [identity],
        },
        createContact: {
            name: '',
            controller: controllers.contact,
            config: [POST, jsonContent],
            extractionSteps: [identity],
        },
        modifyContact: {
            name: '',
            controller: controllers.contact,
            config: [PUT, jsonContent],
            extractionSteps: [identity],
        },
        deleteContact: {
            name: '',
            controller: controllers.contact,
            config: [DELETE],
            extractionSteps: [identity],
        },
        //#endregion
        //#region 
        getQuote: {
            name: '',
            controller: controllers.quote,
            config: [GET],
            extractionSteps: [identity],
        },
        getQuotes: {
            name: '',
            controller: controllers.quote,
            config: [GET],
            extractionSteps: [identity],
        },
        createQuote: {
            name: '',
            controller: controllers.quote,
            config: [POST, jsonContent],
            extractionSteps: [identity],
        },
        modifyQuote: {
            name: '',
            controller: controllers.quote,
            config: [PUT, jsonContent],
            extractionSteps: [identity],
        },
        deleteQuote: {
            name: '',
            controller: controllers.quote,
            config: [DELETE],
            extractionSteps: [identity],
        },
        //#endregion
        //#region 
        getTask: {
            name: '',
            controller: controllers.task,
            config: [GET],
            extractionSteps: [identity],
        },
        getTasksAssigned: {
            name: '',
            controller: controllers.task,
            config: [GET],
            extractionSteps: [identity],
        },
        getTasks: {
            name: '',
            controller: controllers.task,
            config: [GET],
            extractionSteps: [identity],
        },
        createTask: {
            name: '',
            controller: controllers.task,
            config: [POST, jsonContent],
            extractionSteps: [identity],
        },
        modifyTask: {
            name: '',
            controller: controllers.task,
            config: [PUT, jsonContent],
            extractionSteps: [identity],
        },
        endTask: {
            name: '',
            controller: controllers.task,
            config: [PUT, jsonContent],
            extractionSteps: [identity],
        },
        deleteTask: {
            name: '',
            controller: controllers.task,
            config: [DELETE],
            extractionSteps: [identity],
        },
        //#endregion
        //#region 
        getComment: {
            name: '',
            controller: controllers.comment,
            config: [GET],
            extractionSteps: [identity],
        },
        getComments: {
            name: '',
            controller: controllers.comment,
            config: [GET],
            extractionSteps: [identity],
        },
        createComment: {
            name: '',
            controller: controllers.comment,
            config: [POST, jsonContent],
            extractionSteps: [identity],
        },
        modifyComment: {
            name: '',
            controller: controllers.comment,
            config: [PUT, jsonContent],
            extractionSteps: [identity],
        },
        endComment: {
            name: '',
            controller: controllers.comment,
            config: [PUT, jsonContent],
            extractionSteps: [identity],
        },
        deleteComment: {
            name: '',
            controller: controllers.comment,
            config: [DELETE],
            extractionSteps: [identity],
        },
        //#endregion
        getProject: {
            name: '',
            controller: controllers.project,
            config: [GET],
            extractionSteps: [identity],
        },
        getProjects: {
            name: '',
            controller: controllers.project,
            config: [GET],
            extractionSteps: [identity],
        },
        createProject: {
            name: '',
            controller: controllers.project,
            config: [POST, jsonContent],
            extractionSteps: [identity],
        },
        modifyProject: {
            name: '',
            controller: controllers.project,
            config: [PUT, jsonContent],
            extractionSteps: [identity],
        },
        endComProject: {
            name: '',
            controller: controllers.project,
            config: [PUT, jsonContent],
            extractionSteps: [identity],
        },
        deleteProject: {
            name: '',
            controller: controllers.project,
            config: [DELETE],
            extractionSteps: [identity],
        },
        //#endregion
    }

    constructor() {
        // this.baseURL = localStorage.getItem('LITE_apiURL');

        this.baseURL = localStorage.getItem('LITE_apiURL');
        if (this.baseURL == null) {
            this.baseURL = "https://flexiprojectslightapi.ciss.pl/api/"
            localStorage.setItem("LITE_apiURL",this.baseURL);
        }

        this.token = localStorage.getItem('LITE_token');
    }

    fetchWrapper(methodKey, q = "", payload = undefined) {
        const method = prop(methodKey, this.methodsMap);
        !method && console.log(`[HTTP] no controller of key ${methodKey} found, check spelling with tools/http.ts`);

        const uri = this.baseURL + method.controller + method.name + q;
        const config = fullMerge(method.config.concat(bodify(payload)));
        console.log(`[HTTP] fetching ${uri}`);

        return fetch(uri, config)
            .then(json)
            .then(takeResult)
            // .then(method.extractionSteps[0])
            .catch(loggerCatcher)
            // .catch(standardCatcher)
            ;
    }

    get isAuthenticated() {
        return !!this.token;
    }

    get authHeaders() {
        return { headers: { 'Authorization': 'Bearer ' + this.token } };
    }
}