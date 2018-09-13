import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Utils } from './Utils';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {  RouterModule } from '@angular/router';
import { AppService } from '../service/app.service';
import { ContentService } from '../service/content.service';
import {NgbAccordionConfig, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
    
  ],
  declarations: [
  
  ],
  exports: [
 
  ],

  providers: [
    Utils, AppService, NgbAccordionConfig, NgbDatepickerConfig, ContentService
  ]
})
export class SharedModule { }
