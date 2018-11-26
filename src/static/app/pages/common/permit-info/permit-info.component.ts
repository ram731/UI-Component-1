import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AppService } from '../../../service/app.service';
import { MyDeqErrorHandler } from '../../../core/errorHandler';
import { Utils } from '../../../shared/Utils';
import {PageContentpermitverification} from './permit-info.resourcebundle';
import { BaseController } from 'src/static/app/core/base-component/basecontroller.component';
@Component({
    selector: 'permit-info',
    templateUrl: './permit-info.component.html'
})
/* @MydeqComponentConfig({
    route: [{ pageURL: '/existing/existing-permit-info' }],
    serviceName: 'existingpermitinfo',
    resourceBundle: PageContentpermitverification,
    placeBarRequired: false,
    showSaveAndExit: false,
    title: 'Permit Info'
}) */
export class PermitInfoComponent extends BaseController{

    ltfInfo: any = {};
    constructor(protected activatedRoute: ActivatedRoute,
        protected formBuilder: FormBuilder,
        protected utils: Utils,
        protected appService: AppService,
        protected errorHandler: MyDeqErrorHandler) {
        super(activatedRoute, formBuilder, utils, appService, errorHandler
            ,new PageContentpermitverification());
        this.setPageLoadServiceName("existingpermitinfo");
    }

    

    onGetResponse(getResponse: any): void {
        this.ltfInfo = getResponse.ltfInfo;
        console.log('here');
     }
 
     createForm(): FormGroup {
         return this.formBuilder.group({
            booleanAnswer: new FormControl(null)
         });
     }

}