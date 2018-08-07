import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Utils } from './Utils';
import { MyDeqErrorHandler } from './errorHandler';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {  RouterModule } from '@angular/router';
import { AppService } from '../service/app.service';
import { MydeqAlertModalComponent } from './modals/alert-modal/alert.component';

import { SessionTimeOutModalComponent } from './modals/session-timeout/timeout.component';
import { PageNotFoundComponent } from './error/404-page/404.component';
import { ErrorPageComponent } from './error/500-page/500.component';
import {PhonePipe} from './lib/PhonePipe';
import {ConcatStringPipe} from './lib/ConcatStringPipe';
import {NgbAccordionConfig, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import { MydeqNavigationAlertModalComponent } from './modals/navigation-alert-modal/navigation-alert-modal.component';
import {SafeUrlPipe} from './lib/safe-url-pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
    
  ],
  declarations: [
    MydeqAlertModalComponent,
    SessionTimeOutModalComponent,
    PageNotFoundComponent,
    ErrorPageComponent,
    PhonePipe,
    ConcatStringPipe,
    MydeqNavigationAlertModalComponent,
    SafeUrlPipe
  ],
  exports: [
    SessionTimeOutModalComponent, MydeqAlertModalComponent,PageNotFoundComponent, PhonePipe, ConcatStringPipe,
    ErrorPageComponent, MydeqNavigationAlertModalComponent, SafeUrlPipe
  ],

  providers: [
    Utils, MyDeqErrorHandler, AppService, NgbAccordionConfig, NgbDatepickerConfig
  ]
})
export class SharedModule { }
