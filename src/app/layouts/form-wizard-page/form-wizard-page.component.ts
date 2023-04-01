import { Component, OnInit } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { CommonService } from "src/app/services/common.service"

@Component({
  selector: "app-form-wizard-page",
  templateUrl: "./form-wizard-page.component.html",
  styleUrls: ["./form-wizard-page.component.scss"],
})
export class FormWizardPageComponent implements OnInit {
  premiumCost: any
  selectedCountryInfo: any

  //wizard form group
  wizardForm = this.formbuilder.group({
    name: ["", Validators.required],
    age: ["25", Validators.required],
    country: ["USA", Validators.required],
    package: ["", Validators.required],
  })

  countries = [
    { id: 1, countryName: "Hong Kong", currencyCode: "HKD", rate: 1 },
    { id: 2, countryName: "USA", currencyCode: "USD", rate: 2 },
    { id: 3, countryName: "Australia", currencyCode: "AUD", rate: 3 },
  ]

  packages = [
    {
      id: 1,
      packageName: "standard",
      label: "Standard",
      checked: true,
      totalAmountToAdd: "",
    },
    {
      id: 2,
      packageName: "safe",
      label: "Safe",
      checked: false,
      totalAmountToAdd: "",
    },
    {
      id: 3,
      packageName: "super Safe",
      label: "Super Safe",
      checked: false,
      totalAmountToAdd: "",
    },
  ]

  constructor(
    private formbuilder: FormBuilder,
    private commonService: CommonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setDefaultPacakge()
    this.wizardFormValueChangeDetection()
  }

  wizardFormValueChangeDetection() {
    this.wizardForm.valueChanges.subscribe((selectedValue) => {
      this.updatePackageDetails()
      this.updatePackageLabelsWithCurrenyCode(this.selectedCountryInfo)
    })
  }

  setDefaultPacakge() {
    const currentActivePackage = this.packages.filter(
      (pkgData) => pkgData.checked
    )
    this.wizardForm.controls["package"].setValue(
      currentActivePackage[0].packageName
    )
    this.updatePackageDetails()
  }

  selectPackage(param: any) {
    const { id } = param

    this.packages.map((pkgData) =>
      pkgData.id == id ? (pkgData.checked = true) : (pkgData.checked = false)
    )
  }

  updatePackageDetails() {
    const selectedCountry = this.wizardForm.get("country")?.value
    const age = this.wizardForm.get("age")?.value
    const selectedPackage = this.wizardForm.get("package")?.value

    this.selectedCountryInfo = this.countries.find(
      (countryData) => countryData.countryName == selectedCountry
    )

    if (selectedCountry && age && selectedPackage && this.selectedCountryInfo) {
      this.premiumCost = 10 * (age * this.selectedCountryInfo.rate)

      this.packages.map((pkgData) => {
        switch (pkgData.packageName) {
          case "standard":
            pkgData.totalAmountToAdd = (
              10 *
              (age * this.selectedCountryInfo.rate)
            ).toString()
            break
          case "safe":
            pkgData.label = `Safe (+${(this.premiumCost * 50) / 100}${
              this.selectedCountryInfo.currencyCode
            }, 50%)`
            pkgData.totalAmountToAdd = (
              (this.premiumCost * 50) /
              100
            ).toString()
            break
          case "super Safe":
            pkgData.label = `Super Safe (+${(this.premiumCost * 75) / 100}${
              this.selectedCountryInfo.currencyCode
            }, 75%)`

            pkgData.totalAmountToAdd = (
              (this.premiumCost * 75) /
              100
            ).toString()
            break

          default:
            pkgData.totalAmountToAdd = (
              10 *
              (age * this.selectedCountryInfo.rate)
            ).toString()
            break
        }
      })
    }
  }

  updatePackageLabelsWithCurrenyCode(param: any) {
    let premiumRates: any = null
    this.packages.map((pkgData) => {
      if (pkgData.checked) {
        switch (pkgData.packageName) {
          case "standard":
            this.premiumCost = parseInt(pkgData.totalAmountToAdd)
            break
          case "safe":
            this.premiumCost += (this.premiumCost * 50) / 100
            break
          case "super Safe":
            this.premiumCost += (this.premiumCost * 75) / 100
            break

          default:
            break
        }
      }
    })
  }

  submitAndGoNext() {
    const age = this.wizardForm.get("age")?.value
    if (age < 100) {
      const wizardFormsData = {
        package: this.packages.find((pkgdata) => pkgdata.checked),
        premiumTotalCost: this.premiumCost,
        formData: this.wizardForm.value,
        ...this.selectedCountryInfo,
      }

      if (!this.wizardForm.valid) {
        alert("please fill all the mandatory fields")
        return
      }
      if (this.commonService.setWizardFormValue(wizardFormsData)) {
        this.router.navigate(["/summary"])
      }
    } else {
      this.router.navigate(["/error"])
    }
  }
}
