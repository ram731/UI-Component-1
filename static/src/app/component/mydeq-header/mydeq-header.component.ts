import { Component, OnInit } from '@angular/core';
import { Utils } from '../../shared/Utils';
@Component({
  selector: 'mydeq-header',
  templateUrl: './mydeq-header.component.html',
  styles: [
    `
    .navbar {
      padding-bottom: 0
    }

    .header-nav {
      border-bottom: 4px solid #5c8885;
      margin-bottom: 20px;
    }

    .nav-item:not(:first-child) {
        margin-top: -0.5rem;
        border-right: 1px solid #ccc;
        height: 75px;
    }

    .nav-link {
      color: #604543;
      padding-top: 30px;
      padding-bottom: 20px;
    }

    .nav-link:focus, .nav-link:hover {
        color: #5c8885;
    }

    #userNameLabel {
      margin-top: -0.5rem;
      padding-top: 25px;
      padding-bottom: 20px;
    }



    `
  ]
})
export class MydeqHeaderComponent implements OnInit {

  constructor(public utils: Utils) { }

  ngOnInit() {
    
  }

}