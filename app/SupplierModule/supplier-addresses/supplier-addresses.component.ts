import { Component, OnInit } from '@angular/core';
import { SupplierAddress } from '../../Models/supplier-address';
import { SupplierAddressService } from '../../Services/supplierAddress.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from "jquery";
import { InventoryComponentBase } from '../../inventory-component';

@Component({
  selector: 'app-supplier-addresses',
  templateUrl: './supplier-addresses.component.html',
  styleUrls: ['./supplier-addresses.component.scss']
})
export class SupplierAddressComponent extends InventoryComponentBase implements OnInit {
  supplierAddresses: SupplierAddress[] = [];
  showSupplierAddressSpinner: boolean = false;
  viewSupplierAddressCheckBoxes: any;

  sortBy: string = "city";
  sortDirection: string = "ASC";

  newSupplierAddressForm: FormGroup;
  newSupplierAddressDisabled: boolean = false;
  newSupplierAddressFormErrorMessages: any;

  editSupplierAddressForm: FormGroup;
  editSupplierAddressDisabled: boolean = false;
  editSupplierAddressFormErrorMessages: any;

  deleteSupplierAddressForm: FormGroup;
  deleteSupplierAddressDisabled: boolean = false;

  constructor(private supplierAddressService: SupplierAddressService) {
    super();
    this.newSupplierAddressForm = new FormGroup({
      
      addressLine1: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      addressLine2: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      pinCode: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9][0-9]{5}$/)]),
      city: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      state: new FormControl(null, [Validators.required, Validators.minLength(1)])
    });

    this.newSupplierAddressFormErrorMessages = {
     
      addressLine1: { required: "Address Line 1 can't be blank", minlength: "Address Line 1 should contain at least 1 character"},
      addressLine2: { required: "Address  Line2 can't be blank", minlength: "Address Line 2 should contain at least 1 character"},
      pinCode: { required: "Pin Code can't be blank", pattern: "Pin is Invalid" },
      city: { required: "City Name can't be blank", minlength: "city should contain at least 1 character" },
      state: { required: "State Name can't be blank", minlength: "state should contain at least 1 character"}
    };



    this.editSupplierAddressForm = new FormGroup({
      id: new FormControl(null),
      supplierID: new FormControl(null),
      supplierAddressID: new FormControl(null),
      
      addressLine1: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      addressLine2: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      pinCode: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9][0-9]{5}$/)]),
      city: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      state: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      creationDateTime: new FormControl(null)
    });

    this.editSupplierAddressFormErrorMessages = {
     
      addressLine1: { required: "Address Line 1 can't be blank", minlength: "Address Line 1 should contain at least 1 character" },
      addressLine2: { required: "Address  Line2 can't be blank", minlength: "Address Line 2 should contain at least 1 character" },
      pinCode: { required: "Pin Code can't be blank", pattern: "Pin should contain atleast 6 character" },
      city: { required: "City Name can't be blank", minlength: "city should contain at least 1 character" },
      state: { required: "State Name can't be blank", minlength: "state should contain at least 1 character" }
        };

    this.viewSupplierAddressCheckBoxes = {
      
      addressLine1: true,
      addressLine2: true,
      pinCode: true,
      city: true,
      state:true,
      createdOn: true,
      lastModifiedOn: true
    };

    this.deleteSupplierAddressForm = new FormGroup({
      id: new FormControl(null),
      supplierID: new FormControl(null),
      supplierAddressID: new FormControl(null),
      
      addressLine1: new FormControl(null),
      addressLine2: new FormControl(null),
      pinCode: new FormControl(null),
      city: new FormControl(null),
      state: new FormControl(null),
    });
  }

  ngOnInit() {
    this.showSupplierAddressSpinner = true;
    this.supplierAddressService.GetAllSupplierAddresses().subscribe((response) => {
      this.supplierAddresses = response;
      this.showSupplierAddressSpinner = false;
    }, (error) => {
        console.log(error);
      })
  }

  onCreateSupplierAddressClick() {
    this.newSupplierAddressForm.reset();
    this.newSupplierAddressForm["submitted"] = false;
  }

  onAddSupplierAddressClick(event) {
    this.newSupplierAddressForm["submitted"] = true;
    if (this.newSupplierAddressForm.valid) {
      this.newSupplierAddressDisabled = true;
      var supplierAddress: SupplierAddress = this.newSupplierAddressForm.value;

      this.supplierAddressService.AddSupplierAddress(supplierAddress).subscribe((addResponse) => {
        this.newSupplierAddressForm.reset();
        $("#btnAddSupplierAddressCancel").trigger("click");
        this.newSupplierAddressDisabled = false;
        this.showSupplierAddressSpinner = true;

        this.supplierAddressService.GetAllSupplierAddresses().subscribe((getResponse) => {
          this.showSupplierAddressSpinner = false;
          this.supplierAddresses = getResponse;
        }, (error) => {
            console.log(error);
          });
      },
        (error) => {
          console.log(error);
          this.newSupplierAddressDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.newSupplierAddressForm);
    }
  }



  getFormControlCssClass(formControl: FormControl, formGroup: FormGroup): any {
    return {
      'is-invalid': formControl.invalid && (formControl.dirty || formControl.touched || formGroup["submitted"]),
      'is-valid': formControl.valid && (formControl.dirty || formControl.touched || formGroup["submitted"])
    };
  }

  getFormControlErrorMessage(formControlName: string, validationProperty: string): string {
    return this.newSupplierAddressFormErrorMessages[formControlName][validationProperty];
  }

  getCanShowFormControlErrorMessage(formControlName: string, validationProperty: string, formGroup: FormGroup): boolean {
    return formGroup.get(formControlName).invalid && (formGroup.get(formControlName).dirty || formGroup.get(formControlName).touched || formGroup['submitted']) && formGroup.get(formControlName).errors[validationProperty];
  }



  onEditSupplierAddressClick(index) {
    this.editSupplierAddressForm.reset();
    this.editSupplierAddressForm["submitted"] = false;
    this.editSupplierAddressForm.patchValue({
      id: this.supplierAddresses[index].id,
      supplierAddressID: this.supplierAddresses[index].supplierAddressID,
      
      
      addressLine1: this.supplierAddresses[index].addressLine1,
      addressLine2: this.supplierAddresses[index].addressLine2,
      pinCode: this.supplierAddresses[index].pinCode,
      city: this.supplierAddresses[index].city,
      state: this.supplierAddresses[index].state,
      creationDateTime: this.supplierAddresses[index].creationDateTime
    });
  }

  onUpdateSupplierAddressClick(event) {
    this.editSupplierAddressForm["submitted"] = true;
    if (this.editSupplierAddressForm.valid) {
      this.editSupplierAddressDisabled = true;
      var supplierAddress: SupplierAddress = this.editSupplierAddressForm.value;

      this.supplierAddressService.UpdateSupplierAddress(supplierAddress).subscribe((updateResponse) => {
        this.editSupplierAddressForm.reset();
        $("#btnUpdateSupplierCancel").trigger("click");
        this.editSupplierAddressDisabled = false;
        this.showSupplierAddressSpinner = true;

        this.supplierAddressService.GetAllSupplierAddresses().subscribe((getResponse) => {
          this.showSupplierAddressSpinner = false;
          this.supplierAddresses = getResponse;
        }, (error) => {
            console.log(error);
          });
      },
        (error) => {
          console.log(error);
          this.editSupplierAddressDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.editSupplierAddressForm);
    }
  }



  onDeleteSupplierAddressClick(index) {
    this.deleteSupplierAddressForm.reset();
    this.deleteSupplierAddressForm["submitted"] = false;
    this.deleteSupplierAddressForm.patchValue({
      id: this.supplierAddresses[index].id,
      supplierAddressID: this.supplierAddresses[index].supplierAddressID,
      addressLine1: this.supplierAddresses[index].addressLine1,
      addressLine2: this.supplierAddresses[index].addressLine2,
      pinCode: this.supplierAddresses[index].pinCode,
      city: this.supplierAddresses[index].city,
      state: this.supplierAddresses[index].state,
    });
  }

  onDeleteSupplierConfirmClick(event) {
    this.deleteSupplierAddressForm["submitted"] = true;
    if (this.deleteSupplierAddressForm.valid) {
      this.deleteSupplierAddressDisabled = true;
      var supplierAddress: SupplierAddress = this.deleteSupplierAddressForm.value;

      this.supplierAddressService.DeleteSupplierAddress(supplierAddress.addressLine1, supplierAddress.id).subscribe((deleteResponse) => {
        this.deleteSupplierAddressForm.reset();
        $("#btnDeleteSupplierAddressCancel").trigger("click");
        this.deleteSupplierAddressDisabled = false;
        this.showSupplierAddressSpinner = true;

        this.supplierAddressService.GetAllSupplierAddresses().subscribe((getResponse) => {
          this.showSupplierAddressSpinner = false;
          this.supplierAddresses = getResponse;
        }, (error) => {
            console.log(error);
          });
      },
        (error) => {
          console.log(error);
          this.deleteSupplierAddressDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.deleteSupplierAddressForm);
    }
  }



  onViewSelectAllClick() {
    for (let propertyName of Object.keys(this.viewSupplierAddressCheckBoxes)) {
      this.viewSupplierAddressCheckBoxes[propertyName] = true;
    }
  }

  onViewDeselectAllClick() {
    for (let propertyName of Object.keys(this.viewSupplierAddressCheckBoxes)) {
      this.viewSupplierAddressCheckBoxes[propertyName] = false;
    }
  }

  onBtnSortClick() {
    this.supplierAddresses.sort((a, b) => {
      let comparison = 0;
      let value1 = ((typeof a[this.sortBy]) == 'string') ? a[this.sortBy].toUpperCase() : a[this.sortBy];
      let value2 = ((typeof b[this.sortBy]) == 'string') ? b[this.sortBy].toUpperCase() : b[this.sortBy];

      if (this.sortBy == "creationDateTime" || this.sortBy == "lastModifiedDateTime") {
        var tt = value1.split("/");
        var d1 = new Date(tt[2], tt[1], tt[0]);
        tt = value2.split("/");
        var d2 = new Date(tt[2], tt[1], tt[0]);
        if (d2 > d1) comparison = -1;
        else comparison = 1;
      }
      else {
        if (value1 < value2) {
          comparison = -1;
        }
        else if (value1 > value2) {
          comparison = 1;
        }
      }
      if (this.sortDirection == "DESC")
        comparison = comparison * -1;

      return comparison;
    });

  }
}



