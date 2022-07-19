import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private _wizardData: any = null;
  constructor() {}

  setWizardFormValue(formData: any) {
    this._wizardData = formData;
    return true;
  }

  getWizardFormValue() {
    return this._wizardData;
  }
}
