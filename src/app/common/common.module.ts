import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';

// Components
// import { CommonFunctions } from './functions';
import { WireSpinnerComponent } from './components/wire-spinner/wire-spinner.component';
import { HeaderComponent } from './components/header/header.component';

// Configuration
import { Configuration } from './config/configuration';
import { ErrorMessageComponent } from './components/error-message/error-message.component';

@NgModule({
  declarations: [
    ErrorMessageComponent,
    WireSpinnerComponent,
    HeaderComponent
  ],
  exports: [
    ErrorMessageComponent,
    WireSpinnerComponent,
    HeaderComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [
    Configuration,
    // CommonFunctions,
    {provide: LOCALE_ID, useValue: 'en-GB'}
  ],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppCommonModule {
}
