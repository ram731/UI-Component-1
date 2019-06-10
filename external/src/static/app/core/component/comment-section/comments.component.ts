import { Component, Input, Output, IterableDiffers, DoCheck, EventEmitter } from '@angular/core';
import { Utils } from '../../../shared/Utils';

/**
 * Display(s) comments at page AND/OR section level.
 * 
 * Page level comments are handled by BaseController and AppComponent.
 * 
 * CommentsComponent needs to be included implicitly for enabling section level comments.
 * 
 * @Input reviewList : review list array having following structure -
 * 
 * {"error_fields":null,"system_error":null,"error_code_list":null,"next_page":null,"previous_page":null,"alert_message":null,"alert_header":null,"alert_type":null,"permitId":null,"glbReqId":null,"pathName":null,"reviewList":[{"error_fields":null,"system_error":null,"error_code_list":null,"requestIdno":"588","appIdno":null,"status":"AREQ","comments":"comments not requried for the facility reporitng period","reviewDate":null,"reviewedBy":null,"currentInd":"C","pageId":null,"entityIdno":null,"changeInd":null},{"error_fields":null,"system_error":null,"error_code_list":null,"requestIdno":"588","appIdno":null,"status":"AREQ","comments":"Previous comments","reviewDate":null,"reviewedBy":null,"currentInd":"P","pageId":null,"entityIdno":null,"changeInd":null}],"opcertHeaderDetails":{"globalReqId":"9240","globalReqStatus":null,"action":null}}
 * 
 * @Input defaultClass : CSS class name. Allowed values 'comments' (page level) & 'section-comments' (section level). Defulat value 'comments' if not passed explicitly.
 * 
 * @returns editEvt : This event is triggered when user clicks on 'EDIT'. For page level Edit action 'editEvt' is captured in AppComponent & 'approveEdit' for respective page is called.
 * 
 */
@Component({
    selector: 'comments',
    templateUrl: './comments.component.html'
})
export class CommentsComponent implements DoCheck {

    @Input('reviewList')
    reviewList: any[] = [];

    @Input('defaultClass')
    defaultClass: string = "comments";

    @Input('isPageLevel')
    isPageLevel: boolean = true;

    @Output('editEvt')
    editEvent = new EventEmitter();
    approveStatus: any = null;
    differ: any;

    constructor(private utils: Utils, differs: IterableDiffers) {
        this.differ = differs.find([]).create(null);
    }

    ngDoCheck() {
        const change = this.differ.diff(this.reviewList);
        if (change) {

            if (change.collection && change.collection.length > 0) {
                this.approveStatus = this.utils.getStatusDetails(change.collection[0].status);
            }

        }

    }

    editPage() {
        this.editEvent.emit('editclick');
    }

}