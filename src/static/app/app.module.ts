import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule, Injector } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { appRouting } from './app.routes';
import { NgbDateFRParserFormatter } from './core/component/date-formatter/custom-date-formater';
import { PageModule } from './pages/pages.module';
import { MyDEQCoreModule } from './core/core.module'

const metadata = {
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
    MyDEQCoreModule,
    PageModule
  ],
  providers: [
    { provide: NgbDateParserFormatter, useFactory: () => new NgbDateFRParserFormatter('shortDate') }
  
  ],
  bootstrap: [AppComponent]
};
@NgModule(metadata)
export class AppModule {}
