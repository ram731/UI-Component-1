import {Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import {NgbAccordionConfig, NgbModal , NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';

@Injectable()
export class Utils {

  showLoadingSign = false;
  private pathVal:string=null;
  module: string = 'AIRCC';

  title: string;

  set path(val) {
    //if (!this.pathVal)// Recheck on this later
    {
        this.pathVal = val;      
    }
  }

  get path() {
    return this.pathVal;
  }

  pageURL: string;
  pageTitle:string ="";

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
  currentPageId: string;
  currentResourceBundlePath: string = 'common';
  userDetails: any = {};
  showSaveAndExit: boolean;
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
     
    };

    // Set navigation extras object
    // that passes on global query params and fragment
    this.navigationExtras = {            
      preserveFragment: false,
      queryParamsHandling: "merge"
    };

  }

  public setPageComments(reviewList:any[]){
    this.reviewComments = reviewList;
}

  public getPageComments(){
    return this.reviewComments;
  }

  navigateTo = (pageName: string [],includePath:boolean=true, includeRequestParam: boolean=false) => {
    let url: string [];
    this.currentPageId = pageName && pageName.length > 0 ? pageName[pageName.length - 1] : undefined;
    if (pageName) {
      if(pageName.length === 1 && pageName[0]==='dashboard'){
        this.gotoDashboard();
      }
      else{
          if(includePath){
            url = [this.path+'/'].concat(pageName);
          }else{
            url = [].concat(pageName);
          }
      }     
    }
    if (includeRequestParam) {
        this.router.navigate(url, this.navigationExtras);
    } else {
        this.router.navigate(url);
    }
}

  /* navigateTo = (pageName: string, includePath: boolean, includeRequestParam: boolean) => {
    pageName = pageName.replace(new RegExp('_', 'g'), '-');
    if (pageName === 'PLACE') {
      this.navigatePlace();
    } else if (pageName === 'DASHBOARD') {
      this.gotoDashboard();
    } else if (includePath && includeRequestParam) {
      this.router.navigate([this.path, pageName.toLocaleLowerCase()], this.navigationExtras);
    } else if (includePath) {
      this.router.navigate([this.path, pageName.toLocaleLowerCase()]);
    } else {
      this.router.navigate([pageName.toLocaleLowerCase()]);
    }
  } */

  navigate = (putServiceNextPage: string, getServiceNextPage, includePath: boolean, includeRequestParam: boolean): boolean => {   
    if (putServiceNextPage === 'ALERT') {
      return false;
    } else if (putServiceNextPage) {
      this.navigateTo([putServiceNextPage], includePath, includeRequestParam);
    } else {
      this.navigateTo([getServiceNextPage], includePath, includeRequestParam);
    }
    return true;
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

  navigatePlace = (app: string= null) => {
    window.open('/mydeq-ms4/place?app=' + app + '&path=' + this.path, '_self');
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
      setTimeout(() => {
        this.showLoadingSign = !(this.methodCalls.length === 0);

      }, 0);
    }
  }

  public correctLatLong(correctLatLngFlag: boolean, inputLatlng: string): string {

    if (!correctLatLngFlag) {
      return inputLatlng;
    }
    inputLatlng = inputLatlng + '';
    const tmpArr = inputLatlng.split('.');

    if (tmpArr && tmpArr.length > 1 && tmpArr[1].length < 6) {

      do {
        tmpArr[1] = tmpArr[1] + '0';
      } while (tmpArr[1].length < 6);

      inputLatlng = tmpArr[0] + '.' + tmpArr[1];
    }
    return inputLatlng;
  }

  getHeaderText(question: any,prependText:string) {

    let returnString = "";
    
    returnString = this.checkNullAndAppand(returnString, prependText);
    returnString = this.checkNullAndAppand(returnString, question.attachachmentCode);
    
    if(question.sectionCode){
      returnString = this.checkNullAndAppand(returnString, this.checkNullAndAppand('.',question.sectionCode));
    }
    
    if(!question.sectionCode && question.term){
      returnString = this.checkNullAndAppand(returnString, this.checkNullAndAppand('..',question.term));
    }
    else if(question.term){
      returnString = this.checkNullAndAppand(returnString, this.checkNullAndAppand('.',question.term));
    }
    
    returnString = this.checkNullAndAppand(returnString, this.checkNullAndAppand(' ',question.attachachmentText));
   
    if(question.sectionText){
      returnString = this.checkNullAndAppand(returnString, this.checkNullAndAppand(', ',question.sectionText));
    }
        
    return returnString;
  }

  public checkNullAndAppand(parentString: string, tobeAppendend: string) {
    if (tobeAppendend) {
      return parentString + tobeAppendend;
    }
    return parentString;
  }

  public setPageTitle(displayText: string=null) {
    return "MYDEQ"
  }

}
