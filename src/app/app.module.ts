import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './core/error-page/error-page.component';
import { WelcomePageComponent } from './layouts/welcome-page/welcome-page.component';
import { FormWizardPageComponent } from './layouts/form-wizard-page/form-wizard-page.component';
import { SummaryPageComponent } from './layouts/summary-page/summary-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    WelcomePageComponent,
    FormWizardPageComponent,
    SummaryPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
