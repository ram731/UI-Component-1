import { Component, OnInit } from '@angular/core';

import {Utils} from  '../../Utils';

@Component({
  selector: 'mydeq-header',
  templateUrl: './mydeq-header.component.html'
})
export class MydeqHeaderComponent implements OnInit {

  constructor(
    public utils: Utils
  ) {

  }

  ngOnInit() {

  }

}
