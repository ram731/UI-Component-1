import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Utils } from '../shared/Utils';
import { throwError as observableThrowError, of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as _ from 'lodash';
const endpoint_url: string = environment.contextPath + '/service/';

@Injectable()
export class AppService {

    http: HttpClient;
    testMode: boolean;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(http: HttpClient, public utils: Utils) {
        this.http = http;
        this.testMode = environment.testMode;
    }

    getServiceCall(inputParamArr: any[] = null,inputQueryParamMap: Map<string,string> = null,
         inputServiceName: string = null, serviceURL: string = null): Observable<any> {
        if (this.testMode) {
            let URL: string = this.getServiceURL({ endPointURL: endpoint_url, serviceName: inputServiceName }, serviceURL);
            URL = this.appendParameters(inputParamArr, URL);
            URL = this.appendGlbReqId(URL);
            URL = this.appendQueryParameters(inputQueryParamMap, URL);
            if (serviceURL) {
                const tmpArr = serviceURL.split('/');
                return of(this.getMockData('GET_' + tmpArr[tmpArr.length - 1]));
           } else {

                if(inputServiceName){
                    return of(this.getMockData('GET_' +inputServiceName.split("/").join('')));
                }
                return of(this.getMockData('GET_' +inputServiceName));
            }
           
        }
        this.utils.showLoading(inputServiceName);
        let url: string = this.getServiceURL({ endPointURL: endpoint_url, serviceName: inputServiceName },serviceURL);
        url = this.appendParameters(inputParamArr, url);
        url = this.appendGlbReqId(url);
        url = this.appendQueryParameters(inputQueryParamMap, url);
        return this.http
            .get(url, { observe: 'response' })
            .pipe(
                map((response) => this.extractData(response, true, inputServiceName)),
                catchError((error) => this.handleError(error, true, inputServiceName))
            );
    }

    putServiceCall = (putObj: any, inputParamArr: any[] = null,inputQueryParamMap: Map<string,string> = null, inputServiceName: string = null, serviceURL: string = null)
        : Observable<any> => {

        if (this.testMode) {
            let URL: string = this.getServiceURL({ endPointURL: endpoint_url, serviceName: inputServiceName }, serviceURL);
            URL = this.appendParameters(inputParamArr, URL);
            URL = this.appendGlbReqId(URL);
            console.log('Put' + inputServiceName, URL, putObj);
            return of(this.getMockData('PUT_' + inputServiceName));
        }
        this.utils.showLoading(inputServiceName);
        let url: string = this.getServiceURL({ endPointURL: endpoint_url, serviceName: inputServiceName });
        url = this.appendParameters(inputParamArr, url);
        url = this.appendQueryParameters(inputQueryParamMap, url);
        return this.http
            .put(url, putObj, this.httpOptions)
            .pipe(
                map((response) => this.extractData(response, true, inputServiceName)),
                catchError((error) => this.handleError(error, true, inputServiceName))
            );
    }

    postServiceCall = (postObj: FormData, inputParamArr: any[] = null,inputQueryParamMap: Map<string,string> = null, inputServiceName: string = null, serviceURL: string = null)
        : Observable<any> => {

        if (this.testMode) {
            let URL: string = this.getServiceURL({ endPointURL: endpoint_url, serviceName: inputServiceName }, serviceURL);
            URL = this.appendParameters(inputParamArr, URL);
            URL = this.appendGlbReqId(URL);
            console.log('POST' + inputServiceName, URL, postObj);
            return of(this.getMockData('POST_' + inputServiceName));
        }
        this.utils.showLoading(inputServiceName);
        let url: string = this.getServiceURL({ endPointURL: endpoint_url, serviceName: inputServiceName });
        url = this.appendParameters(inputParamArr, url);
        url = this.appendQueryParameters(inputQueryParamMap, url);
        return this.http
            .post(url, postObj)
            .pipe(
                map((response) => this.extractData(response, true, inputServiceName)),
                catchError((error) => this.handleError(error, true, inputServiceName))
            );
    }

    saveIndividualServiceCall = (putObj: any, inputServiceName: string = null): Observable<any> => {
        if (this.testMode) {
            let URL: string = this.getServiceURL({ endPointURL: endpoint_url, addSave: true, serviceName: inputServiceName });
            console.log('saveIndividualServiceCall', URL);
            return of(this.getMockData('indSave'));
        }
        this.utils.showLoading(inputServiceName);
        const url: string = this.getServiceURL({ endPointURL: endpoint_url, addSave: true, serviceName: inputServiceName });

        return this.http
            .put(url, putObj, this.httpOptions)
            .pipe(
                map((response) => this.extractData(response, true, inputServiceName)),
                catchError((error) => this.handleError(error, true, inputServiceName))
            );
    }

    updateIndividualServiceCall = (putObj: any, inputServiceName: string = null): Observable<any> => {
        if (this.testMode) {
            const URL: string = this.getServiceURL({ endPointURL: endpoint_url, addupdate: true, serviceName: inputServiceName });
            console.log('updateIndividualServiceCall', URL);
            return of(this.getMockData('indSave'));
        }
        this.utils.showLoading(inputServiceName);
        const url: string = this.getServiceURL({ endPointURL: endpoint_url, addupdate: true, serviceName: inputServiceName });

        return this.http
            .put(url, putObj, this.httpOptions)
            .pipe(
                map((response) => this.extractData(response, true, inputServiceName)),
                catchError((error) => this.handleError(error, true, inputServiceName))
            );
    }

    deleteIndividualServiceCall = (sectionId: string, inputServiceName: string = null): Observable<any> => {
        if (this.testMode) {
            const URL: string = this.getServiceURL({ endPointURL: endpoint_url, adddelete: true, serviceName: inputServiceName })
                + '/' + sectionId;
            console.log('deleteIndividualServiceCall', URL);
            return of(this.getMockData('deleteSection'));
        }
        this.utils.showLoading(inputServiceName);
        const url: string = this.getServiceURL({ endPointURL: endpoint_url, adddelete: true, serviceName: inputServiceName })
            + '/' + sectionId;
        return this.http
            .delete(url, this.httpOptions)
            .pipe(
                map((response) => this.extractData(response, true, inputServiceName)),
                catchError((error) => this.handleError(error, true, inputServiceName)));
    }

    deleteServiceCall = (deleteFieldId: string, inputServiceName: string = null): Observable<any> => {
        if (this.testMode) {
            const URL: string = this.getServiceURL({ endPointURL: endpoint_url,  serviceName: inputServiceName })
                + '/' + deleteFieldId;
            console.log('deleteServiceCall', URL);
            return of(this.getMockData('DELETE_' + inputServiceName));
        }
        this.utils.showLoading(inputServiceName);
        const url: string = this.getServiceURL({ endPointURL: endpoint_url, serviceName: inputServiceName })
            + '/' + deleteFieldId;
        return this.http
            .delete(url, this.httpOptions)
            .pipe(
                map((response) => this.extractData(response, true, inputServiceName)),
                catchError((error) => this.handleError(error, true, inputServiceName)));
    }


    private appendParameters(inputParamArr: any[] = null, url: string) {
        if (inputParamArr) {
            inputParamArr.forEach(urlParam => {
                if (urlParam) {
                    url = url + '/' + urlParam;
                }
            });
        }
        return url;
    }
    private appendQueryParameters(inputQueryParamMap: Map<string,string>, url: string) {
        if (inputQueryParamMap) {
            url=url+'?';
            inputQueryParamMap.forEach(function(value, key, map){
                url=url+key+'='+value+'&';
            });
        }

        return url;
    }

    getPlaceDetailsByStagingID(stagingPlaceID, companyCustID): Observable<any> {
        if (this.testMode) {
            return of(this.getMockData('stagingResponse'));
        }
        const url = 'newPlace/details/' + companyCustID + '/' + (stagingPlaceID ? stagingPlaceID : 0);
        return this.http
            .get(url, { observe: 'response' })
            .pipe(
                map((response) => this.extractData(response, false)),
                catchError((error) => this.handleError_PlaceDetails(error)));
    }

    getPlaceDetailsByPlaceID(placeID: string): Observable<any> {
        if (this.testMode) {
            return of(this.getMockData('stagingResponse'));
        }
        const url = 'place/detail?placeId=' + (placeID ? placeID : 0);
        return this.http
            .get(url, { observe: 'response' })
            .pipe(
                map((response) => this.extractData(response, false)),
                catchError((error) => this.handleError_PlaceDetails(error)));
    }

    getPlaceDetailsByGlbReqId(): Observable<any> {
        if (this.testMode) {
            return of(this.getMockData('stagingResponse'));
        }
        const url = 'placebar/detail?path=' + this.utils.path;
        return this.http
            .get(url, { observe: 'response' })
            .pipe(
                map((response) => this.extractData(response, false)),
                catchError((error) => this.handleError_PlaceDetails(error)));
    }

    //COMMON SERVICE
    public handleError_PlaceDetails(error) {
        return observableThrowError(error.error);
    }

    public handleError(error: HttpErrorResponse, displayloading = true, callingMethodName: string = null) {
        if (displayloading) {
            this.utils.closeLoading(callingMethodName);
        }
        return observableThrowError(error.error);
    }

    public extractData(res: HttpResponse<any> | any, displayloading = true, callingMethodName: string = null) {
        if (displayloading) {
            this.utils.closeLoading(callingMethodName);
        }
        if (res && res.body) {
            if (res.body.reviewList && res.body.reviewList.length > 0) {
                let arrayObj: any[] = []
                arrayObj = res.body.reviewList;
                res.body.reviewList = _.filter(arrayObj, function (n) {
                    return n.currentInd === 'C';
                });
                this.utils.setPageComments(res.body.reviewList);
            }
            /* if(res.body.displayType) { */
                this.utils.setPageTitle ();
           /*  } */
            //this.utils.setPageComments(res.body.reviewList);
            return res.body;
        }
        return res;
    }

    public checkOKResponse(res: HttpResponse<any> | any, displayloading = true, callingMethodName: string = null) {
        if (displayloading) {
            this.utils.closeLoading(callingMethodName);
        }
        return (200 === res.status);
    }

    /* public appendParms(placeID: string, ltfID: string, url: string): string {
        let returnURL = url;
        if (ltfID) {
            returnURL += '?permitId=' + ltfID + '&placeId=' + placeID;
        }
        return returnURL;
    } */

    public appendGlbReqId(url: string) {
        let returnURL = url;
        if (this.utils.glbReqId) {
            returnURL += '/' + this.utils.glbReqId;
            this.utils.glbReqId = null;
        }
        return returnURL;
    }

    private getServiceURL(serviceURLObj: any = null, serviceURL: string = null) {

        if (serviceURLObj.addSave) {
            return serviceURLObj.endPointURL + this.utils.path + '/save/' + serviceURLObj.serviceName;
        } else if (serviceURLObj.addupdate) {
            return serviceURLObj.endPointURL + this.utils.path + '/update/' + serviceURLObj.serviceName;
        } else if (serviceURLObj.adddelete) {
            return serviceURLObj.endPointURL + this.utils.path + '/delete/' + serviceURLObj.serviceName;
        } else if (serviceURLObj.serviceName) {
            return serviceURLObj.endPointURL + this.utils.path + '/' + serviceURLObj.serviceName;
        } else {
            return serviceURL;
        }
    }

    private getMockData(mockDataKey: string) {
        //console
        let returnObj = {};
        //console.log(`this.utils.path: ${this.utils.path}`);
        if (this.utils.path && environment[this.utils.path][mockDataKey]) {
            returnObj = environment[this.utils.path][mockDataKey];
        } else if (environment[mockDataKey]) {
            returnObj = environment[mockDataKey];
        }
        if(returnObj['reviewList']) {
            this.utils.setPageComments(_.filter(returnObj['reviewList'], function (n) {
                return n.currentInd === 'C';
            }));
        }
        
        this.utils.setPageTitle ();
        
        console.log(returnObj)
        return returnObj;
    }
}
