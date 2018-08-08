import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Utils } from '../shared/Utils';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as _ from 'lodash';


const endpoint_url: string = environment.contextPath + 'service/';

@Injectable()
export class AppService {

    http: HttpClient;
    testMode: boolean;
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(http: HttpClient, public utils: Utils) {}

    getServiceCall(inputParamArr: any[] = null): Observable<any> {
        if (this.testMode) {
            let url: string = this.utils.getServiceURL({ endPointURL: endpoint_url });
            url = this.appendParameters(inputParamArr, url);
            url = this.appendGlbReqId(url);
            console.log('URL', url);
            return of(this.utils.getMockData('GET_' + this.utils.getServiceName()));
        }
        this.utils.showLoading(this.utils.currentPageName);
        let url: string = this.utils.getServiceURL({ endPointURL: endpoint_url });
        url = this.appendParameters(inputParamArr, url);
        url = this.appendGlbReqId(url);
        return this.http
            .get(url, { observe: 'response' })
            .pipe(
                map((response) => this.extractData(response, true, this.utils.currentPageName)),
                catchError((error) => this.handleError(error, true, this.utils.currentPageName))
            );
    }

    putServiceCall = (putObj: any, inputParamArr: any[] = null): Observable<any> => {

        if (this.testMode) {
            let url: string = this.utils.getServiceURL({ endPointURL: endpoint_url });
            url = this.appendParameters(inputParamArr, url);
            url = this.appendGlbReqId(url);
            console.log('Put' + this.utils.currentPageName, url, putObj);
            return of(this.utils.getMockData('PUT_' + this.utils.getServiceName()));
        }
        this.utils.showLoading(this.utils.currentPageName);
        let url: string = this.utils.getServiceURL({ endPointURL: endpoint_url });
        url = this.appendParameters(inputParamArr, url);

        return this.http
            .put(url, putObj, this.httpOptions)
            .pipe(
                map((response) => this.extractData(response, true, this.utils.currentPageName)),
                catchError((error) => this.handleError(error, true, this.utils.currentPageName))
            );
    }

    saveIndividualServiceCall = (putObj: any): Observable<any> => {
        if (this.testMode) {
            let url: string = this.utils.getServiceURL({ endPointURL: endpoint_url, addSave: true });
            console.log('saveIndividualServiceCall', url);
            return of(this.utils.getMockData('indSave'));
        }
        this.utils.showLoading(this.utils.currentPageName);
        let url: string = this.utils.getServiceURL({ endPointURL: endpoint_url, addSave: true });

        return this.http
            .put(url, putObj, this.httpOptions)
            .pipe(
                map((response) => this.extractData(response, true, this.utils.currentPageName)),
                catchError((error) => this.handleError(error, true, this.utils.currentPageName))
            );
    }

    updateIndividualServiceCall = (putObj: any): Observable<any> => {
        if (this.testMode) {
            let url: string = this.utils.getServiceURL({ endPointURL: endpoint_url, addupdate: true });
            console.log('updateIndividualServiceCall', url);
            return of(this.utils.getMockData('indSave'));
        }
        this.utils.showLoading(this.utils.currentPageName);
        let url: string = this.utils.getServiceURL({ endPointURL: endpoint_url, addupdate: true });

        return this.http
            .put(url, putObj, this.httpOptions)
            .pipe(
                map((response) => this.extractData(response, true, this.utils.currentPageName)),
                catchError((error) => this.handleError(error, true, this.utils.currentPageName))
            );
    }

    deleteIndividualServiceCall = (sectionId: string): Observable<any> => {
        if (this.testMode) {
            let url: string = this.utils.getServiceURL({ endPointURL: endpoint_url, adddelete: true });
            console.log('deleteIndividualServiceCall', url);
            return of(this.utils.getMockData('deleteSection'));
        }
        this.utils.showLoading(this.utils.currentPageName);
        let url: string = this.utils.getServiceURL({ endPointURL: endpoint_url, adddelete: true }) + '/' + sectionId;
        return this.http
            .delete(url, this.httpOptions)
            .pipe(
                map((response) => this.extractData(response, true, this.utils.currentPageName)),
                catchError((error) => this.handleError(error, true, this.utils.currentPageName)));
    }


    private appendParameters(inputParamArr: any[] = null, url: string) {
        if (inputParamArr) {
            inputParamArr.forEach(urlParam => {
                if(urlParam) {
                    url = url + '/' + urlParam
                }
            });
        }
        return url;
    }

    getPlaceDetailsByStagingID(stagingPlaceID, companyCustID): Observable<any> {
        if (this.testMode) {
            return of(this.utils.getMockData('stagingResponse'));
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
            return of(this.utils.getMockData('stagingResponse'));
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
            return of(this.utils.getMockData('stagingResponse'));
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
        return Observable.throw(error.error);
    }

    public handleError(error: HttpErrorResponse, displayloading = true, callingMethodName: string = null) {
        if (displayloading) {
            this.utils.closeLoading(callingMethodName);
        }
        return Observable.throw(error.error);
    }

    public extractData(res: HttpResponse<any> | any, displayloading = true, callingMethodName: string = null) {
        if (displayloading) {
            this.utils.closeLoading(callingMethodName);
        }
        if (res && res.body) {
            if(res.body.reviewList && res.body.reviewList.length > 0) {
                let arrayObj: any[] = []
                arrayObj = res.body.reviewList;
                res.body.reviewList = _.filter(arrayObj, function(n) { 
                    return n.currentInd === 'C'; });
            }
            this.utils.setPageComments(res.body.reviewList);
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

    public appendParms(placeID: string, ltfID: string, url: string): string {
        let returnURL = url;
        if (ltfID) {
            returnURL += '?permitId=' + ltfID + '&placeId=' + placeID;
        }
        return returnURL;
    }

    public appendGlbReqId(url: string) {
        let returnURL = url;
        if (this.utils.glbReqId) {
            returnURL += '/' + this.utils.glbReqId;
            this.utils.glbReqId = null;
        }
        return returnURL;
    }
}
