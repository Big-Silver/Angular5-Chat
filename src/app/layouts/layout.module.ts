import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// components
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';

// modules
import { AppCommonModule } from '../common/common.module';
import { PagesModule } from '../components/pages/pages.module';

@NgModule({
  declarations: [
    HomeLayoutComponent,
    LoginLayoutComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppCommonModule,
    PagesModule,
  ],
  exports: [
    AppCommonModule,
    RouterModule,
    PagesModule,
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'en-GB'},
  ],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
})
export class LayoutModule { }
