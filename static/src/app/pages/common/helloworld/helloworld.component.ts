import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MydeqComponentConfig } from '../../../shared/lib/component-config/mydeq-component-config';
import { BaseComponent } from '../../../component/base-component/basecomponent.component';
import { PagecontentHelloWorld } from './helloworld.resourcebundle';
import { AppService } from '../../../service/app.service';
import { MyDeqErrorHandler } from '../../../shared/errorHandler';
import { Utils } from '../../../shared/Utils';
import * as _ from 'lodash';

@Component({
    selector: 'app-hello-world',
    templateUrl: './helloworld.component.html'
})
@MydeqComponentConfig({
    route: [{ pageURL: '/modify/helloworld' }],
    serviceURL: '/abc',
    resourceBundle: PagecontentHelloWorld,
    placeBarRequired: false,
    showSaveAndExit: false,
    title: 'Title'
})
export class HelloWorldComponent extends BaseComponent implements OnInit {

    constructor(protected activatedRoute: ActivatedRoute,
        protected utils: Utils,
        protected appService: AppService,
        protected errorHandler: MyDeqErrorHandler) {
        super(activatedRoute, utils, appService, errorHandler);
    }
    ngOnInit(): void {
        console.log('Hello world init');
    }

    onGetResponse(getResponse: any): void {

    }

    createForm(): FormGroup {
        return null;
    }
}
