import { BasePageContent } from "../../../core/content/base-page-content.component";

export class WhatsNeededPageContent extends BasePageContent  {
  
  path:string=null;

  constructor(path: string=null) {
    super()
    this.path = path;
    this.PAGE_TEXT['warning_msg']  = `Warning: Your session will time out in 20 minutes of non-activity on a single screen. You may save your application, once started, by clicking on this &#147; <span class="text-primary"><i class="far fa-save" aria-hidden="true"></i></span> &#148; icon located at the top right of every page.`;
  }

  public getPageSpecificText() {
 
  if (this.path === 'annual_report') 
    {
      this.getAnnualCCContent();
    }
    else{      
        this.getPlanContent();      
    }
  }

  protected getPlanContent() {
    this.PAGE_TEXT['header'] = 'You will need the following to complete this application:';
    this.PAGE_TEXT['sub_header'] = 'Please have this information ready and click CONTINUE.';
    this.PAGE_TEXT['action_list'] = [
          {
            text: `Facility Information`,
          },
          {
            text: `Facility Contact`,
          },
          {
            text: `P2 Policy`,
          },
          {
            text: `Facility Production Process Information`,
          }
        ];
  }

  private getAnnualCCContent(){
    this.PAGE_TEXT['header'] = 'You will need the following to fill out your annual progress report for the previous calendar year(s):';
    //this.PAGE_TEXT['sub_header'] = 'Please have this information ready and click CONTINUE.';
    this.PAGE_TEXT['action_list'] = [
          {
            text: `Status of Each Goal`,
          },
          {
            text: `Production Ratio for Each Goal (if applicable)`,
          },
          {
            text: `Amount of Goal Substance Used or Generated`,
          },
          {
            text: `Training Information`,
          }
        ];

        this.PAGE_TEXT['leftButtonTxt']= this.PAGE_TEXT['back'];

        this.PAGE_TEXT['commonText']= `<div class="mt-3">If you feel this is an error, contact the Pollution Prevention program at <span class="text-primary">p2@azdeq.gov.</span></div>`;
  }
}
