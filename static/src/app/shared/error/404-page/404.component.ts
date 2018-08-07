import { Component } from '@angular/core';
import { Utils } from '../../Utils';

@Component({
  selector: 'page-not-found',
  templateUrl: './404.component.html'
})

export class PageNotFoundComponent {

  constructor( private utils: Utils) {
    
   }

  goBack(){
     window.location.href=window.location.origin+"/mydeq/dashboard";
  }

}
