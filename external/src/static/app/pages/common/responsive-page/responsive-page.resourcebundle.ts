import { BasePageContent } from "../../../core/content/base-page-content.component";

export class PagecontentResponsivePage extends BasePageContent{
    getPageSpecificText(){

        this.PAGE_TEXT['cc'] = {
            header: 'Additional Comments',
            sub_header: 'Provide any additional information in the following text box and/or upload any additional files.',
            choose_file:'CHOOSE FILE',
            file_types_allowed:'Zip,PDF,XLS,XLSX or DOC file only | 20 mb max',
            yes:'Yes',
            no:'No',
            are_you_sure_delete:'Are you sure you want to delete?',
            
            lbl_category:'Category:',
            lbl_start_date:'Start Date:'            
        };
    }
}
