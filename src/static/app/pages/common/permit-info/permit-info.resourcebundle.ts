export class PageContentpermitverification{
    protected PAGE_TEXT: any ={};   
 
    constructor(){
     this.PAGE_TEXT.existing = this.getCommonLabels();
    }

    protected getCommonLabels(){
        return  {
            "header": "Verify the information for LTF No.",
            "sub_header": "Please review the following information, select \"Yes\" or \"No\" and click CONTINUE.",
            "content_details1":"Permit issued to: ",
            "content_details2":"Place Address: ",
            "radio_question_content": "Is this the correct NOI you wish to manage in myDEQ?",
            "radio_answer1": "Yes",
            "radio_answer2": "No",
            "warning_msg" : "Warning: Your session will time out in 20 minutes of non-activity on a single screen. There is not a save feature in myDEQ at this time. You will need to complete the entire process within the same session.",
            "back_button": "BACK",
            "continue_button": "CONTINUE"
        };
    }
    
}