import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from './component/datatable/DataTableModule';

import { MydeqFooterComponent } from './component/nav/mydeq-footer/mydeq-footer.component';
import { MydeqHeaderComponent } from './component/nav/mydeq-header/mydeq-header.component';
import { SessionTimeOutModalComponent } from './component/modals/session-timeout/timeout.component';
import { MyDeqErrorHandler } from './errorHandler';
import { MyDEQLoadingComponent } from './loading.component';
import { PageNotFoundComponent } from './component/error/404-page/404.component';
import { ErrorPageComponent } from './component/error/500-page/500.component';
import { FormFieldComponent } from './component/form-fields/form-fields.component';
import { VSDropdownComponent } from './component/vs-dropdown/dropdown.component';
import { MydeqAlertModalComponent } from './component/modals/alert-modal/alert.component';
import {PhonePipe} from './component/PhonePipe';
import {ConcatStringPipe} from './component/ConcatStringPipe';
import {SafeUrlPipe} from './component/safe-url-pipe';
import { CommentsComponent } from './component/comment-section/comments.component';
import { MydeqNavigationAlertModalComponent } from './component/modals/navigation-alert-modal/navigation-alert-modal.component';
import { PageConentService } from './content/content-service.component';
import { NeedHelpComponent } from './component/need-help/need-help.component';
import { GlobalService } from './service/global.service';
import { LogoutService } from './service/logout.service';


@NgModule({

  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    DataTableModule
  ],

  declarations: [
    MydeqFooterComponent,
    MydeqHeaderComponent,
    SessionTimeOutModalComponent,
    MyDEQLoadingComponent,
    PageNotFoundComponent,
    ErrorPageComponent,
    FormFieldComponent,
    VSDropdownComponent,
    MydeqAlertModalComponent,
    PhonePipe,
    ConcatStringPipe,
    MydeqNavigationAlertModalComponent,
    SafeUrlPipe,
    CommentsComponent,
    NeedHelpComponent
  ],

  exports: [
    MydeqFooterComponent,
    MydeqHeaderComponent,
    SessionTimeOutModalComponent,
    MyDEQLoadingComponent,
    PageNotFoundComponent,
    ErrorPageComponent,
    FormFieldComponent,
    DataTableModule,
    VSDropdownComponent,
    MydeqAlertModalComponent,
    PhonePipe,
    ConcatStringPipe,
    MydeqNavigationAlertModalComponent,
    SafeUrlPipe,
    CommentsComponent,
    NeedHelpComponent
  ],
  providers: [MyDeqErrorHandler,PageConentService, GlobalService, LogoutService],
  //entryComponents: [MydeqAlertModalComponent]
})
export class MyDEQCoreModule { }
