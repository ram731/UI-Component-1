import { OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as _ from 'lodash';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Utils } from '../../shared/Utils';
import { AppService } from '../../service/app.service';
import { MyDeqErrorHandler } from '../errorHandler';
import { BaseComponent } from './basecomponent.component';
import { PageTextGetter } from '../content/pagetext-getter.component';
import { PageConentService } from '../content/content-service.component';

interface AdditionalGetCallDetails {
    serviceURL?: string,
    serviceURLWithoutcontextPath?: string,
    urlParams?: string[],
    urlQueryParams?: Map<string, string>,
    successcallBack?: Function,
    errorcallBack?: Function
}

interface AdditionalPutCallDetails {
    serviceURL?: string,
    serviceURLWithoutcontextPath?: string,
    urlParams?: string[],
    putObject?: any,
    urlQueryParams?: Map<string, string>,
    successcallBack?: Function,
    errorcallBack?: Function
}
export abstract class BaseController  extends BaseComponent implements OnInit {

    pageText: any = {};
    model: any = {};
    errorFields: any = [];
    errorsList: any = [];
    pageForm: FormGroup;
    private pageLoadServiceName: string = null;
    protected noGetCallOnLoad: boolean = false;
    enableContinue: boolean = true;
    approveEditIndicator: string = 'N';
    pageStatusDetail:any={
        isPageRejected:false,
        isPageApproved:false,
        isPageApproveEdit:false
    }
    

    constructor(protected activatedRoute: ActivatedRoute,
        protected formBuilder: FormBuilder,
        protected utils: Utils,
        protected appService: AppService,
        protected errorHandler: MyDeqErrorHandler,
        protected _pageTextComp?: PageTextGetter) {
        super();
        if(_pageTextComp){
            PageConentService.getInstance().registerBasePageContent(this, _pageTextComp);
           }
        this.pageForm = this.createForm();
        //const configCacheService = ConfigCacheService.getInstane();
        //this.pageText = configCacheService.getResourceBundle(this.constructor.name)['PAGE_TEXT'][utils.path];
        //this.pageServiceName = _.find(configCacheService.getRoute(this.constructor.name), { pageURL: utils.pageURL })['serviceName'];
        //this.utils.pageTitle = configCacheService.getTitle(this.constructor.name);
    }

    setPageLoadServiceName(serviceName: string) {
        this.pageLoadServiceName = serviceName;
    }

    getPageLoadServiceName() {
        return this.pageLoadServiceName;
    }

    ngOnInitPrerequisit(urlParams: Params =null):void{

    }

    ngOnInit() {
        
        this.activatedRoute.params.subscribe((urlParams: Params) => {

            this.ngOnInitPrerequisit(urlParams);

            if(this.noGetCallOnLoad){
                return ;
            }

            this.activatedRoute.queryParams.subscribe((queryParams: Params) => {

                this.appService.getServiceCall(this.populateGetURLParams(urlParams,queryParams), this.populatePageLoadURLQueryParams(),
                this.getPageLoadServiceName()).subscribe(
                    response => {
                        this.model = response;
                        this.pageStatusDetail=this.calculatePageStatus(response);
                        this.onGetResponse(this.model);                        
                    },
                    error => {
                        this.handleError(error);
                        this.onGettError(error);
                    });
            });
           
        });
    }

    private calculatePageStatus(response:any){

        let pageStatusDetail={
            isPageRejected:false,
            isPageApproved:false,
            isPageApproveEdit:false
        }
        
        if (response.reviewList && response.reviewList.length > 0 ){
            let revisionList = _.filter(response.reviewList, function (n) {
                return n.currentInd === 'C';
              });          

              if(revisionList && revisionList.length > 0 ){

                switch(revisionList[0].status){
                    case 'A':
                    pageStatusDetail.isPageApproved=true;
                        break;
                    case 'AE':
                    pageStatusDetail.isPageApproveEdit=true;
                        break;
                    case 'R':
                    pageStatusDetail.isPageRejected=true;
                        break;
                }
              }
        }      
        
        return pageStatusDetail
     }

    /**
     * This is get call service.
     */
    additionalGetCall(getCallDetails: AdditionalGetCallDetails) {
        if (getCallDetails) {
            this.appService.getServiceCall(getCallDetails.urlParams, getCallDetails.urlQueryParams, getCallDetails.serviceURL,
                getCallDetails.serviceURLWithoutcontextPath).subscribe(
                    response => {
                        if (getCallDetails.successcallBack) {
                            getCallDetails.successcallBack(response);
                        }
                    },
                    error => {
                        if (getCallDetails.errorcallBack) {
                            getCallDetails.errorcallBack(error);
                        }
                    });
        }
    }

    /**
     * This method submit page object.
     */
    pageContinue(formData: any,navigateToNextPage:boolean=true) {
        this.appService.putServiceCall(this.createPutObject(formData), this.populatePutURLParams(null), this.populatePutURLQueryParams(), this.pageLoadServiceName).subscribe(
            response => {
                if (response.next_page !== 'ALERT') {
                    this.onSuccessPutResponse(response);
                    if(navigateToNextPage){
                        this.utils.navigateTo([this.correctPageName(response.next_page)], true,true);
                    }

                } else {
                    this.onAlertPutResponse(response);
                }
            },
            error => {
                this.handleError(error);
                this.onPutError(error);
                window.scrollTo(0,0);
            });
    }

    /**
     * This method post page object.
     */
    postPageContinue(formData: any,navigateToNextPage:boolean=true) {
        this.appService.postServiceCall(this.createPostObject(formData), this.populatePostURLParams(null), this.populatePostURLQueryParams(), this.pageLoadServiceName).subscribe(
            response => {
                if (response.next_page !== 'ALERT') {
                    this.onSuccessPostResponse(response);
                    if(navigateToNextPage){
                        this.utils.navigateTo([this.correctPageName(response.next_page)], true,true);
                    }                    

                } else {
                    this.onAlertPostResponse(response);
                }
            },
            error => {
                this.handleError(error);
                this.onPostError(error);
                window.scrollTo(0,0);
            });
    }

    /**
     * This is a put call service.
     */
    additionalPutCall(additionalPutCallDetails: AdditionalPutCallDetails) {
        if (additionalPutCallDetails) {

            this.appService.putServiceCall(additionalPutCallDetails.putObject,
                additionalPutCallDetails.urlParams, additionalPutCallDetails.urlQueryParams,
                additionalPutCallDetails.serviceURL, additionalPutCallDetails.serviceURLWithoutcontextPath)
                .subscribe(
                    response => {
                        additionalPutCallDetails.successcallBack(response);
                    },
                    error => {
                        additionalPutCallDetails.errorcallBack(error);
                    });
        }
    }

    /**
    * This method put section object.
    */
    sectionPut(sectionData: any, index: number) {

        this.appService.saveIndividualServiceCall(this.createSectionPutObject(sectionData[index]), this.pageLoadServiceName).subscribe(
            response => {
                if (response.next_page !== 'ALERT') {
                    this.onSectionSuccessPutResponse(response, index);
                } else {
                    this.onSectionAlertPutResponse(response, index);
                }
            },
            error => {
                this.handleError(error);
                this.onSectionError(error, index);
            });
    }

    /**
     * This method put updated section object.
     */
    sectionUpdate(sectionData: any, index: number) {

        this.appService.updateIndividualServiceCall(this.createSectionPutObject(sectionData[index]), this.pageLoadServiceName).subscribe(
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
        this.appService.deleteIndividualServiceCall(sectionId, this.pageLoadServiceName).subscribe(
            response => {
                if (response.next_page !== 'ALERT') {
                    this.onSectionSuccessDeleteResponse(response, index);
                } else {
                    this.onSectionAlertDeleteResponse(response, index);
                }
            },
            error => {
                this.handleError(error);
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
    *  This method creates a form level object to be put to service.
    */
    createPutObject(formDate: any): any {
        return formDate;
    }

    /**
    *  This method creates a form level object to be posted to service.
    */
   createPostObject(formDate: any): FormData {
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
    populateGetURLParams(urlParams: Params,queryParams: Params): any[] {
        return null;
    }

    /**
    *  This method add Query parameters to input URL.
    */
    populatePageLoadURLQueryParams(): Map<string, string> {
        return null;
    }

    /**
     *  This method pupulate put url param array.
     */
    populatePutURLParams(inputObj: any): any[] {
        return null;
    }

    /**
     *  This method pupulate put url param array.
     */
    populatePostURLParams(inputObj: any): any[] {
        return null;
    }

    /**
     *  This method add Query parameters to input URL.
     */
    populatePutURLQueryParams(inputObj: any = null): Map<string, string> {
        return null;
    }

    /**
     *  This method add Query parameters to input URL.
     */
    populatePostURLQueryParams(inputObj: any = null): Map<string, string> {
        return null;
    }

    /**
     *  This method is called on page level put success.
     */
    onSuccessPutResponse(response: any): any {
        return;
    }

    /**
     *  This method is called on page level put success.
     */
    onSuccessPostResponse(response: any): any {
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
     *  This method is called on page level Alert response.
     */
    onAlertPostResponse(response: any): any {
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
     *  This method is called on page level error.
     */
    onPostError(errorObj: any): void {
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
        this.utils.navigateTo([this.correctPageName(this.model.previous_page)], true,true);
    }


    public approveEdit() {
        //const tmpArr = this.utils.pageURL.split('/');
        this.appService.putServiceCall(this.createUpdateSectionPutObject(), [this.pageLoadServiceName], null, 'updatePageStatus').subscribe(
            response => {
                this.updateEditIndicator();
            },
            error => {
                this.performActionOnEditError(error);
            });
    }

    private updateEditIndicator() {
        this.approveEditIndicator = 'Y';
        this.performActionOnEdit();
    }

    public isApprovedEdit(response: any) {

        if (response.reviewList && response.reviewList.length > 0) {
            if (response.reviewList[0].status === 'AE' || response.reviewList[0].status === 'AREQ') {
                this.updateEditIndicator();
            }
        }
    }

    public setPageReview(obj: any) {
        obj.reviewComments = this.utils.reviewComments;
    }

    handleError(error: any) {
        this.errorFields = this.errorHandler.getErrorFields(error);
        this.errorsList = this.errorHandler.getErrors(error);
    }

    public clearError(){
        this.errorFields = [];
        this.errorsList = [];
    }

    private correctPageName(servicePageName:string){
        return servicePageName.toLowerCase().replace(/_/g, '-');
    }
    
    createUpdateSectionPutObject (): any {
        return {};
    }
}
