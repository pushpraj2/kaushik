import { Component, OnInit } from '@angular/core';
import { DistributorAddress } from '../../Models/distributor-address';
import { DistributoraddressesService } from '../../Services/distributor-addresses.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from "jquery";
import { InventoryComponentBase } from '../../inventory-component';

@Component({
  selector: 'app-distributor-addresses',
  templateUrl: './distributor-addresses.component.html',
  styleUrls: ['./distributor-addresses.component.scss']
})
export class DistributorAddressesComponent extends InventoryComponentBase implements OnInit {
  distributorAddresses: DistributorAddress[] = [];
  showDistributorAddressesSpinner: boolean = false;
  viewDistributorAddressesCheckBoxes: any;

  sortBy: string = "AddressLine1";
  sortDirection: string = "ASC";

  newDistributorAddressForm: FormGroup;
  newDistributorAddressDisabled: boolean = false;
  newDistributorAddressFormErrorMessages: any;

  editDistributorAddressForm: FormGroup;
  editDistributorAddressDisabled: boolean = false;
  editDistributorAddressFormErrorMessages: any;

  deleteDistributorAddressForm: FormGroup;
  deleteDistributorAddressDisabled: boolean = false;

  constructor(private distributorAddressesService: DistributoraddressesService) {
    super();
    this.newDistributorAddressForm = new FormGroup({
      addressLine1: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      addressLine2: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      city: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      pincode: new FormControl(null, [Validators.required, Validators.pattern(/([1-9]{1}[0-9]{2}\s{0,1}[0-9]{3})/)]),

    });

    this.newDistributorAddressFormErrorMessages = {
      addressLine1: { required: "AddressLine1 Name can't be blank", minlength: "address Line1 should contain at least 2 characters", maxlength: "address Line 1 can't be longer than 40 characters" },
      addressLine2: { required: "AddressLine2 Name can't be blank", minlength: "address Line2 should contain at least 2 characters", maxlength: "address Line 2 can't be longer than 40 characters" },
      city: { required: "City can't be blank" },
      state: { required: "State can't be blank" },
      pincode: { required: "Pincode can't be blank", pattern: "Pincode should contain 6 digits" }
    };



    this.editDistributorAddressForm = new FormGroup({
      id: new FormControl(null),
      distributorAddressID: new FormControl(null),
      addressLine1: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      addressLine2: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      city: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      pincode: new FormControl(null, [Validators.required, Validators.pattern(/([1-9]{1}[0-9]{2}\s{0,1}[0-9]{2})/)]),
      creationDateTime: new FormControl(null)
    });

    this.editDistributorAddressFormErrorMessages = {
      addressLine1: { required: "AddressLine1 Name can't be blank", minlength: "address Line1 should contain at least 2 characters", maxlength: "address Line 1 can't be longer than 40 characters" },
      addressLine2: { required: "AddressLine2 Name can't be blank", minlength: "address Line2 should contain at least 2 characters", maxlength: "address Line 2 can't be longer than 40 characters" },
      city: { required: "City can't be blank" },
      state: { required: "State can't be blank" },
      pincode: { required: "Pincode can't be blank", pattern: "Pincode should contain 6 digits" }
    };

    this.viewDistributorAddressesCheckBoxes = {
      addressLine1: true,
      addressLine2: true,
      city: true,
      state: true,
      pincode: true,
      createdOn: true,
      lastModifiedOn: true
    };

    this.deleteDistributorAddressForm = new FormGroup({
      id: new FormControl(null),
      distributorAddressID: new FormControl(null),
      addressLine1: new FormControl(null)
    });
  }

  ngOnInit() {
    this.showDistributorAddressesSpinner = true;
    this.distributorAddressesService.GetAllDistributorAddresses().subscribe((response) => {
      this.distributorAddresses = response;
      this.showDistributorAddressesSpinner = false;
    }, (error) => {
      console.log(error);
    })
  }

  onCreateDistributorAddressClick() {
    this.newDistributorAddressForm.reset();
    this.newDistributorAddressForm["submitted"] = false;
  }

  onAddDistributorAddressClick(event) {
    this.newDistributorAddressForm["submitted"] = true;
    if (this.newDistributorAddressForm.valid) {
      this.newDistributorAddressDisabled = true;
      var distributorAddress: DistributorAddress = this.newDistributorAddressForm.value;

      this.distributorAddressesService.AddDistributorAddress(distributorAddress).subscribe((addResponse) => {
        this.newDistributorAddressForm.reset();
        $("#btnAddDistributorAddressCancel").trigger("click");
        this.newDistributorAddressDisabled = false;
        this.showDistributorAddressesSpinner = true;

        this.distributorAddressesService.GetAllDistributorAddresses().subscribe((getResponse) => {
          this.showDistributorAddressesSpinner = false;
          this.distributorAddresses = getResponse;
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.newDistributorAddressDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.newDistributorAddressForm);
    }
  }



  getFormControlCssClass(formControl: FormControl, formGroup: FormGroup): any {
    return {
      'is-invalid': formControl.invalid && (formControl.dirty || formControl.touched || formGroup["submitted"]),
      'is-valid': formControl.valid && (formControl.dirty || formControl.touched || formGroup["submitted"])
    };
  }

  getFormControlErrorMessage(formControlName: string, validationProperty: string): string {
    return this.newDistributorAddressFormErrorMessages[formControlName][validationProperty];
  }

  getCanShowFormControlErrorMessage(formControlName: string, validationProperty: string, formGroup: FormGroup): boolean {
    return formGroup.get(formControlName).invalid && (formGroup.get(formControlName).dirty || formGroup.get(formControlName).touched || formGroup['submitted']) && formGroup.get(formControlName).errors[validationProperty];
  }



  onEditDistributorAddressClick(index) {
    this.editDistributorAddressForm.reset();
    this.editDistributorAddressForm["submitted"] = false;
    this.editDistributorAddressForm.patchValue({
      id: this.distributorAddresses[index].id,
      distributorAddressID: this.distributorAddresses[index].distributorAddressID,
      addressLine1: this.distributorAddresses[index].addressLine1,
      addressLine2: this.distributorAddresses[index].addressLine2,
      city: this.distributorAddresses[index].city,
      state: this.distributorAddresses[index].state,
      pincode: this.distributorAddresses[index].pincode,
      creationDateTime: this.distributorAddresses[index].creationDateTime
    });
  }

  onUpdateDistributorAddressClick(event) {
    this.editDistributorAddressForm["submitted"] = true;
    if (this.editDistributorAddressForm.valid) {
      this.editDistributorAddressDisabled = true;
      var distributorAddress: DistributorAddress = this.editDistributorAddressForm.value;

      this.distributorAddressesService.UpdateDistributorAddress(distributorAddress).subscribe((updateResponse) => {
        this.editDistributorAddressForm.reset();
        $("#btnUpdateDistributorAddressCancel").trigger("click");
        this.editDistributorAddressDisabled = false;
        this.showDistributorAddressesSpinner = true;

        this.distributorAddressesService.GetAllDistributorAddresses().subscribe((getResponse) => {
          this.showDistributorAddressesSpinner = false;
          this.distributorAddresses = getResponse;
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.editDistributorAddressDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.editDistributorAddressForm);
    }
  }



  onDeleteDistributorAddressClick(index) {
    this.deleteDistributorAddressForm.reset();
    this.deleteDistributorAddressForm["submitted"] = false;
    this.deleteDistributorAddressForm.patchValue({
      id: this.distributorAddresses[index].id,
      distributorAddressID: this.distributorAddresses[index].distributorAddressID,
      addressLine1: this.distributorAddresses[index].addressLine1
    });
  }

  onDeleteDistributorAddressConfirmClick(event) {
    this.deleteDistributorAddressForm["submitted"] = true;
    if (this.deleteDistributorAddressForm.valid) {
      this.deleteDistributorAddressDisabled = true;
      var distributorAddress: DistributorAddress = this.deleteDistributorAddressForm.value;

      this.distributorAddressesService.DeleteDistributorAddress(distributorAddress.distributorAddressID, distributorAddress.id).subscribe((deleteResponse) => {
        this.deleteDistributorAddressForm.reset();
        $("#btnDeleteDistributorAddressCancel").trigger("click");
        this.deleteDistributorAddressDisabled = false;
        this.showDistributorAddressesSpinner = true;

        this.distributorAddressesService.GetAllDistributorAddresses().subscribe((getResponse) => {
          this.showDistributorAddressesSpinner = false;
          this.distributorAddresses = getResponse;
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.deleteDistributorAddressDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.deleteDistributorAddressForm);
    }
  }



  onViewSelectAllClick() {
    for (let propertyName of Object.keys(this.viewDistributorAddressesCheckBoxes)) {
      this.viewDistributorAddressesCheckBoxes[propertyName] = true;
    }
  }

  onViewDeselectAllClick() {
    for (let propertyName of Object.keys(this.viewDistributorAddressesCheckBoxes)) {
      this.viewDistributorAddressesCheckBoxes[propertyName] = false;
    }
  }

  onBtnSortClick() {
    console.log(this.sortBy);
    this.distributorAddresses.sort((a, b) => {
      let comparison = 0;
      let value1 = ((typeof a[this.sortBy]) == 'string') ? a[this.sortBy].toUpperCase() : a[this.sortBy];
      let value2 = ((typeof b[this.sortBy]) == 'string') ? b[this.sortBy].toUpperCase() : b[this.sortBy];

      if (value1 < value2) {
        comparison = -1;
      }
      else if (value1 > value2) {
        comparison = 1;
      }
      if (this.sortDirection == "DESC")
        comparison = comparison * -1;

      console.log(value1, value2, comparison);
      return comparison;
    });

  }
}
