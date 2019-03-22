import { AfterViewInit, Component, Input, OnInit, AfterViewChecked, OnChanges, SimpleChange } from "@angular/core";
import { BaseControllerComponent } from "../../core/basecontroller.component";
import { MyDeqErrorHandler } from "../../shared/errorHandler";
import { Utils } from "../../shared/Utils";
import { ReviewSectionText } from "./review-page-text";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HistoryComponent } from "./history/history.component";
import * as _ from 'lodash';
import { LoggerService } from "../../shared/lib/logger/logger-service.component";

export interface ReviewComponentDetails {
    defaultID:string,
    reviewHeader?: string,
    reviewStatuses: any[],
    currentReviewStatus?: string,
    prevReviewStatus?: string,
    showEdit?: boolean,
    showHistory?: boolean,
    reviewHistoryHeader?: string,
    commentHeader?: string,
    comments?: string,
    leftBtnTxt?: string,
    rightBtnTxt?: string,
    rightBtnAction?: Function,
    reviewHistory?: any[],
    additionalDetails?: any,
    reviewDate?:string,
    reviewedBy?:string
}

@Component({
    selector: 'review-component',
    templateUrl: './review.component.html'
})
export class ReviewComponent extends BaseControllerComponent implements AfterViewInit, OnInit {

    @Input('reviewComponentDetails') reviewComponentDetails: ReviewComponentDetails;

    _reviewComponentDetails: ReviewComponentDetails;

    startEdit: boolean = false;
    optionError: boolean = false;
    commentError: boolean = false;
    private reviewStatuses= [{ code: 'NDEF', desc: this.pageText.lbl_no_defeciencies },
    { code: 'PDEF', desc: this.pageText.lbl_potential_defeciencies },
    { code: 'AREQ', desc: this.pageText.lbl_additional_request },
    { code: null, desc: this.pageText.lbl_previously_reviewed }];


    constructor(protected errorHandler: MyDeqErrorHandler,
        protected utils: Utils,
        protected modalService: NgbModal,
        protected logger:LoggerService) {
        super(errorHandler, new ReviewSectionText());
    }

    ngOnInit() {      

        if (!this.reviewComponentDetails) {

            this._reviewComponentDetails = {
                defaultID:'0',
                reviewHeader: this.pageText.lbl_review,
                reviewStatuses: this.reviewStatuses,
                currentReviewStatus: null,
                prevReviewStatus: 'N/A',
                showEdit: true,
                showHistory: true,
                reviewHistoryHeader: this.pageText.lbl_history,
                commentHeader: this.pageText.lbl_comments,
                comments: null,
                leftBtnTxt: this.pageText.cancel,
                rightBtnTxt: this.pageText.save,
                rightBtnAction: null,
                reviewHistory: [],
                additionalDetails: null,
                reviewDate: null,
                reviewedBy: null,

            }
        } else {
                this.logger.debug('=>',this.reviewComponentDetails.showEdit)
            this._reviewComponentDetails = {
                defaultID:this.reviewComponentDetails.defaultID ? this.reviewComponentDetails.defaultID : '0',
                reviewHeader: this.reviewComponentDetails.reviewHeader ? this.reviewComponentDetails.reviewHeader : this.pageText.lbl_review,
                reviewStatuses: this.reviewComponentDetails.reviewStatuses ? this.reviewComponentDetails.reviewStatuses : this.reviewStatuses,
                currentReviewStatus: this.reviewComponentDetails.currentReviewStatus ? this.reviewComponentDetails.currentReviewStatus : null,
                prevReviewStatus: this.reviewComponentDetails.prevReviewStatus ? this.getPreviosReviewDescription(this.reviewComponentDetails.prevReviewStatus) : 'N/A',
                showEdit: this.reviewComponentDetails.showEdit!=null ? this.reviewComponentDetails.showEdit : true,
                showHistory: this.reviewComponentDetails.showHistory ? this.reviewComponentDetails.showHistory : true,
                reviewHistoryHeader: this.reviewComponentDetails.reviewHistoryHeader ? this.reviewComponentDetails.reviewHistoryHeader : this.pageText.lbl_history,
                commentHeader: this.reviewComponentDetails.commentHeader ? this.reviewComponentDetails.commentHeader : this.pageText.lbl_comments,
                comments: this.reviewComponentDetails.comments ? this.reviewComponentDetails.comments : null,
                leftBtnTxt: this.reviewComponentDetails.leftBtnTxt ? this.reviewComponentDetails.leftBtnTxt : this.pageText.cancel,
                rightBtnTxt: this.reviewComponentDetails.rightBtnTxt ? this.reviewComponentDetails.rightBtnTxt : this.pageText.save,
                rightBtnAction: this.reviewComponentDetails.rightBtnAction ? this.reviewComponentDetails.rightBtnAction : null,
                reviewHistory: this.reviewComponentDetails.reviewHistory ? this.reviewComponentDetails.reviewHistory : [],
                additionalDetails: this.reviewComponentDetails.additionalDetails ? this.reviewComponentDetails.additionalDetails : null,

                reviewDate: this.reviewComponentDetails.reviewDate ? this.reviewComponentDetails.reviewDate : '',
                reviewedBy: this.reviewComponentDetails.reviewedBy ? this.reviewComponentDetails.reviewedBy : '',
            }

            if(!this._reviewComponentDetails.showEdit){
                this._reviewComponentDetails.commentHeader= this.pageText.lbl_last_comments;
                this._reviewComponentDetails.comments =  this._reviewComponentDetails.comments;
            }

        }
    }

    ngAfterViewInit() {
        this.clearFormFieldsAndDisable();
    }

    clearFormFieldsAndDisable() {

        let reviewElm = (document.querySelector('input[name="reviewOption'+this._reviewComponentDetails.defaultID+'"]') as HTMLInputElement);
        let commentElm = (document.getElementById('reviewComments'+this._reviewComponentDetails.defaultID) as HTMLInputElement);
        if (this._reviewComponentDetails.currentReviewStatus !== null) {
            if (reviewElm) {
                let prevVal = this._reviewComponentDetails.currentReviewStatus;

                Array.from(document.getElementsByName("reviewOption"+this._reviewComponentDetails.defaultID)).forEach(r => {

                    if (r['value'] === prevVal) {
                        r['checked'] = true;
                        //   console.log('R',r)
                    } else {
                        r['checked'] = false;
                    }

                });
            }
        }
        else {
            if (reviewElm) {
                Array.from(document.getElementsByName("reviewOption"+this._reviewComponentDetails.defaultID)).forEach(r => r['checked'] = false);
            }
        }


        if (commentElm) {
            commentElm.value = this._reviewComponentDetails.comments;
        }

        this.disableForm(reviewElm, commentElm);
        this.clearError();
    }

    disableForm(reviewElm: HTMLInputElement = (document.querySelector('input[name="reviewOption'+this._reviewComponentDetails.defaultID+'"]') as HTMLInputElement),
        commentElm: HTMLInputElement = (document.getElementById('reviewComments'+this._reviewComponentDetails.defaultID) as HTMLInputElement)) {
          
        if (reviewElm) {
            Array.from(document.getElementsByName("reviewOption"+this._reviewComponentDetails.defaultID)).forEach(r => r['disabled'] = true);
        }

        if (commentElm) {
            commentElm.disabled = true;
        }

        this.startEdit = false;
    }

    enableForm() {
        let reviewElm = (document.querySelector('input[name="reviewOption'+this._reviewComponentDetails.defaultID+'"]') as HTMLInputElement);
        let commentElm = (document.getElementById('reviewComments'+this._reviewComponentDetails.defaultID) as HTMLInputElement);
        if (reviewElm) {
            Array.from(document.getElementsByName("reviewOption"+this._reviewComponentDetails.defaultID)).forEach(r => r['disabled'] = false);
        }

        if (commentElm) {
            commentElm.disabled = false;
        }
        this.startEdit = true;
    }

    leftButtonClick(review: any) {
        this._reviewComponentDetails.currentReviewStatus = review.status;
        this._reviewComponentDetails.comments = review.comments;
        this.clearError();
        this.disableForm();
    }


    rightButtonClick() {        

        let reviewElm = (document.querySelector('input[name="reviewOption'+this._reviewComponentDetails.defaultID+'"]:checked') as HTMLInputElement);
        let reviewOptionVal = reviewElm ? reviewElm.value : null;
        let commentVal = (document.getElementById('reviewComments'+this._reviewComponentDetails.defaultID) as HTMLInputElement).value;

        this._reviewComponentDetails.rightBtnAction(
            {
                reviewOption: reviewOptionVal,
                comments: commentVal,
                additionalDetails: this._reviewComponentDetails.additionalDetails
            },
            this.leftButtonClick.bind(this),
            this.handleError.bind(this)
        );
    this.logger.debug(this._reviewComponentDetails);
    }

    handleError(errorObj: any) {
        if (errorObj) {
            this.errorsList = errorObj.errorsList;
            this.commentError = errorObj.commentError;
            this.optionError = errorObj.optionError;
        }
    }

    viewHistory() {
        if(this._reviewComponentDetails.reviewHistory.length > 0) {
            this.logger.debug(this._reviewComponentDetails.reviewHistory);
            const modalRef = this.modalService.open(HistoryComponent, { size: 'lg', centered: true });
            modalRef.componentInstance.reviewHistory = this._reviewComponentDetails.reviewHistory;
        }
    }

    private getPreviosReviewDescription(prevCode:string){        
        let statuses =  this.reviewComponentDetails.reviewStatuses ? this.reviewComponentDetails.reviewStatuses :  this.reviewStatuses;        
       let searchedObj= _.find(statuses,['code',prevCode]);
       return searchedObj.desc;

    }

    clearError() {
        this.errorsList = [];
        this.commentError = false;
        this.optionError = false;
    }

}