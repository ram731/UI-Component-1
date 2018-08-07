import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule,NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { ComponentModule } from './component/components.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { appRouting } from './app.routes';
import { NgbDateFRParserFormatter } from './shared/lib/date-formatter/custom-date-formater';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NgbModule.forRoot(),
    appRouting,

    SharedModule,
    ComponentModule
  ],
  providers: [{provide: NgbDateParserFormatter, useFactory: () => new NgbDateFRParserFormatter('shortDate')}],
  bootstrap: [AppComponent]
})
export class AppModule { }
