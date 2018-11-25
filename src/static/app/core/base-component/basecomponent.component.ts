import { PageTextSetter } from "../content/pagetext-setter.component";

export class BaseComponent implements PageTextSetter{

    public pageText:any={};

    public setPageContent(pageContent:any){
        this.pageText = pageContent;
    }

}