import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './core/error-page/error-page.component';
import { FormWizardPageComponent } from './layouts/form-wizard-page/form-wizard-page.component';
import { SummaryPageComponent } from './layouts/summary-page/summary-page.component';
import { WelcomePageComponent } from './layouts/welcome-page/welcome-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'form-wizard', component: FormWizardPageComponent },
  { path: 'summary', component: SummaryPageComponent },
  { path: 'error', component: ErrorPageComponent },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
