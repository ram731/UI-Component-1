import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AppService } from '../../../service/app.service';
import { MyDeqErrorHandler } from '../../../core/errorHandler';
import { Utils } from '../../../shared/Utils';
import { PagecontentSelectCompany } from './selectcompany.resourcebundle';
import { BaseController } from 'src/static/app/core/base-component/basecontroller.component';
import { LoggerService } from 'src/static/app/shared/lib/logger/logger-service.component';

@Component({
    selector: 'select-company',
    templateUrl: './select-company.component.html'
})
/* @MydeqComponentConfig({
    route: [{ pageURL: '/existing/select-company' }],
    serviceName: 'selectcompany',
    resourceBundle: PagecontentSelectCompany,
    placeBarRequired: false,
    showSaveAndExit: false,
    title: 'Select Company'
}) */
export class SelectCompanyComponent extends BaseController {

    companyList: any[];
    isIndividual: boolean;

    constructor(protected activatedRoute: ActivatedRoute,
        protected formBuilder: FormBuilder,
        protected utils: Utils,
        protected appService: AppService,
        protected errorHandler: MyDeqErrorHandler,
        private logger: LoggerService) {
        super(activatedRoute, formBuilder, utils, appService, errorHandler, new PagecontentSelectCompany());
        this.setPageLoadServiceName("selectcompany");
        this.logger.debug('Debug logger');
        this.sampleGet();
    }

    onGetResponse(getResponse: any): void {
        this.companyList = getResponse.userCompanylist;
        this.isIndividual = false;
    }

    createForm(): FormGroup {
        return this.formBuilder.group({
            companyCustID: new FormControl(null)
        });
    }

    sampleGet() {
        this.additionalGetCall({
            serviceURL: 'abc',
            successcallBack: function (resp) {
                this.logger.debug('Success Resp', resp);
            }.bind(this),
            errorcallBack: function (err) {
                this.logger.debug('err Resp', err);
            }.bind(this)
        })
    }
}
