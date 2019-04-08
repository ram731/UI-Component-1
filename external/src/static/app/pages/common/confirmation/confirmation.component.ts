import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Utils } from '../../../shared/Utils';
import { BaseController } from '../../../core/base-component/basecontroller.component';
import { AppService } from '../../../service/app.service';
import { MyDeqErrorHandler } from '../../../core/errorHandler';
import { LoggerService } from '../../../shared/lib/logger/logger-service.component';
import { PagecontentConfirmation } from './confirmation.resourcebundle';
import { BasePathController } from '../../components/base-path-component.component';
import { environment } from '../../../../environments/environment';
@Component({
    selector: 'confirmation',
    templateUrl: './confirmation.component.html'
})

export class ConfirmationComponent extends BasePathController {

    model : any = {};
    constructor(protected activatedRoute: ActivatedRoute,
        protected formBuilder: FormBuilder,
        protected utils: Utils,
        protected appService: AppService,
        protected errorHandler: MyDeqErrorHandler,
        private logger: LoggerService) {
        super(activatedRoute, formBuilder, utils, appService, errorHandler, new PagecontentConfirmation());
        this.setPageLoadServiceName("confirmation");
      
    }

    onGetResponse(getResponse: any): void {
       this.model = getResponse.confirmationDetails;
       if(this.model.displayType && this.model.displayType === 'AMENDMENT') {
           this.utils.setPageTitle('AMENDMENT');
       }
    }

    createForm(): FormGroup {
        return null;
    }

    downloadDoc(){
        const endpoint_url: string = environment.contextPath + '/service/'+this.utils.path + '/download/summary_cor';
        window.open(endpoint_url);
    }
    exitClick(){
        this.utils.gotoDashboard();
    }
    
}
