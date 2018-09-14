import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MydeqComponentConfig } from '../../../core/component-config/mydeq-component-config';
import { BaseComponent } from '../../../shared/component/base-component/basecomponent.component';
import { AppService } from '../../../service/app.service';
import { MyDeqErrorHandler } from '../../../core/errorHandler';
import { Utils } from '../../../shared/Utils';
import {PageContentpermitverification} from './permit-info.resourcebundle';
@Component({
    selector: 'permit-info',
    templateUrl: './permit-info.component.html'
})
@MydeqComponentConfig({
    route: [{ pageURL: '/existing/existing-permit-info' }],
    serviceName: 'existingpermitinfo',
    resourceBundle: PageContentpermitverification,
    placeBarRequired: false,
    showSaveAndExit: false,
    title: 'Permit Info'
})
export class PermitInfoComponent extends BaseComponent{

    ltfInfo: any = {};
    constructor(protected activatedRoute: ActivatedRoute,
        protected formBuilder: FormBuilder,
        protected utils: Utils,
        protected appService: AppService,
        protected errorHandler: MyDeqErrorHandler) {
        super(activatedRoute, formBuilder, utils, appService, errorHandler);
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