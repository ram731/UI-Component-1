import { BaseComponent } from "./basecomponent.component";
import { PageTextGetter } from "./content/pagetext-getter.component";
import { PageConentService } from './content/content-service.component';
import { MyDeqErrorHandler } from '../shared/errorHandler';

/**
 * The BaseController is an abstract class which needs to be extended for creating new page.
 * @example
 * export class MyNewPageController extends BaseController
 * {
 * 
 * }
 */
export class BaseControllerComponent extends BaseComponent {

    public const:any=null;    
    errorFields: any = [];
    errorsList: any = [];
    model:any;
    
    /**
     * Creates an instance of contorller & associate pagetext.
     */
    constructor( protected errorHandler:MyDeqErrorHandler, _pageTextComp?: PageTextGetter) {
       super();
       if(_pageTextComp){
        PageConentService.getInstance().registerBasePageContent(this, _pageTextComp);
       }
    }

      /**
     * This method parse input error object and populate 'errorFields' & 'errorsList' array.
     * 
     * @param error -service error object
     */
    protected handleError(error:any){
        this.errorFields=this.errorHandler.getErrorFields(error);
        this.errorsList=this.errorHandler.getErrors(error);
       // console.log('handleError',this.errorFields,this.errorsList);
    }

    /**
     * This method clears 'errorFields' & 'errorsList' array.
     */
    protected cleanErrorList(){
        this.errorFields=[];
        this.errorsList=[];
    }
}
