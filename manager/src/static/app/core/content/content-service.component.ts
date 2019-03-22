import { PageTextSetter } from "./pagetext-setter.component";
import { PageTextGetter } from "./pagetext-getter.component";
import { Injectable } from "@angular/core";
import{BasePageContent} from '../../component/json/base-content';

@Injectable()
export class PageConentService{

    private static instance:PageConentService=null;
    public static setInstance(instace:PageConentService){
        PageConentService.instance = instace;
    }

    public static getInstance(){
        return PageConentService.instance;
    }

    public registerBasePageContent(pageComponent:any,contentInstance:PageTextGetter){
        if(contentInstance instanceof BasePageContent){
            pageComponent.setPageContent(contentInstance.getPageContent());
        }
        
    }

    public registerPageContent(pageComponent:PageTextSetter,contentInstance:PageTextGetter){        
        pageComponent.setPageContent(contentInstance.getPageContent());
    }
}