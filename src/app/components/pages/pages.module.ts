import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// components
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

// modules
import { AppBootstrapModule } from '../../bootstrap.module';
import { AppCommonModule } from './../../common/common.module';
import { MaterialModule } from '../../material.module';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    NgbModule,
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppCommonModule,
    MaterialModule,
    AppBootstrapModule
  ],
  exports: [
    AppCommonModule,
    RouterModule,
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'en-GB'},
  ],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
})
export class PagesModule { }
