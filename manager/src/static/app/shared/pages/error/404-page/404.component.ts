import { Component } from '@angular/core';

@Component({
  selector: 'mydeq-page-not-found',
  templateUrl: './404.component.html'
})

export class PageNotFoundComponent {

  constructor() { }

  myDEQSite() {
      window.open("http://azdeq.gov", "_self");
  }


}
