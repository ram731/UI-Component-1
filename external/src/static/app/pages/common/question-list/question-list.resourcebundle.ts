import { BasePageContent } from "../../../core/content/base-page-content.component";

export class PagecontentQuestionList extends BasePageContent{
    getPageSpecificText(){

        this.PAGE_TEXT['cc'] = {
            header: 'Question List',
            sub_header: 'Click EDIT to answer questions. Once all questions are answered you will be able to click CONTINUE to proceed.',
            lbl_qst:'QUESTION',
            lbl_attchment:`ATTACHMENT`,
            lbl_need_revision:`INFORMATION REQUESTED`,
            lbl_incomplete_cert:`Incomplete Certification`,
            lbl_incomplete_cert_sub:`Your compliance certification is incomplete. Please answer all questions to CONTINUE.`,
            
            lbl_complete_cert:`Completed Certification`,
            lbl_complete_cert_sub:`Your compliance certification is complete. Click CONTINUE to proceed.`

            
        };
    }
}
