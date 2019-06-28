import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mydeq-header',
  templateUrl: './mydeq-header.component.html'
})
export class MydeqHeaderComponent implements OnInit {

  isTestEnvironment: boolean;
  env = 'test';

  constructor() {
    this.isTestEnvironment = window.location.hostname !== 'internal.azdeq.gov';
    if (window.location.hostname === 'internalqa.azdeq.gov') {
      this.env = 'QA';
    }
    if (window.location.hostname === 'internaldev.azdeq.gov') {
      this.env = 'DEV';
    }
    if (window.location.hostname === 'internaluat.azdeq.gov') {
      this.env = 'UAT';
    }
  }

  ngOnInit() {

  }

  navigateProd() {
    const url = 'https://internal.azdeq.gov' + window.location.pathname;
    window.open(url, '_self');
  }

}
