import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';

// Components
// import { CommonFunctions } from './functions';
// import { SpinnerComponent } from './components/spinner/spinner.component';
// import { HeaderComponent } from './components/header/header.component';

// Configuration
// import { Configuration } from './config/configuration';
// import { ErrorMessages } from './config/error.message';

@NgModule({
  declarations: [
    // SpinnerComponent,
    // HeaderComponent
  ],
  exports: [
    // SpinnerComponent,
    // HeaderComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
  ],
  providers: [
    // Configuration,
    // CommonFunctions,
    // ErrorMessages,
    {provide: LOCALE_ID, useValue: 'en-GB'}
  ],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppCommonModule {
}
