import { BaseComponent } from "./basecomponent.component";
import { PageTextGetter } from "./content/pagetext-getter.component";
import { PageConentService } from './content/content-service.component';
import { MyDeqErrorHandler } from '../shared/errorHandler';

export class BaseControllerComponent extends BaseComponent {

    public const:any=null;    
    errorFields: any = [];
    errorsList: any = [];
    model:any;
    
    constructor( protected errorHandler:MyDeqErrorHandler, _pageTextComp?: PageTextGetter) {
       super();
       if(_pageTextComp){
        PageConentService.getInstance().registerBasePageContent(this, _pageTextComp);
       }
    }

    protected handleError(error:any){
        this.errorFields=this.errorHandler.getErrorFields(error);
        this.errorsList=this.errorHandler.getErrors(error);
       // console.log('handleError',this.errorFields,this.errorsList);
    }

    protected cleanErrorList(){
        this.errorFields=[];
        this.errorsList=[];
    }
}
