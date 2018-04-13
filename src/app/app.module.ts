import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppBootstrapModule } from './bootstrap.module';
import { MaterialModule } from './material.module';
import { AppCommonModule } from './common/common.module';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './components/pages/pages.module';
import { LayoutModule } from './layouts/layout.module';

import { AppComponent } from './app.component';

import { AuthenticationService } from './services/authentication/authentication.service';
import { ValidationService } from './services/validation/validation.service';
import { SharedDataService } from './services/shared-data/shared-data.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppBootstrapModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    AppCommonModule,
    PagesModule,
    LayoutModule,
    SimpleNotificationsModule.forRoot(),
    NgbModule.forRoot()
  ],
  exports: [
    AppCommonModule
  ],
  providers: [
    AuthenticationService,
    ValidationService,
    SharedDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
