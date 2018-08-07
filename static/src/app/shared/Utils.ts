import {Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import {NgbAccordionConfig, NgbModal , NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';

import * as _ from 'lodash';
// tslint:disable:max-line-length

import { environment } from '../../environments/environment';

@Injectable()
export class Utils {

  showLoadingSign = false;

  //path: string;
  private pathVal:string=null;

  title: string;

  set path(val){
    if(!this.pathVal)
    {
        this.pathVal = val;
        this.setPageAsPerPath();
    }
  }

  get path(){
    return this.pathVal;
  }

  piwikSiteIds: any[];

  ANALYTICS: any;

  tooltipText: any;
  ALERT: any;

  navigationExtras: NavigationExtras;

  user: any = { };

  titleRegEx = '^[a-zA-Z0-9 \.\_\-]+';

  numberRegEx = '^[0-9\.]+';

  private methodCalls: string[] = [];

  isConfirmationPage:boolean = false;

  currentPageName: string;

  currentResourceBundlePath: string="common";

  userDetails: any = {};

  showSaveAndExit: boolean;

  //pageDataLoadObservable = new BehaviorSubject(false);

  ltfId: Number;
  placeID: number;
  glbReqId: number;
  placeName: string | null;
  placeAddress: string | null;
  placeBarObj: any | null;

  reviewComments:any[] =null;

  constructor(
    private router: Router, 
    private accordionConfig: NgbAccordionConfig,
    public dpConfig: NgbDatepickerConfig,
    private modalService: NgbModal,
  ) {
    accordionConfig.type = 'primary';
    const now = new Date();
    dpConfig.minDate = {year: 2016, month: 1, day: 1};
    dpConfig.maxDate = {year: Math.max(now.getFullYear(),2021), month: 12, day: 31};

    this.piwikSiteIds = [
      { hostName: 'localhost', siteId: 1 },
      { hostName: 'mydev.azdeq.gov', siteId: 1 },
      { hostName: 'myqa.azdeq.gov', siteId: 3 },
      { hostName: 'myuat.azdeq.gov', siteId: 5 },
      { hostName: 'mybeta.azdeq.gov', siteId: 4 },
      { hostName: 'my.azdeq.gov', siteId: 6 }
    ];

    this.ANALYTICS = {
      'CATEGORY': 'CITacker',
      'GET_BILL_INFO': 'GET BILL INFORMATION',
      'PAY_NOW': 'Pay Now'
    };
    

    // Set navigation extras object
    // that passes on global query params and fragment
    this.navigationExtras = {
      //preserveQueryParams: true,
      preserveFragment: false,
      queryParamsHandling: "merge"
    };

    //this.title = 'AZPDES MS4 GENERAL PERMIT COVERAGE';
    this.ALERT = {
      INDIVIDUAL_NOT_ALLOWED: {
           title: "ALERT: MS4 PERMIT NOT ALLOWED FOR THIS ACCOUNT CONFIGURATION",
           msg: "MS4 permits cannot be granted to accounts configured as an individual. Please contact ADEQ at (844)827-4768 if you need any assistance with adding your company to your account.",
           mainButtonText: "RETURN TO mySTUFF",
           mainButtonCTA: "/mydeq/dashboard"
       },

      ADD_COMPANY: {
        title: "ALERT: ADD A NEW COMPANY/AGENCY IN mySETTINGS",
        msg: "To add a new company, go to the mySETTINGS Company tab and select \"add a company.\" Then, you will be able to select the company from a list in order to continue the permit/registration process.",
        mainButtonText: "EXIT",
        mainButtonCTA: "/mydeq/dashboard"
      },

      PERMIT_VERIFY: {
        title: "ALERT",
        msg: "Please contact ADEQ at (844)827-4768 to get clarifications on the permit information.",
        mainButtonText: "EXIT",
        mainButtonCTA: "/mydeq/dashboard"
      },

      SELECT_COMPANY: {
        title: "",
        msg: "",
        mainButtonText: "EXIT",
        mainButtonCTA: "/mydeq/dashboard"
      }

      
    }

  }

  baseNavigationDetails={    

      DASHBOARD:this.getNavigationObject("DASHBOARD"),      
      SELECT_COMPANY:this.getNavigationObject("select-company","selectcompany"),
      EXISTING_PERMIT_INFO :this.getNavigationObject("permit-verification","existingpermitinfo"),
      WHATS_NEEDED :this.getNavigationObject("whats-needed","whatsneeded"),
      OPERATOR_TYPE :this.getNavigationObject("operator-type","operatortype"),
      CONTACT_INFO :this.getNavigationObject("contact-info","contactInfo"), 
      GOV_ENTITY :this.getNavigationObject("gov-entity","goventity"),
      IDDE_ENF_AUTH :this.getNavigationObject("idde-enf-auth","idde_enf_auth"), 
      CONSTUCTION_STORMWATER_ENF_AUTH :this.getNavigationObject("const-enf-auth","const_enf_auth"),
      POST_CONSTUCTION_ENF_AUTH :this.getNavigationObject("post-const-enf-auth","post_const_enf_auth"),
      SEWER_MAPPING :this.getNavigationObject("sewer-mapping","sewermapping"),
      OUTFALL_MAPPING :this.getNavigationObject("outfall-mapping","outfallmapping"),
      REC_WATER_MAPPING :this.getNavigationObject("rec-water-mapping","recwatermapping"),
      //CONSTUCTION_STORMWATER_ENF_AUTH :this.getNavigationObject("construction-stormwater-enf-auth"), 
      SUMMARY:this.getNavigationObject("summary","summary"), 
      CERTIFY:this.getNavigationObject("certify","certify"), 
      WANT_TO_CERTIFY:this.getNavigationObject(""), 
      WANT_TO_PAY:this.getNavigationObject(""), 
      PAYMENT_SUMMARY :this.getNavigationObject("payment"), 
      CONFIRMATION:this.getNavigationObject("confirmation","confirmation"), 
      DOWNLOAD_CONFIRMATION:this.getNavigationObject(""),
      INTERNAL_PENDING_PERMIT_DETAILS:this.getNavigationObject(""),
      MCM1:this.getNavigationObject("mcm1","mcm1"),
      MCM2:this.getNavigationObject("mcm2","mcm2"),
      MCM3:this.getNavigationObject("mcm3","mcm3"),
      MCM4:this.getNavigationObject("mcm4","mcm4"),
      MCM5:this.getNavigationObject("mcm5","mcm5"),
      FACILITY:this.getNavigationObject("facility","facility"),
      MCM6:this.getNavigationObject("mcm6","mcm6"),
      APPENDIX_B:this.getNavigationObject("impairments-waterbodies","impairments_waterbodies"),
      DRYWEATHER_MONITORING:this.getNavigationObject("dryweather-monitoring","dryweather_monitoring"),
      MUNICIPALSW_OUTFALLS:this.getNavigationObject("municipalSW-outfalls","municipalsw_outfalls"),
      VISUAL_MONITORING:this.getNavigationObject("visual-monitoring","visual_monitoring"),
      MS4_OUTFALLS:this.getNavigationObject("ms4-outfalls","ms4_outfalls"),
      MS4_OUTFALLS_ANALYTICAL:this.getNavigationObject("ms4-outfalls-analytical","ms4_outfalls_analytical"),
      RECEIVING_WATER:this.getNavigationObject("receiving-water","receivingwater"),
      RECEIVING_WATER_ANALYTICAL:this.getNavigationObject("receiving-water-analytical","receivingwater_analytical"),
      ANALYTICAL_MONITORING:this.getNavigationObject("analytical-monitoring","analytical_monitoring"),
      ALTERNATIVE_VISUAL_MONITORING:this.getNavigationObject("alternative-visual-monitoring","alternative_visual_monitoring"),

      REPORTING_PERIOD:this.getNavigationObject("reporting-period","reportingperiod"),
      ANNEXED_LAND:this.getNavigationObject("annexed-land","annexedland"),
      MAPPING_INFO:this.getNavigationObject("mapping-info","mappinginfo"),
      MCM3_TRAINING:this.getNavigationObject("mcm3-training","mcm3_training"),
      MCM4_TRAINING:this.getNavigationObject("mcm4-training","mcm4_training"),
      MCM6_TRAINING:this.getNavigationObject("mcm6-training","mcm6_training"),
      IDDE_ILLICIT_DISCHARGE:this.getNavigationObject("illicit-discharge","idde_illicit_discharge"),
      MAPPING_PROGRESS:this.getNavigationObject("mapping-progress","mappingprogress"),
      MCM3_INCIDENT:this.getNavigationObject("mcm3-incident","mcm3_incident"),
      MCM4_INCIDENT:this.getNavigationObject("mcm4-incident","mcm4_incident"),
      MCM5_INCIDENT:this.getNavigationObject("mcm5-incident","mcm5_incident"),
      MCM3_FACILITY:this.getNavigationObject("mcm3-facility","mcm3_facility")      
      
  };

  navigationPath={}

  private setPageAsPerPath(){
    this.navigationPath[this.pathVal] = this.baseNavigationDetails;
    switch(this.path){

      case 'newpermit':
      case 'existing':
      case 'existing_revision':
      this.title = 'AZPDES MS4 GENERAL PERMIT COVERAGE';        
      break;

      case 'modify_revision':
      case 'modify':
        this.title = 'MODIFY MS4 NOTICE OF INTENT (NOI)';        
        this.navigationPath[this.pathVal].WHATS_NEEDED = this.getNavigationObject("whats-needed","modifyinfo");
        this.navigationPath[this.pathVal].MODIFY_INFO = this.getNavigationObject("whats-needed","modifyinfo");
        this.navigationPath[this.pathVal].ANNUAL_REPORT_IN_PROGRESS = this.getNavigationObject("annual-report-ip","annualreport_inprogress");
      break;

      case 'annual_report':
        this.title = 'AZPDES MS4 ANNUAL REPORT';
      break;
       
    }
  }


  private getNavigationObject(inputPageURL,inputServiceURL=null){
    return {
      url:inputPageURL,
      commetns:null,
      serviceURL:inputServiceURL
    }
  }

  public setPageComments(reviewList:any[]){
    /* let objKey=_.findKey(this.navigationPath[this.path],{"url":this.currentPageName});
    this.navigationPath[this.path][objKey]['reviewList']=reviewList; */
    this.reviewComments = reviewList;
}

  public getPageComments(){    
    /* let objKey=_.findKey(this.navigationPath[this.path],{"url":this.currentPageName});    
    return this.navigationPath[this.path][objKey]['reviewList']; */
    return this.reviewComments;
  }

  navigateTo = (pageName: string,includePath: boolean, includeRequestParam: boolean) => {
    
    if (pageName === 'PLACE') {
      this.navigatePlace();
    } else if (pageName === 'DASHBOARD') {
      this.gotoDashboard();
    } else{
      
      if (pageName === 'EXISTING_PERMIT_INFO') {
        includePath = true;
      }
      let url = "";

      if (includePath) {
        url += this.path;
      }

      if (this.navigationPath[this.path][pageName]) {
        url += '/' + this.navigationPath[this.path][pageName].url;
        if (includeRequestParam) {
          this.router.navigate([url], this.navigationExtras);
        } else {
          this.router.navigate([url]);
        }
      } else {
        window.open(pageName, '_self');
      }
    }

      /* if (includeRequestParam) {
          this.router.navigate([pageName.toLocaleLowerCase()], this.navigationExtras);
      } else {
          this.router.navigate([pageName.toLocaleLowerCase()]);
      } */
  }

  gotoDashboard = () => {
    window.location.href = window.location.origin + '/mydeq/dashboard';
  }
  gotoAZDEQHome() {
    window.open('http://azdeq.gov/', '_self');
  }

  public getPiwikSiteId = (hostname) => {
    for (let i = 0; i < this.piwikSiteIds.length; i++) {
      const piwikSite = this.piwikSiteIds[i];
      if (piwikSite.hostName === hostname) {
        return piwikSite.siteId;
      }
    }
    return 1;
  }

  orEmpty = (entity) => {
    // http://stackoverflow.com/questions/20572016/javascript-string-concatenation-behavior-with-null-or-undefined-values
    // entity || "" will cause true to return "true" but false to return ""
    // both null == null and undefined == null are true
    if (entity == null) {
      return '';
    } else {
      return entity;
    }
  }

  regexCompare = (src, dest) => {
    return src.match(new RegExp(dest, 'i'));
  }

  openNGBootstrapModal = (content: any, modelSize?: 'sm' | 'lg') => {
    this.modalService.open(content, { size: modelSize ? modelSize : 'lg' });
  }

  showLoading(callingMethodname: string = null) {
    if (callingMethodname) {
      this.methodCalls.push(callingMethodname);
    }
    setTimeout(() => this.showLoadingSign = true, 0);
  }

  closeLoading(callingMethodname: string = null) {
    if (callingMethodname) {
      _.pull(this.methodCalls, callingMethodname);
    }
    if (this.methodCalls && this.methodCalls.length === 0) {
      setTimeout(() => this.showLoadingSign = false, 0);
    }
  }

  closeConfirm = (popOverId: string) => {
    document.getElementById(popOverId).click();
  }

  navigatePlace = () => {
    window.open('/mydeq-ms4/place?app=ms4&path=' + this.path, '_self');
  }
  addConditionalSeparator = (src, appendText, separator) => {
    if (src) {
      src.trim();
    }
    if (src) {
      src += separator + appendText;
    } else {
      src = appendText;
    }
    return src;
  }
  getCompletePlacebarAddress = (address) => {
    if (address) {
      let completeAddress;
      if (address.address1) {
        completeAddress = this.orEmpty(address.address1);
      }
      if (completeAddress && address.address2) {
        completeAddress = this.addConditionalSeparator(completeAddress, this.orEmpty(address.address2), ' ');
      }
      if (completeAddress && address.city) {
        completeAddress = this.addConditionalSeparator(completeAddress, this.orEmpty(address.city), ' ');
      }
      if (completeAddress && address.state) {
        completeAddress = this.addConditionalSeparator(completeAddress, this.orEmpty(address.state), ' ');
      }
      if (completeAddress && address.zip) {
        completeAddress = this.addConditionalSeparator(completeAddress, this.get5DigitZipCodeFromPlaceAddress(address), ' ');
      }
      if (!completeAddress) {
        completeAddress = 'Lat: ' + address.latitude + ' / Long: ' + address.longitude;
      }
      if (completeAddress) {
        return completeAddress.trim();
      }
    }
  }

  get5DigitZipCodeFromPlaceAddress = (address) => {
    if (address && address.zip && address.zip.trim()) {
      return address.zip.trim().substring(0, 5);
    }
  }
  
  gotoMyApplications = () => {
    window.location.href = window.location.origin + '/mydeq/my-application';
  }

  convertDateToString(dateObj:any){
    if (dateObj instanceof Object) {
      return this.prepandZero(dateObj.month) + '/' + this.prepandZero(dateObj.day) + '/' + dateObj.year;
    }
    return dateObj;
  }

  convertStringToDate(dateStr:string){
    if (!dateStr) {
      return null;
    }
    const dated = new Date(dateStr);
    return { year: dated.getFullYear(), month: dated.getMonth() + 1, day: dated.getUTCDate() };
  }

  private prepandZero(inputNum:number){
    return inputNum < 10 ? "0"+inputNum : inputNum+"";
  }

  removeGlobalRequestID = () => {
    const urlWithoutGlbReqId = this.router.url.replace(new RegExp('glbReqId=' + this.glbReqId), '');
    this.router.navigateByUrl(urlWithoutGlbReqId);
  }

  hideLoading = (callingMethodname: string = null) => {

    if (callingMethodname) {
      _.pull(this.methodCalls, callingMethodname);
    }

    if (this.methodCalls.length === 0) {
      // this.showBusy=false;
      // console.log(callingMethodname,"hideLoading",this.methodCalls,this.showBusy);
      setTimeout(() => {
        this.showLoadingSign = !(this.methodCalls.length === 0);
        // console.log(callingMethodname,"hideLoading",this.methodCalls,this.showBusy);
      }, 0)
    }
  }

  public correctLatLong(correctLatLngFlag: boolean, inputLatlng: string): string {

    if (!correctLatLngFlag) {
      return inputLatlng;
    }
    inputLatlng = inputLatlng + '';
    let tmpArr = inputLatlng.split(".");

    if (tmpArr && tmpArr.length > 1 && tmpArr[1].length < 6) {

      do {
        tmpArr[1] = tmpArr[1] + '0';
      } while (tmpArr[1].length < 6);

      inputLatlng = tmpArr[0] + '.' + tmpArr[1];
    }
    return inputLatlng;
  }


  public getWaterBodyType(waterBodyType:string){
    let result="";

    if(waterBodyType){
        result=_.filter(waterBodyType.split('~'),function(o){
          o=o.trim();
          if(o === 'Outstanding Arizona Water(OAW)' || o === 'Impaired/Non-attaining' || o === 'Impaired' || o === 'Non-attaining'){
            return o;
          }
        }).join(',');
      
    }
    return result;
  }

  getServiceURL(serviceURLObj:any=null){
    //endPointURL:string,addSave:boolean=false,adddelete:boolean=false,addupdate:boolean=false,serviceUrl:string=null
//console.log("this.currentPageName",this.currentPageName);
    let pageName=_.findKey(this.navigationPath[this.path],{'url' : this.currentPageName});
    let navigationServiceURL=this.navigationPath[this.path][pageName]['serviceURL'];

    if(serviceURLObj.addSave){
      return serviceURLObj.endPointURL + this.path + '/save/'+navigationServiceURL;
    }
    if(serviceURLObj.addupdate){
      return serviceURLObj.endPointURL + this.path + '/update/'+navigationServiceURL;
    }
    if(serviceURLObj.adddelete){
      return serviceURLObj.endPointURL + this.path + '/delete/'+navigationServiceURL;
    }
    else if(serviceURLObj.serviceUrl){
      return serviceURLObj.endPointURL + this.path + '/'+serviceURLObj.serviceUrl;
    }
    else{
      return serviceURLObj.endPointURL + this.path + '/'+navigationServiceURL;
    }
    
  }

  getServiceName():string{    
    let pageName=_.findKey(this.navigationPath[this.path],{'url' : this.currentPageName});
    return this.navigationPath[this.path][pageName]['serviceURL'];
  }

  getMockData(mockDataKey:string){
    return environment[this.path][mockDataKey];
  }

}
