import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Utils } from '../../../shared/Utils';

import { AppService } from '../../../service/app.service';
import { MyDeqErrorHandler } from '../../../core/errorHandler';

import { BasePathController } from '../../components/base-path-component.component';
import { MydeqAlertModalComponent } from '../../../core/component/modals/alert-modal';
import { WhatsNeededPageContent } from './whats-needed.resourcebundle';


@Component({
  selector: 'app-whats-needed',
  templateUrl: './whats-needed.component.html'
})

export class WhatsNeededComponent  extends BasePathController {

  @ViewChild(MydeqAlertModalComponent) myAlertModal: MydeqAlertModalComponent;

  type: string;
  feeAmount: any;
  showLeftButton:any;

  constructor(protected activatedRoute: ActivatedRoute,
    protected formBuilder: FormBuilder,
    public utils: Utils,
    protected appService: AppService,
    protected errorHandler: MyDeqErrorHandler) {
      super(activatedRoute, formBuilder, utils, appService, errorHandler, new WhatsNeededPageContent(utils.path));
    }

  /**
    * @whatItDoes - This method will call by @class BaseComponent @function ngOnInit method to set the form as per input received.
   */
  onGetResponse(getResponse: any): void {
    this.feeAmount = getResponse.registrationFeeDetails;
   // this.pageText = this.message.getWhatsNeededText(this.utils.p2Path);
  }

  /**
    * @whatItDoes - This method will call by @class BaseComponent @function pageContinue method to set the request for put call.
   */
  createPutObject(form: any) {
    return form;
  }

  /**
   * @whatItDoes - This method will call by @class BaseComponent @function ngOnInit method. If service gives alert_message than show Alert Modal.
   */
  onGETError(error) {
    if (error && error.alert_message) {
      this.myAlertModal.showBackToDashboardModal(error.alert_header, error.alert_message);
    }
  }

  /**
   * @whatItDoes - This method will call by @class BaseComponent @function pageContinue method.
   * @param error
   */
  onPutError(error) {
    if (error && error.alert_message) {
      this.myAlertModal.showBackToDashboardModal(error.alert_header, error.alert_message);
    }
  }

  onAlertPutResponse(response: any): any {
    this.onPutError(response);
  }

  /**
   * @whatItDoes - This method will call by @class BaseComponent @function approveEdit method enable fields in review flow.
   */
  performActionOnEdit() {
    throw new Error('Review Path is not applicable. Method not implemented.');
  }

  createForm(): FormGroup {
    return this.formBuilder.group({});
  }

  leftButtonAction(){}

}
