import { BasePageContent } from "<%= dirSteps %>../core/content/base-page-content.component";

export class <%= classify(name) %>ReportPageContent extends BasePageContent {

  public getPageSpecificText() {

    // path specific text
    this.PAGE_TEXT['<%= module %>'] = {

    }
  }
}