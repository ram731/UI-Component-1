import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MydeqComponentConfig } from '../../../shared/lib/component-config/mydeq-component-config';
import { BaseComponent } from '../../../component/base-component/basecomponent.component';
import { AppService } from '../../../service/app.service';
import { MyDeqErrorHandler } from '../../../shared/errorHandler';
import { Utils } from '../../../shared/Utils';
import {PagecontentSelectCompany} from './selectcompany.resourcebundle';

@Component({
    selector: 'select-company',
    templateUrl: './select-company.component.html'
})
@MydeqComponentConfig({
    route: [{ pageURL: '/existing/select-company' }],
    serviceName: 'selectcompany',
    resourceBundle: PagecontentSelectCompany,
    placeBarRequired: false,
    showSaveAndExit: false,
    title: 'Select Company'
})
export class SelectCompanyComponent extends BaseComponent {

    companyList: any[];
    isIndividual: boolean;

    constructor(protected activatedRoute: ActivatedRoute,
        protected formBuilder: FormBuilder,
        protected utils: Utils,
        protected appService: AppService,
        protected errorHandler: MyDeqErrorHandler) {
        super(activatedRoute, formBuilder, utils, appService, errorHandler);
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
}
