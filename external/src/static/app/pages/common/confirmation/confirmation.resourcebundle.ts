import { BasePageContent } from "../../../core/content/base-page-content.component";

export class PagecontentConfirmation extends BasePageContent{
    getPageSpecificText(){

        this.PAGE_TEXT['cc'] = {
            
            confirmation_msg: 'Your compliance certification has been submitted. ADEQ will review your compliance certification and will notify you if any additional information is needed.',
            confirmation_amend_msg: 'Your compliance certification has been amended. ADEQ will review your updated compliance certification and will notify you if any additional information is needed.',
            confirmation_revison_msg: 'Your compliance certification has been revised. ADEQ will review your compliance certification and will notify you if any additional information is needed.',
            confirmation_amend_revision_msg: 'Your compliance certification has been revised. ADEQ will review your compliance certification and will notify you if any additional information is needed.',
            sub_confirmation_msg:'Please click the PDF icon to the right to save/print your Copy of Record of the compliance certification',
            lbl_lft_id:'Permit #:',
            lbl_rpt_period:'Reporting Period:',
            lbl_return_to:' RETURN TO mySTUFF ',
            lbl_save_print:'SAVE / PRINT',
            lbl_click:'Click to',
            lbl_copy_of_record:'COPY OF RECORD',
            lbl_pdf:'PDF',
        };
    }
}
