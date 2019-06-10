import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { throwError as observableThrowError, Observable, of } from 'rxjs';

/**
 * Global service class consist of methods to get loggedin user details and help text.
 */
@Injectable()
export class GlobalService {

    private http: HttpClient;
    private testMode: boolean;
    private params: URLSearchParams;

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(http: HttpClient) {
        this.http = http;
    }

    /**
     * Featch logged in user details.
     */
    getUserDetails() {
        if (this.testMode) {
            return of({ "error_fields": null, "system_error": null, "error_code_list": null, "first_name": "DONOTUSE", "last_name": "COMPANY", "email_id": "ISDUQA192@IWANTITALL.COM", "role": "RCO" });
        }
        const url = '/mydeq/service/user';
        return this.http
            .get(url, { observe: 'response' })
            .pipe(
                map((response) => { return response || {}; }),
                catchError((error) => { return observableThrowError(error.error); })
            );
    }

    /**
     * Featch help text for page.
     * 
     * @param moduleName 
     * @param path 
     * @param pageId 
     */
    getHelpDetails(moduleName, path, pageId) {
        if (this.testMode) {
            return of({ "error_fields": null, "system_error": null, "error_code_list": null, "next_page": null, "previous_page": null, "alert_message": null, "alert_header": null, "reviewList": null, "faqList": null, "resourceList": null, "videoList": null, "contactDetailList": null })
        }
        let url = '/notices-api/help/' + moduleName;

        if (path) {
            url = url + '/' + path;
        }
        url = url + '/fetchDetails';
        console.log(pageId);
        if (pageId) {
            url = url + '?pageId=' + pageId;
        }

        return this.http
            .get(url, { observe: 'response' })
            .pipe(
                map((response) => {
                    if (response && response.body) {
                        return response.body;
                    }
                    return response;
                }),
                catchError((error) => { return observableThrowError(error.error); })
            );
    }


}