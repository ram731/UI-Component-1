import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Utils } from '../shared/Utils';
import { Observable } from 'rxjs';
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

    constructor(http: HttpClient, public utils: Utils) {
        this.http = http;
        this.testMode = environment.testMode;
    }


    getPlaceDetailsByPlaceID(placeID: string) {
        if (this.testMode) {
           // return Observable.of(this.utils.getMockData('stagingResponse'));
        }
        const url = 'place/detail?placeId=' + (placeID ? placeID : 0);
        return this.http
            .get(url, { observe: 'response' })
            .pipe(
            map((response) => this.extractData(response, false)),
            catchError((error) => this.handleError_PlaceDetails(error)));
    }

    getPlaceDetailsByGlbReqId() {
        if (this.testMode) {
            //return Observable.of(this.utils.getMockData('stagingResponse'));
        }
        const url = 'placebar/detail?path=' + this.utils.path;
        return this.http
            .get(url, { observe: 'response' })
            .pipe(
            map((response) => this.extractData(response, false)),
            catchError((error) => this.handleError_PlaceDetails(error)));
    }

    getPlaceDetailsByStagingID(stagingPlaceID, companyCustID) {
        if (this.testMode) {
            //return Observable.of(this.utils.getMockData('stagingResponse'));
        }
        const url = 'newPlace/details/' + companyCustID + '/' + (stagingPlaceID ? stagingPlaceID : 0);
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
        //this.triggerPageLoadEvent();
        return Observable.throw(error.error);
        // return Observable.throw(error.json().error || 'Server error');
    }

    public extractData(res: HttpResponse<any> | any, displayloading = true, callingMethodName: string = null) {
        if (displayloading) {
            this.utils.closeLoading(callingMethodName);
        }
        //this.triggerPageLoadEvent();
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


   /*  public triggerPageLoadEvent() {
        this.utils.pageDataLoadObservable.next(true);
    } */

}