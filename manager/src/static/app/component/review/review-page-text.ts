import { BasePageContent } from '../json/base-content';

export class ReviewSectionText extends BasePageContent {

    constructor() {
        super();
        this.getPageSpecificText();
    }

    public getPageSpecificText() {

        this.PAGE_TEXT['lbl_review'] = 'Review';
        this.PAGE_TEXT['lbl_no_defeciencies'] = 'NO DEFICIENCIES DETECTED';
        this.PAGE_TEXT['lbl_potential_defeciencies'] = 'POTENTIAL DEFICIENCIES';
        this.PAGE_TEXT['lbl_additional_request'] = 'REQUEST ADDITIONAL DETAILS';
        this.PAGE_TEXT['lbl_previously_reviewed'] = 'PREVIOUSLY REVIEWED';
        this.PAGE_TEXT['lbl_comments'] = 'Comments to the Customer:';
        this.PAGE_TEXT['lbl_history'] = 'REVIEW HISTORY';
        this.PAGE_TEXT['lbl_last_comments'] =`Reviewer Comments:`;

        this.PAGE_TEXT['lbl_date'] =`Date:`;
        this.PAGE_TEXT['lbl_updated_by'] =`Updated by:`;
    }
}