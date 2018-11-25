import { BasePageContent } from "src/static/app/core/content/base-page-content.component";

export class PagecontentSelectCompany extends BasePageContent{
    getPageSpecificText(){

        this.PAGE_TEXT['existing'] = {
            header: 'Which of your companies/agencies is this for? ',
            sub_header: 'Select one and click CONTINUE.',
            warning_msg : 'Warning: Your session will time out in 20 minutes of non-activity on a single screen. There is not a save feature in myDEQ at this time. You will need to complete the entire process within the same session.',
            lbl_continue: 'Continue'
        };
    }
}
