import { PageTextSetter } from "../content/pagetext-setter.component";
/**
 * Class BaseComponent is root call which needs to be extended for creating a component which needs static page text ro be maintained in saperate resourcebundel file.
 */
export class BaseComponent implements PageTextSetter{

    /**
     * Page Text Object
     */
    public pageText:any={};

    /**
     * Assignes input page text content to pageText.
     * @param pageContent 
     */
    public setPageContent(pageContent:any){
        this.pageText = pageContent;
    }

}