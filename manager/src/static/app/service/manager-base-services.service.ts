import { throwError as observableThrowError, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Utils } from '../shared/Utils';
import { map, catchError } from 'rxjs/operators';

/**
 * This service class have core http service implementation of GET,PUT,POST & DELETE
 */
@Injectable()
export class BaseServices {

  protected http: HttpClient;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(protected httpClient: HttpClient, protected utils: Utils) {
    this.http = httpClient;
  }


  /**
     * Performs GET HTTP call.
     *      *    
     * @param url : Service URL.
     * 
     * @example getServiceCall('mydeq-aircc/new/getDetails')
     */
  getServiceCall(url: string) {
    this.utils.showLoading(url);
    return this.http
      .get(url, { observe: 'response' })
      .pipe(
        map((response) => this.extractData(response, true, url)),
        catchError((error) => this.handleError(error, true, url))
      );
  }

  /**
     * Performs PUT HTTP call.
     * 
     * @param putObj : Object to be put.
     * 
     * @param url : Service URL.
     * 
     * @example putServiceCall({fName:'Rick',lName:'WoodLand'},'mydeq-aircc/new/getDetails')
     */
  putServiceCall = (putObj: any, url: string) => {
    putObj = this.utils.trimWhiteSpaceAroundBoundary(putObj);
    this.utils.showLoading(url);
    return this.http
      .put(url, putObj, this.httpOptions)
      .pipe(
        map((response) => this.extractData(response, true, url)),
        catchError((error) => this.handleError(error, true, url))
      );
  }

/**
   * Performs POST HTTP call.
   *      
   * @param postObj : Object to be posted.
   *
   * @param url : Service URL.
   * 
   * @example postServiceCall({fName:'Rick',lName:'WoodLand'},'mydeq-aircc/new/getDetails')
   * 
   */
  postServiceCall = (postObj: any, url: string) => {
    this.utils.showLoading(url);
    return this.http
      .post(url, postObj)
      .pipe(
        map((response) => this.extractData(response, true, url)),
        catchError((error) => this.handleError(error, true, url))
      );
  }

   /**
     * Performs PUT HTTP call.
     * 
     * NOTE: Either of the inputServiceName OR serviceURL needs to be specified.
     * 
     * @param putObj : Object to be put.
     * @param url : Service URL.
     * 
     * @example putServiceOKRespCall({fName:'Rick',lName:'WoodLand'},'mydeq-aircc/new/getDetails')
     */
  putServiceOKRespCall = (putObj: any, url: string) => {
    putObj = this.utils.trimWhiteSpaceAroundBoundary(putObj);
    this.utils.showLoading(url);
    return this.http
      .put(url, putObj, { responseType: 'text' })
      .pipe(
        map((response) => this.checkOKResponse(response, true, url)),
        catchError((error) => this.handleError(error, true, url))
      );
  }

  /**
     * Performs DELETE HTTP call.
     * 
     * @param url : Service URL.   
     * 
     * @example  deleteServiceCall('mydeq-aircc/new/delete') 
     
     */
  deleteServiceCall(url: string) {
    this.utils.showLoading(url);
    return this.http
      .put(url, { observe: 'response' })
      .pipe(
        map((response) => this.extractData(response, true, url)),
        catchError((error) => this.handleError(error, true, url))
      );
  }

  protected handleError(error: HttpErrorResponse, displayloading = true, callingMethodName: string = null) {
    if (displayloading) {
      this.utils.closeLoading(callingMethodName);
    }
    return observableThrowError(error.error);
  }

  /**
     * Extracts data from service response.
     * 
     * @param res : HTTP Reponse
     * @param displayloading : Display loading flag.
     * @param callingMethodName : Calling method name.
     */
  protected extractData(res: HttpResponse<any> | any, displayloading = true, callingMethodName: string = null) {
    if (displayloading) {
      this.utils.closeLoading(callingMethodName);
    }
    if (res && res.body) {
      return res.body;
    }
    return res;
  }

  /**
     * Checks 200 ok response.
     */
  private checkOKResponse(res: HttpResponse<any> | any, displayloading = true, callingMethodName: string = null) {
    if (displayloading) {
      this.utils.closeLoading(callingMethodName);
    }
  
    return (200 === res.status);
  }

}