import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// components
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

// modules
import { AppCommonModule } from './../../common/common.module';
import { MaterialModule } from '../../material.module';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppCommonModule,
    MaterialModule,
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
