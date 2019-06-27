import { PageTextSetter } from "./pagetext-setter.component";
import { PageTextGetter } from "./pagetext-getter.component";
import { Injectable } from "@angular/core";
import{BasePageContent} from '../../component/json/base-content';

/**
 * This service is called from BaseController to register a page content class against current instance.
 * 
 *  Its a Singleton service.
 */
@Injectable()
export class PageConentService{

    private static instance:PageConentService=null;

    /**
     * Sets PageConentService instance in static field.
     * 
     * @param instace : PageConentService instance
     */
    public static setInstance(instace:PageConentService){
        PageConentService.instance = instace;
    }

    /**
     * Returns instance of PageConentService.
     * 
     * @returns : PageConentService.instance
     */
    public static getInstance(){
        return PageConentService.instance;
    }

    public registerBasePageContent(pageComponent:any,contentInstance:PageTextGetter){
        if(contentInstance instanceof BasePageContent){
            pageComponent.setPageContent(contentInstance.getPageContent());
        }
        
    }

    /**
     * It register(associate) page content instance with page controller of Basepage type.
     * 
     * @param pageComponent : Page controller instance.
     * 
     * @param contentInstance : PageTextGetter instance.
     */
    public registerPageContent(pageComponent:PageTextSetter,contentInstance:PageTextGetter){        
        pageComponent.setPageContent(contentInstance.getPageContent());
    }
}