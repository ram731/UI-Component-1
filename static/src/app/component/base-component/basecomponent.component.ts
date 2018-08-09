import { OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ConfigCacheService } from '../../shared/lib/component-config/config-cache';
import { Utils } from '../../shared/Utils';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppService } from '../../service/app.service';
import { MyDeqErrorHandler } from '../../shared/errorHandler';
import * as _ from 'lodash';

export abstract class BaseComponent implements OnInit {

    protected pageText: any = {};
    protected model: any = {};
    protected errorFields: any = [];
    protected errorsList: any = [];
    protected pageForm: FormGroup;
    protected pageServiceName: string = null;
    protected enableContinue: boolean = true;

    constructor(protected activatedRoute: ActivatedRoute,
        protected formBuilder: FormBuilder,
        protected utils: Utils,
        protected appService: AppService,
        protected errorHandler: MyDeqErrorHandler) {
        this.pageForm = this.createForm();
        const configCacheService = ConfigCacheService.getInstane();
        this.pageText = configCacheService.getResourceBundle(this.constructor.name)['PAGE_TEXT'][utils.path];
        this.pageServiceName = _.find(configCacheService.getRoute(this.constructor.name), { pageURL: utils.pageURL }).serviceName;
        this.utils.pageTitle = configCacheService.getTitle(this.constructor.name);
    }


    ngOnInit() {

        this.activatedRoute.queryParams.subscribe((params: Params) => {
            this.appService.getServiceCall(this.populateGetURLParams(params), this.pageServiceName).subscribe(
                response => {
                    this.model = response;
                    this.onGetResponse(this.model);
                },
                error => {
                    this.errorFields = this.errorHandler.getErrorFields(error);
                    this.errorsList = this.errorHandler.getErrors(error);
                    this.onGettError(error);
                });
        });
    }

    /**
     * This method submit page object.
     */
    pageContinue(formData: any) {
        this.appService.putServiceCall(this.createPutObject(formData), this.populatePutURLParams(null), this.pageServiceName).subscribe(
            response => {
                if (response.next_page !== 'ALERT') {
                    this.onSuccessPutResponse(response);
                    this.utils.navigateTo(response.next_page, true, true);

                } else {
                    this.onAlertPutResponse(response);
                }
            },
            error => {
                this.errorFields = this.errorHandler.getErrorFields(error);
                this.errorsList = this.errorHandler.getErrors(error);
                this.onPutError(error);
            });
    }

    /**
    * This method put section object.
    */
    sectionPut(sectionData: any, index: number) {

        this.appService.saveIndividualServiceCall(this.createSectionPutObject(sectionData[index]), this.pageServiceName).subscribe(
            response => {
                if (response.next_page !== 'ALERT') {
                    this.onSectionSuccessPutResponse(response, index);
                } else {
                    this.onSectionAlertPutResponse(response, index);
                }
            },
            error => {
                this.errorFields = this.errorHandler.getErrorFields(error);
                this.errorsList = this.errorHandler.getErrors(error);
                this.onSectionError(error, index);
            });
    }

    /**
     * This method put updated section object.
     */
    sectionUpdate(sectionData: any, index: number) {

        this.appService.updateIndividualServiceCall(this.createSectionPutObject(sectionData[index]), this.pageServiceName).subscribe(
            response => {
                if (response.next_page !== 'ALERT') {
                    this.onSectionSuccessUpdateResponse(response, index);
                } else {
                    this.onSectionAlertUpdateResponse(response, index);
                }
            },
            error => {
                this.errorFields = this.errorHandler.getErrorFields(error);
                this.errorsList = this.errorHandler.getErrors(error);
                this.onSectionError(error, index);
            });
    }

    /**
    * This method delete section object.
    */
    sectionDelete(sectionId: any, index: number) {
        this.appService.deleteIndividualServiceCall(sectionId, this.pageServiceName).subscribe(
            response => {
                if (response.next_page !== 'ALERT') {
                    this.onSectionSuccessDeleteResponse(response, index);
                } else {
                    this.onSectionAlertDeleteResponse(response, index);
                }
            },
            error => {
                this.errorFields = this.errorHandler.getErrorFields(error);
                this.errorsList = this.errorHandler.getErrors(error);
                this.onSectionError(error, index);
            });
    }

    /**
     *  This method is called after get service call is made.
     */
    abstract onGetResponse(getResponse: any): void;

    /**
     *  This method creates a form page level form.
     */
    abstract createForm(): FormGroup;

    /**
    *  This method creates a form level object to be posted to service.
    */
    createPutObject(formDate: any): any {
        return formDate;
    }

    /**
     *  This method creates a section level object to be posted to service.
     */
    protected createSectionPutObject(formDate: any): any {
        return null;
    }

    /**
     *  This method pupulate get url param array.
     */
    populateGetURLParams(inputObj: any = null): any[] {
        return null;
    }
    /**
     *  This method pupulate put url param array.
     */
    populatePutURLParams(inputObj: any): any[] {
        return null;
    }

    /**
     *  This method is called on page level put success.
     */
    onSuccessPutResponse(response: any): any {
        return;
    }

    /**
    *  This method is called on section level put success.
    */
    onSectionSuccessPutResponse(response: any, index: number): any {
        return;
    }

    /**
    *  This method is called on section level update success.
    */
    onSectionSuccessUpdateResponse(response: any, index: number): any {
        return;
    }

    /**
    *  This method is called on section level delete success.
    */

    onSectionSuccessDeleteResponse(response: any, index: number): any {
        return;
    }

    /**
     *  This method is called on page level Alert response.
     */
    onAlertPutResponse(response: any): any {
        return;
    }

    /**
     *  This method is called on section level Alert response.
     */
    onSectionAlertPutResponse(response: any, index: number): any {
        return;
    }

    /**
     *  This method is called on section level update Alert response.
     */
    onSectionAlertUpdateResponse(response: any, index: number): any {
        return;
    }

    /**
     *  This method is called on section level delete Alert response.
     */
    onSectionAlertDeleteResponse(response: any, index: number): any {
        return;
    }

     /**
     *  This method is called on page level error.
     */
    onGettError(errorObj: any): void {
        return;
    }

    /**
     *  This method is called on page level error.
     */
    onPutError(errorObj: any): void {
        return;
    }

    /**
     *  This method is called on section level error.
     */
    onSectionError(errorObj: any, index: number): void {
        return;
    }

    public performActionOnEdit() {
        throw new Error('Method not implemented.');
    }
    public performActionOnEditError(errObj: any) {
        throw new Error('Method not implemented.');
    }


    public goBack() {
        this.utils.navigateTo(this.model.previous_page, true, true);
    }


    public approveEdit() {

        const tmpArr = this.utils.pageURL.split('/');
        this.appService.putServiceCall({}, [tmpArr[tmpArr.length - 1]], 'updatePageStatus').subscribe(
            response => {
                this.updateEditIndicator();
            },
            error => {
                this.performActionOnEditError(error);
            });
    }

    private updateEditIndicator() {
        //this.approveEditIndicator = 'Y';
        this.performActionOnEdit();
    }

    public isApprovedEdit(response: any) {

        if (response.reviewList && response.reviewList.length > 0) {
            if (response.reviewList[0].status === 'AE' || response.reviewList[0].status === 'R') {
                this.updateEditIndicator();
            }
        }
    }

    public setPageReview(obj: any) {
        obj.reviewComments = this.utils.reviewComments;
    } 


}
