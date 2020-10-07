import { PageTextGetter } from '../../core/content/pagetext-getter.component';

/**
 * A base content file. It contains commonly used lables on page.
 */
export abstract class BasePageContent implements PageTextGetter{
    public PAGE_TEXT={
        base:{
            select:`Select One`,
            cancel:`CANCEL`,
            save:`SAVE`,
            saveAndContinue:`SAVE & CONTINUE`,
            delete:`DELETE`,
            edit:`EDIT`,
            continue:`CONTINUE`,
            back:`BACK`,
            radio_yes:'Yes',
            radio_no:'No',
            lbl_fileUpload:`PDF,ZIP,XLS,XLSX or DOC file only | 20mb max`,
            delete_yes:`YES`,
            delete_no:`NO`,
        }
    }

    constructor(){
        this.getPageSpecificText();
    }
    public abstract getPageSpecificText();

    public getPageContent(){
        return this.PAGE_TEXT;
    }
}