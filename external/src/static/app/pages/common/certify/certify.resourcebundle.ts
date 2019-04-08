import { BasePageContent } from "../../../core/content/base-page-content.component";

export class PagecontentCertify extends BasePageContent{
    getPageSpecificText(){

        this.PAGE_TEXT['cc'] = {
            header: "Certify your submission.",
            subheader:"Please verify your identity by answering the following security question.",
            requiredText: "Indicates required field",
            questionText:"Question:",
            answerText:"Answer:",
            back_button: "BACK",
            continue_button: "CONTINUE",
            lbl_ready_to_certify:"Have you reviewed this information and are you ready to certify?",
            lbl_account_locked:"ACCOUNT LOCKED",
            lbl_account_locked_msg:"ACCOUNT LOCKED: You have failed to provide valid details after 5 attempts. Please call (844)-827-4768 to unlock your account.",
            button_ok:"OK",
            alert_application_review:"ALERT: APPLICATION REVIEW CONFIRMATION",
            lbl_yes_review:"Yes - I have reviewed and am ready to certify the information.",
            lbl_no_review:"No - I need to reject the information so that it can be revised.",
        };
    }
}
