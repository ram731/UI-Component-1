import { BaseController } from "../../core/base-component/basecontroller.component";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder } from "@angular/forms";

import { AppService } from "../../service/app.service";
import { MyDeqErrorHandler } from "../../core/errorHandler";
import { PageTextGetter } from "../../core/content/pagetext-getter.component";
import { Utils } from "../../shared/Utils";
import * as _ from 'lodash';

/**
 * The BasePathController is an abstract class which always to be extended for creating new page.
 * 
 * It extends BaseController and improvise on it by adding support for application path.
 * 
 * It adds default implementation for path specific page text & page footer.
 * 
 * 
 * @example
 * export class MyNewPageController extends BasePathController
 * {
 * 
 * }
 */
export abstract class BasePathController extends BaseController{
    public pageFooterDTL =null;

    constructor(protected activatedRoute: ActivatedRoute,
        protected formBuilder: FormBuilder,
        protected utils: Utils,
        protected appService: AppService,
        protected errorHandler: MyDeqErrorHandler,
         _pageTextComp?: PageTextGetter) {
        super(activatedRoute,formBuilder,utils,appService,errorHandler,_pageTextComp);
        this.pageText = this.getPathSpecificText();

        this.pageFooterDTL = {
            leftButtonTxt:this.pageText.back,
            leftButtonAction:()=>{
                this.goBack();
            },

            rightButtonTxt:this.pageText.saveAndContinue,
            rightButtonAction:()=>{                
                this.pageContinue(this.pageForm?this.pageForm.getRawValue():{})
            }          
        }
    }

    protected getPathSpecificText(){
        let pathSpecificPageText={};
        _.merge(pathSpecificPageText,this.pageText.base);
        _.merge(pathSpecificPageText,this.pageText[this.utils.path]);
        return pathSpecificPageText
    }
    
}