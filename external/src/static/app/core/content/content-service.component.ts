import { PageTextSetter } from "./pagetext-setter.component";
import { PageTextGetter } from "./pagetext-getter.component";
import { Injectable } from "@angular/core";
import { BasePageContent } from "./base-page-content.component";


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
            contentInstance.getPageSpecificText();
            pageComponent.setPageContent(contentInstance.getPageContent());
        }
        
    }

    public registerPageContent(pageComponent:PageTextSetter,contentInstance:PageTextGetter){        
        pageComponent.setPageContent(contentInstance.getPageContent());
    }
}