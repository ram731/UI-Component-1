import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Utils } from '../../../shared/Utils';

import { AppService } from '../../../service/app.service';
import { MyDeqErrorHandler } from '../../../core/errorHandler';

import { BasePathController } from '../../components/base-path-component.component';
import { MydeqAlertModalComponent } from '../../../core/component/modals/alert-modal';
import { WhatsNeededPageContent } from './whats-needed.resourcebundle';


@Component({
  selector: 'whats-needed',
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
      this.setPageLoadServiceName("whatsNeeded");

      console.log('Constructor ', this.pageText)
    }

  /**
    * @whatItDoes - This method will call by @class BaseComponent @function ngOnInit method to set the form as per input received.
   */
  onGetResponse(getResponse: any): void {
    this.feeAmount = getResponse.registrationFeeDetails;
   // this.pageText = this.message.getWhatsNeededText(this.utils.p2Path);
  }

  /**
   * @whatItDoes - This method will call by @class BaseComponent @function ngOnInit method. If service gives alert_message than show Alert Modal.
   */
  onGETError(error) {
    if (error && error.alert_message) {
      this.myAlertModal.showBackToDashboardModal(error.alert_header, error.alert_message);
    }
  }

  



  createForm(): FormGroup {
    return this.formBuilder.group({});
  }

}
