import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWizardPageComponent } from './form-wizard-page.component';

describe('FormWizardPageComponent', () => {
  let component: FormWizardPageComponent;
  let fixture: ComponentFixture<FormWizardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormWizardPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWizardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
