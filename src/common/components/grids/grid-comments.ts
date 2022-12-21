import { dateSort } from './../../../tools/momentjs';
import { GridViewModel } from '../../../abstract/GridViewModel';
import { customElement } from 'aurelia-framework';
import { eventKeys, nameKeys, idKeys } from '../../../constants';
import { routes } from '../../../app';

@customElement('grid-comments')
export class CommentsGrid extends GridViewModel {
    elementsName = nameKeys.comments;
    elementIdKey = idKeys.commentId;
    addEventKey = eventKeys.addComment;
    pageSize = 10;
    dateSort = dateSort('modifiedDate');

    constructor(...deps) {
        //@ts-ignore
        super(...deps)
    }
}