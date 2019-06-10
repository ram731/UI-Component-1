
import { throwError as observableThrowError, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Utils } from '../shared/Utils';
import { BaseServices } from './manager-base-services.service';
const endpoint_url = environment.contextPath + '/service/manager/';

/**
 * App Specific service class.
 */
@Injectable()
export class ManagerService extends BaseServices {

  private testMode: boolean;
  constructor(http: HttpClient, utils: Utils) {
    super(http, utils);
    this.testMode = environment.testMode;
  }

  getInventoryList(serviceName: string) {
    let url = endpoint_url + this.utils.processName + serviceName;
    if (this.testMode) {
      return of(environment.questionList);
    }
    return this.getServiceCall(url);
  }

  

}
