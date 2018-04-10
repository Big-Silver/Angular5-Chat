import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { MaterialModule } from './material.module';
import { AppCommonModule } from './common/common.module';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './components/pages/pages.module';
import { LayoutModule } from './layouts/layout.module';

import { AppComponent } from './app.component';

import { AuthenticationService } from './services/authentication/authentication.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    BrowserAnimationsModule,
    MaterialModule,
    AppCommonModule,
    PagesModule,
    LayoutModule,
    SimpleNotificationsModule.forRoot(),
  ],
  exports: [
    AppCommonModule
  ],
  providers: [
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
