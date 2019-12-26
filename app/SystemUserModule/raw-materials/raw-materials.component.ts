import { Component, OnInit } from '@angular/core';
import { RawMaterial } from '../../Models/raw-material';
import { RawMaterialsService } from '../../Services/raw-materials.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from "jquery";
import { InventoryComponentBase } from '../../inventory-component';

@Component({
  selector: 'app-raw-materials',
  templateUrl: './raw-materials.component.html',
  styleUrls: ['./raw-materials.component.scss']
})
export class RawMaterialsComponent extends InventoryComponentBase implements OnInit {
  rawmaterials: RawMaterial[] = [];
  showRawMaterialsSpinner: boolean = false;
  viewRawMaterialCheckBoxes: any;

  sortBy: string = "rawMaterialName";
  sortDirection: string = "ASC";

  newRawMaterialForm: FormGroup;
  newRawMaterialDisabled: boolean = false;
  newRawMaterialFormErrorMessages: any;

  editRawMaterialForm: FormGroup;
  editRawMaterialDisabled: boolean = false;
  editRawMaterialFormErrorMessages: any;

  deleteRawMaterialForm: FormGroup;
  deleteRawMaterialDisabled: boolean = false;

  constructor(private rawMaterialsService: RawMaterialsService) {
    super();
    this.newRawMaterialForm = new FormGroup({
      rawMaterialName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      rawMaterialCode: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      rawMaterialUnitPrice: new FormControl(null, [Validators.required])
    });

    this.newRawMaterialFormErrorMessages = {
      rawMaterialName: { required: "Raw Material Name can't be blank", minlength: "Raw Material Name should contain at least 2 characters", maxlength: "Raw Material Name can't be longer than 40 characters" },
      rawMaterialCode: { required: "Raw Material Code can't be blank", minlength: "Raw Material Code should contain at least 2 characters", maxlength: "Raw Material Code can't be longer than 40 characters" },
      rawMaterialUnitPrice: { required: "Unit Price can't be blank" }
    };

    this.editRawMaterialForm = new FormGroup({
      id: new FormControl(null),
      rawMaterialID: new FormControl(null),
      rawMaterialName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      rawMaterialCode: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      rawMaterialUnitPrice: new FormControl(null, [Validators.required]),
      creationDateTime: new FormControl(null)
    });

    this.editRawMaterialFormErrorMessages = {
      rawMaterialName: { required: "Raw Material Name can't be blank", minlength: "Raw Material Name should contain at least 2 characters", maxlength: "Raw Material Name can't be longer than 40 characters" },
      rawMaterialCode: { required: "Raw Material Code can't be blank", minlength: "Raw Material Code should contain at least 2 characters", maxlength: "Raw Material Code can't be longer than 40 characters" },
      rawMaterialUnitPrice: { required: "Unit Price can't be blank" }
    };

    this.viewRawMaterialCheckBoxes = {
      rawMaterialName: true,
      rawMaterialCode: true,
      rawMaterialUnitPrice: true,
      createdOn: true,
      lastModifiedOn: true
    };

    this.deleteRawMaterialForm = new FormGroup({
      id: new FormControl(null),
      rawMaterialID: new FormControl(null),
      rawMaterialName: new FormControl(null)
    });
  }

  ngOnInit() {
    this.showRawMaterialsSpinner = true;
    this.rawMaterialsService.GetAllRawMaterials().subscribe((response) => {
      this.rawmaterials = response;
      this.showRawMaterialsSpinner = false;
    }, (error) => {
      console.log(error);
    })
  }

  onCreateRawMaterialClick() {
    this.newRawMaterialForm.reset();
    this.newRawMaterialForm["submitted"] = false;
  }

  onAddRawMaterialClick(event) {
    this.newRawMaterialForm["submitted"] = true;
    if (this.newRawMaterialForm.valid) {
      this.newRawMaterialDisabled = true;
      var rawMaterial: RawMaterial = this.newRawMaterialForm.value;

      this.rawMaterialsService.AddRawMaterial(rawMaterial).subscribe((addResponse) => {
        this.newRawMaterialForm.reset();
        $("#btnAddRawMaterialCancel").trigger("click");
        this.newRawMaterialDisabled = false;
        this.showRawMaterialsSpinner = true;

        this.rawMaterialsService.GetAllRawMaterials().subscribe((getResponse) => {
          this.showRawMaterialsSpinner = false;
          this.rawmaterials = getResponse;
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.newRawMaterialDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.newRawMaterialForm);
    }
  }

  getFormControlCssClass(formControl: FormControl, formGroup: FormGroup): any {
    return {
      'is-invalid': formControl.invalid && (formControl.dirty || formControl.touched || formGroup["submitted"]),
      'is-valid': formControl.valid && (formControl.dirty || formControl.touched || formGroup["submitted"])
    };
  }

  getFormControlErrorMessage(formControlName: string, validationProperty: string): string {
    return this.newRawMaterialFormErrorMessages[formControlName][validationProperty];
  }

  getCanShowFormControlErrorMessage(formControlName: string, validationProperty: string, formGroup: FormGroup): boolean {
    return formGroup.get(formControlName).invalid && (formGroup.get(formControlName).dirty || formGroup.get(formControlName).touched || formGroup['submitted']) && formGroup.get(formControlName).errors[validationProperty];
  }

  onEditRawMaterialClick(index) {
    this.editRawMaterialForm.reset();
    this.editRawMaterialForm["submitted"] = false;
    this.editRawMaterialForm.patchValue({
      id: this.rawmaterials[index].id,
      rawMaterialID: this.rawmaterials[index].rawMaterialID,
      rawMaterialName: this.rawmaterials[index].rawMaterialName,
      rawMaterialCode: this.rawmaterials[index].rawMaterialCode,
      rawMaterialUnitPrice: this.rawmaterials[index].rawMaterialUnitPrice,
      creationDateTime: this.rawmaterials[index].creationDateTime
    });
  }

  onUpdateRawMaterialClick(event) {
    this.editRawMaterialForm["submitted"] = true;
    if (this.editRawMaterialForm.valid) {
      this.editRawMaterialDisabled = true;
      var rawMaterial: RawMaterial = this.editRawMaterialForm.value;

      this.rawMaterialsService.UpdateRawMaterial(rawMaterial).subscribe((updateResponse) => {
        this.editRawMaterialForm.reset();
        $("#btnUpdateRawMaterialCancel").trigger("click");
        this.editRawMaterialDisabled = false;
        this.showRawMaterialsSpinner = true;

        this.rawMaterialsService.GetAllRawMaterials().subscribe((getResponse) => {
          this.showRawMaterialsSpinner = false;
          this.rawmaterials = getResponse;
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.editRawMaterialDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.editRawMaterialForm);
    }
  }

  onDeleteRawMaterialClick(index) {
    this.deleteRawMaterialForm.reset();
    this.deleteRawMaterialForm["submitted"] = false;
    this.deleteRawMaterialForm.patchValue({
      id: this.rawmaterials[index].id,
      rawMaterialID: this.rawmaterials[index].rawMaterialID,
      rawMaterialName: this.rawmaterials[index].rawMaterialName
    });
  }

  onDeleteRawMaterialConfirmClick(event) {
    this.deleteRawMaterialForm["submitted"] = true;
    if (this.deleteRawMaterialForm.valid) {
      this.deleteRawMaterialDisabled = true;
      var rawMaterial: RawMaterial = this.deleteRawMaterialForm.value;

      this.rawMaterialsService.DeleteRawMaterial(rawMaterial.rawMaterialID, rawMaterial.id).subscribe((deleteResponse) => {
        this.deleteRawMaterialForm.reset();
        $("#btnDeleteRawMaterialCancel").trigger("click");
        this.deleteRawMaterialDisabled = false;
        this.showRawMaterialsSpinner = true;

        this.rawMaterialsService.GetAllRawMaterials().subscribe((getResponse) => {
          this.showRawMaterialsSpinner = false;
          this.rawmaterials = getResponse;
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.deleteRawMaterialDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.deleteRawMaterialForm);
    }
  }

  onViewSelectAllClick() {
    for (let propertyName of Object.keys(this.viewRawMaterialCheckBoxes)) {
      this.viewRawMaterialCheckBoxes[propertyName] = true;
    }
  }

  onViewDeselectAllClick() {
    for (let propertyName of Object.keys(this.viewRawMaterialCheckBoxes)) {
      this.viewRawMaterialCheckBoxes[propertyName] = false;
    }
  }

  onBtnSortClick() {
    this.rawmaterials.sort((a, b) => {
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
