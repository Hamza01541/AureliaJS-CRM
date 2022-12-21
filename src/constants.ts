export const eventKeys = {
    modalExit: '1',
    forceModalExit: '1',
    contextReady: '2',
    contextReload: '3',
    addCustomer: 'addCustomer',
    addContact: 'addContact',
    addOpportunity: 'addOpportunity',
    addQuote: 'addQuote',
    addOrder: 'addOrder',
    addInvoice: 'addInvoice',
    addTask: 'addTask',
    addProject: 'addProject',
    addExpense: 'addExpense',
    addComment: 'addComment',
};


export const idKeys = {
    customerId: 'customerId',
    contactId: 'contactId',
    opportunityId: 'opportunityId',
    quoteId: 'quoteId',
    orderId: 'orderId',
    invoiceId: 'invoiceId',
    projectId: 'projectId',
    taskId: 'taskId',
    commentId: 'commentId',
};

// Each time you make change run convertElements test
export const nameKeys = {
    customer: 'customer',
    customers: 'customers',
    contact: 'contact',
    contacts: 'contacts',
    opportunity: 'opportunity',
    opportunities: 'opportunities',
    quote: 'quote',
    quotes: 'quotes',
    order: 'order',
    orders: 'orders',
    invoice: 'invoice',
    invoices: 'invoices',
    task: 'task',
    tasks: 'tasks',
    document: 'document',
    documents: 'documents',
    expense: 'expense',
    expenses: 'expenses',
    project: 'project',
    projects: 'projects',
    comment: 'comment',
    comments: 'comments',
};

export interface Context {
    customer?: any;
    customers?: any;
    contact?: any;
    contacts?: any;
    opportunity?: any;
    opportunities?: any;
    quote?: any;
    quotes?: any;
    order?: any;
    orders?: any;
    invoice?: any;
    invoices?: any;
    task?: any;
    tasks?: any;
    document?: any;
    documents?: any;
    expense?: any;
    expenses?: any;
    project?: any;
    projects?: any;
    comment?: any;
    comments?: any;
}

export interface Form {
    customer?: Field;
    contact?: Field;
    opportunity?: Field;
    quote?: Field;
    order?: Field;
    invoice?: Field;
    task?: Field;
    document?: Field;
    expense?: Field;
    project?: Field;
    customerId?: Field;
    contactId?: Field;
    opportunityId?: Field;
    quoteId?: Field;
    orderId?: Field;
    invoiceId?: Field;
    taskId?: Field;
    documentId?: Field;
    expenseId?: Field;
    projectId?: Field;
    buisnessDeveloperId?: Field;
    assignedTo?: Field;
    accountParent?: Field;

    name?: Field;
    accountName?: Field;
    email?: Field;
    position?: Field;
    department?: Field;

    street?: Field;
    zipCode?: Field;
    city?: Field;
    country?: Field;
    region?: Field;

    phone1?: Field;
    phone2?: Field;
    phone3?: Field;

    industry?: Field;
    areaActivity?: Field;
    marketSegment?: Field;
    numberEmployees?: Field;
    webSite?: Field;

    opportunityStatus?: Field;
    quoteStatus?: Field;
    orderStatus?: Field;
    currency?: Field;
    amount?: Field;

    isBoardApproval?: Field;
    boardApprovalDate?: Field;
    startDate?: Field;
    dueDate?: Field;
    signDate?: Field;
    offerDate?: Field;
    submitDecisionDate?: Field;
    submitDate?: Field;
    clientDecisionDate?: Field;

    context?: Field;
    description?: Field;
}

export interface Field {
    content: any,
    rules: Function[],
    
    isInvalid?: boolean,
    isExcluded?: boolean,
    isDisabled?: boolean,
    options?: any[],
}

export const phone_numbers = 'phoneNumbers';

export const rootUserId = '02352ab3-2cba-4986-406b-08d5d691d1a3';
export const rootAccountParentId = '00000000-0000-0000-0000-000000000001';

export const enums = {
    opportunityStatus: {
        open: 0,
        progressing: 1,
        finished: 2,
        lost: 3
    },
    quoteStatus: {
        q1: 0,
        q2: 1,
        q3: 2,
        q4: 3
    },
    orderStatus: {
        o1: 0,
        o2: 1,
        o3: 2,
        o4: 3
    },
    projectStatus: {
        p1: 0,
        p2: 1,
        p3: 2,
        p4: 3
    },
    currency: {
        USD: 0,
        EUR: 1,
        PLN: 2,
    },
    status: {
        s1: 0,
        s2: 1,
        s3: 2,
        s4: 3,
        s5: 4,
        s6: 5
    }
};

export const statusColors = {
    opportunityStatus: {
        open: { 'background-color': 'rgb(100,40,100)' },
        progressing: { 'background-color': 'rgb(100,80,100)' },
        finished: { 'background-color': 'rgb(100,120,100)' },
        lost:{ 'background-color': 'rgb(100,60,100)' },
    },
    quoteStatus: {
        q1: { 'background-color': 'rgb(100,40,100)' },
        q2: { 'background-color': 'rgb(100,80,100)' },
        q3: { 'background-color': 'rgb(100,120,100)' },
        q4: { 'background-color': 'rgb(100,160,100)' },
    },
    orderStatus: {
        o1: { 'background-color': 'rgb(100,40,100)' },
        o2: { 'background-color': 'rgb(100,80,100)' },
        o3: { 'background-color': 'rgb(100,120,100)' },
        o4: { 'background-color': 'rgb(100,160,100)' },
    },
    status: {
        s1: { 'background-color': 'rgb(100,40,100)' },
        s2: { 'background-color': 'rgb(100,80,100)' },
        s3: { 'background-color': 'rgb(100,120,100)' },
        s4: { 'background-color': 'rgb(100,160,100)' },
        s5: { 'background-color': 'rgb(100,200,100)' },
        s6: { 'background-color': 'rgb(100,240,100)' },
    }
}

export const emptyElement = { name: '', id: '' };