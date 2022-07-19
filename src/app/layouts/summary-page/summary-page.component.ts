import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
})
export class SummaryPageComponent implements OnInit {
  constructor(private commonService: CommonService, private router: Router) {}

  wizardFormData: any;
  ngOnInit(): void {
    this.wizardFormData = this.commonService.getWizardFormValue();
    if (!this.wizardFormData) {
      this.router.navigate(['/']);
    }
    console.log('my wizard form data', this.wizardFormData);
  }
}
