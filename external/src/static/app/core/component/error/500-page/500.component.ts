import { Component } from '@angular/core';

@Component({
  selector: 'error',
  templateUrl: './500.component.html'
})
/**
 * System error component.
 */
export class ErrorPageComponent {

  constructor() { }

  goBack(){
     window.location.href=window.location.origin+"/mydeq/dashboard";
  }
}
