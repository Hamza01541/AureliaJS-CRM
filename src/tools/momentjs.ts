import * as moment from 'moment';

const ISOto = (date, fmt) => moment(date).format(fmt).toLocaleString()
export const ISOtoddmmyyyy = date => ISOto(date, 'DD.MM.YYYY');

export const isMoment = obj => moment.isMoment(obj);

export const toISOStringIfMomentObject = obj => {
    return moment.isMoment(obj)
        ? obj.toISOString()
        : obj;
}

export const dateSort = propName => (a, b, sortOrder) => {
    const date1 = moment(a[propName]);
    const date2 = moment(b[propName]);

    if (date1.isBefore(date2)) {
        return -1 * sortOrder;
    }

    return 1 * sortOrder;
}