import { BasePathController } from "../../components/base-path-component.component";
import { Component } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { PagecontentResponsivePage } from "./responsive-page.resourcebundle";
import { ActivatedRoute } from "@angular/router";
import { Utils } from "../../../shared/Utils";
import { AppService } from "../../../service/app.service";
import { MyDeqErrorHandler } from "../../../core/errorHandler";
import { LoggerService } from "../../../shared/lib/logger/logger-service.component";

@Component({
    selector:'responsive-page',
    templateUrl:'./responsive-page.component.html'
})
export class ResponsivePageComponent extends BasePathController{

    file1:any;
    constructor(protected activatedRoute: ActivatedRoute,
        protected formBuilder: FormBuilder,
        protected utils: Utils,
        protected appService: AppService,
        protected errorHandler: MyDeqErrorHandler,
        private logger: LoggerService
        ) {
        super(activatedRoute, formBuilder, utils, appService, errorHandler, new PagecontentResponsivePage());
        this.setPageLoadServiceName("responsivepage");       

    }

    onGetResponse(getResponse: any): void {
        
    }
    createForm(): FormGroup {
        return this.formBuilder.group({});
    }

    uploadFile(event, i) {
        this.file1 = event.target.files[0];
    }

    chooseFile = (id) => document.getElementById(id).click()


    removeFile() {
                this.file1 = null;
        }
    
}