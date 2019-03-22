import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Utils } from './Utils';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppService } from '../service/app.service';
import { NgbModule, NgbActiveModal, NgbPopoverConfig, NgbAccordionConfig, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { LoggerService } from './lib/logger/logger-service.component';
import { MyDEQCoreModule } from '../core/core.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    MyDEQCoreModule
  ],
  declarations: [],
  exports: [NgbModule, MyDEQCoreModule],

  providers: [
    Utils, AppService, NgbAccordionConfig, NgbDatepickerConfig, LoggerService, NgbModule, NgbActiveModal, NgbPopoverConfig,
  ]
})
export class SharedModule { }
