import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule, Injector } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule,NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { ComponentModule } from './component/components.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { appRouting } from './app.routes';
import { NgbDateFRParserFormatter } from './shared/lib/date-formatter/custom-date-formater';
import { ConfigServiceFactory } from './shared/lib/component-config/configFactory';
import { PageModule } from './pages/pages.module';

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
    ComponentModule,
    PageModule
  ],
  providers: [
    { provide: NgbDateParserFormatter, useFactory: () => new NgbDateFRParserFormatter('shortDate') },
    { provide: APP_INITIALIZER, useFactory: ConfigServiceFactory, deps: [Injector], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    ConfigServiceFactory(injector);
  }
 }
