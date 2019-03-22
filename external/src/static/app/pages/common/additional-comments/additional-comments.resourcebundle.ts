import { BasePageContent } from "../../../core/content/base-page-content.component";

export class PagecontentAdditionalComments extends BasePageContent{
    getPageSpecificText(){

        this.PAGE_TEXT['cc'] = {
            header: 'Additional Comments',
            sub_header: 'Provide any additional information in the following text box and/or upload any additional files.',
            choose_file:'CHOOSE FILE',
            file_types_allowed:'Zip,PDF,XLS,XLSX or DOC file only | 20 mb max',
            yes:'Yes',
            no:'No',
            are_you_sure_delete:'Are you sure you want to delete?',
            sub_question:'Do you have any additional files to upload?',
            sub_question_continue_text:'Select "Yes" or "No" and click SAVE & CONTINUE.'
        };
    }
}
