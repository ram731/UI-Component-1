import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';


import { MydeqFooterComponent } from './mydeq-footer/mydeq-footer.component';
import { MydeqHeaderComponent } from './mydeq-header/mydeq-header.component';


@NgModule({

  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
  ],

  declarations: [
    MydeqFooterComponent,
    MydeqHeaderComponent
  ],

  exports: [
    MydeqFooterComponent,
    MydeqHeaderComponent
  ]
})
export class ComponentModule { }
