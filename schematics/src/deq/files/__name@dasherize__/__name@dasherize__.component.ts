import { Component } from '@angular/core';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AppService } from '<%= dirSteps %>../service/app.service';
import { MyDeqErrorHandler } from '<%= dirSteps %>../core/errorHandler';
import { Utils } from '<%= dirSteps %>../shared/Utils';
import { <%= classify(name) %>ReportPageContent } from './<%= dasherize(name) %>.resourcebundle';
import { BasePathController } from '<%= dirSteps %>components/base-path-component.component';


@Component({
  selector: '<%= dasherize(name) %>',
  templateUrl: '<%= dasherize(name) %>.component.html'
})
export class <%= classify(name) %>Component extends BasePathController {

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected formBuilder: FormBuilder,
    public utils: Utils,
    protected appService: AppService,
    protected errorHandler: MyDeqErrorHandler,
  ) {
    super(activatedRoute, formBuilder, utils, appService, errorHandler, new <%= classify(name) %>ReportPageContent());
    // this.setPageLoadServiceName('');
  }

  onGetResponse(response) {

  }

  createForm(): FormGroup {
    return new FormGroup({  });
  }
}