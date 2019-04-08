import { throwError as observableThrowError, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Utils } from '../shared/Utils';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class BaseServices {

  protected http: HttpClient;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(protected httpClient: HttpClient, protected utils: Utils) {
    this.http = httpClient;
  }


  getServiceCall(url: string) {
    this.utils.showLoading(url);
    return this.http
      .get(url, { observe: 'response' })
      .pipe(
        map((response) => this.extractData(response, true, url)),
        catchError((error) => this.handleError(error, true, url))
      );
  }

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

  postServiceCall = (postObj: any, url: string) => {
    this.utils.showLoading(url);
    return this.http
      .post(url, postObj)
      .pipe(
        map((response) => this.extractData(response, true, url)),
        catchError((error) => this.handleError(error, true, url))
      );
  }

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

  protected extractData(res: HttpResponse<any> | any, displayloading = true, callingMethodName: string = null) {
    if (displayloading) {
      this.utils.closeLoading(callingMethodName);
    }
    if (res && res.body) {
      return res.body;
    }
    return res;
  }

  private checkOKResponse(res: HttpResponse<any> | any, displayloading = true, callingMethodName: string = null) {
    if (displayloading) {
      this.utils.closeLoading(callingMethodName);
    }
  
    return (200 === res.status);
  }

}