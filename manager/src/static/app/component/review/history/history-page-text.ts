import { BasePageContent } from "../../json/base-content";

export class HistoryText extends BasePageContent{

    constructor(){
        super();
        this.getPageSpecificText();
    }

    public getPageSpecificText(){
            this.PAGE_TEXT['header']='VIEW COMMENT HISTORY';
            this.PAGE_TEXT['lbl_review_status']='Review Status:'; 
            this.PAGE_TEXT['lbl_updated_by']='Updated by:'; 
            this.PAGE_TEXT['lbl_date']='Date:'; 
            this.PAGE_TEXT['lbl_comments']='Comments:';
            this.PAGE_TEXT['lbl_close']='CLOSE';
    }
}