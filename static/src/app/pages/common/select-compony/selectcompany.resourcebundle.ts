export class PagecontentSelectCompany {
    protected PAGE_TEXT: any = {};

    constructor() {
        this.PAGE_TEXT.existing = this.getCommonLabels();
        }

       protected getCommonLabels(){
        return  {
            header: 'Which of your companies/agencies is this for? ',
            sub_header: 'Select one and click CONTINUE.',
            warning_msg : 'Warning: Your session will time out in 20 minutes of non-activity on a single screen. There is not a save feature in myDEQ at this time. You will need to complete the entire process within the same session.',
            lbl_continue: 'Continue'
        };
    }
}
