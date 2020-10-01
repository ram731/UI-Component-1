import { BasePageContent } from "../../../core/content/base-page-content.component";

export class WhatsNeededPageContent extends BasePageContent  {
  
  path:string=null;
  
  constructor(path: string=null) {
    super()  
    this.path = path;    
  }

  public getPageSpecificText() {
    this.getPlanContent();
  }

  protected getPlanContent() {

    this.PAGE_TEXT['cc']= {
      'header': 'You will need the following to complete this application:',
      'sub_header': 'Please have this information ready and click CONTINUE.',
      'action_list': [
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
      ],

      'warning_msg': `<div class="pt-4">Warning: Your session will time out after 20 minutes of non-activity on a single screen.</div><div class='mt-5'>Your information is not saved until you reach the screen that has the options to click SAVE & CONTINUE or <br/>SAVE & EXIT. Once saved, you can resume at any time by visiting your dashboard.</div>`
    }
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
