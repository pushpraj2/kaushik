import { Component, OnInit } from '@angular/core';
import { SystemUser } from '../../Models/system-user';
import { SystemUsersService } from '../../Services/system-users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from "jquery";
import { InventoryComponentBase } from '../../inventory-component';

@Component({
  selector: 'app-system-users',
  templateUrl: './system-users.component.html',
  styleUrls: ['./system-users.component.scss']
})
export class SystemUsersComponent extends InventoryComponentBase implements OnInit
{
  systemusers: SystemUser[] = [];
  showSystemUsersSpinner: boolean = false;
  viewSystemUserCheckBoxes: any;

  sortBy: string = "systemUserName";
  sortDirection: string = "ASC";

  newSystemUserForm: FormGroup;
  newSystemUserDisabled: boolean = false;
  newSystemUserFormErrorMessages: any;

  editSystemUserForm: FormGroup;
  editSystemUserDisabled: boolean = false;
  editSystemUserFormErrorMessages: any;

  deleteSystemUserForm: FormGroup;
  deleteSystemUserDisabled: boolean = false;

  constructor(private systemUsersService: SystemUsersService) {
    super();
    this.newSystemUserForm = new FormGroup({
      systemUserName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      systemUserEmail: new FormControl(null, [Validators.required, Validators.email])
    });

    this.newSystemUserFormErrorMessages = {
      systemUserName: { required: "System User Name can't be blank", minlength: "System User Name should contain at least 2 characters", maxlength: "System User Name can't be longer than 40 characters" },
      systemUserEmail: { required: "Email can't be blank", pattern: "Email is invalid" }
    };

    this.editSystemUserForm = new FormGroup({
      id: new FormControl(null),
      systemUserID: new FormControl(null),
      systemUserName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
      systemUserEmail: new FormControl(null, [Validators.required, Validators.email]),
      creationDateTime: new FormControl(null)
    });

    this.editSystemUserFormErrorMessages = {
      systemUserName: { required: "System User Name can't be blank", minlength: "System User Name should contain at least 2 characters", maxlength: "System User Name can't be longer than 40 characters" },
      systemUserEmail: { required: "Email can't be blank", pattern: "Email is invalid" }
    };

    this.viewSystemUserCheckBoxes = {
      systemUserName: true,
      systemUserEmail: true,
      createdOn: true,
      lastModifiedOn: true
    };

    this.deleteSystemUserForm = new FormGroup({
      id: new FormControl(null),
      systemUserID: new FormControl(null),
      systemUserName: new FormControl(null)
    });
  }

  ngOnInit() {
    this.showSystemUsersSpinner = true;
    this.systemUsersService.GetAllSystemUsers().subscribe((response) => {
      this.systemusers = response;
      this.showSystemUsersSpinner = false;
    }, (error) => {
      console.log(error);
    })
  }

  onCreateSystemUserClick() {
    this.newSystemUserForm.reset();
    this.newSystemUserForm["submitted"] = false;
  }

  onAddSystemUserClick(event) {
    this.newSystemUserForm["submitted"] = true;
    if (this.newSystemUserForm.valid) {
      this.newSystemUserDisabled = true;
      var systemUser: SystemUser = this.newSystemUserForm.value;

      this.systemUsersService.AddSystemUser(systemUser).subscribe((addResponse) => {
        this.newSystemUserForm.reset();
        $("#btnAddSystemUserCancel").trigger("click");
        this.newSystemUserDisabled = false;
        this.showSystemUsersSpinner = true;

        this.systemUsersService.GetAllSystemUsers().subscribe((getResponse) => {
          this.showSystemUsersSpinner = false;
          this.systemusers = getResponse;
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.newSystemUserDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.newSystemUserForm);
    }
  }

  getFormControlCssClass(formControl: FormControl, formGroup: FormGroup): any {
    return {
      'is-invalid': formControl.invalid && (formControl.dirty || formControl.touched || formGroup["submitted"]),
      'is-valid': formControl.valid && (formControl.dirty || formControl.touched || formGroup["submitted"])
    };
  }

  getFormControlErrorMessage(formControlName: string, validationProperty: string): string {
    return this.newSystemUserFormErrorMessages[formControlName][validationProperty];
  }

  getCanShowFormControlErrorMessage(formControlName: string, validationProperty: string, formGroup: FormGroup): boolean {
    return formGroup.get(formControlName).invalid && (formGroup.get(formControlName).dirty || formGroup.get(formControlName).touched || formGroup['submitted']) && formGroup.get(formControlName).errors[validationProperty];
  }

  onEditSystemUserClick(index) {
    this.editSystemUserForm.reset();
    this.editSystemUserForm["submitted"] = false;
    this.editSystemUserForm.patchValue({
      id: this.systemusers[index].id,
      systemUserID: this.systemusers[index].systemUserID,
      systemUserName: this.systemusers[index].systemUserName,
      systemUserEmail: this.systemusers[index].systemUserEmail,
      creationDateTime: this.systemusers[index].creationDateTime
    });
  }

  onUpdateSystemUserClick(event) {
    this.editSystemUserForm["submitted"] = true;
    if (this.editSystemUserForm.valid) {
      this.editSystemUserDisabled = true;
      var systemUser: SystemUser = this.editSystemUserForm.value;

      this.systemUsersService.UpdateSystemUser(systemUser).subscribe((updateResponse) => {
        this.editSystemUserForm.reset();
        $("#btnUpdateSystemUserCancel").trigger("click");
        this.editSystemUserDisabled = false;
        this.showSystemUsersSpinner = true;

        this.systemUsersService.GetAllSystemUsers().subscribe((getResponse) => {
          this.showSystemUsersSpinner = false;
          this.systemusers = getResponse;
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.editSystemUserDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.editSystemUserForm);
    }
  }

  onDeleteSystemUserClick(index) {
    this.deleteSystemUserForm.reset();
    this.deleteSystemUserForm["submitted"] = false;
    this.deleteSystemUserForm.patchValue({
      id: this.systemusers[index].id,
      systemUserID: this.systemusers[index].systemUserID,
      systemUserName: this.systemusers[index].systemUserName
    });
  }

  onDeleteSystemUserConfirmClick(event) {
    this.deleteSystemUserForm["submitted"] = true;
    if (this.deleteSystemUserForm.valid) {
      this.deleteSystemUserDisabled = true;
      var systemUser: SystemUser = this.deleteSystemUserForm.value;

      this.systemUsersService.DeleteSystemUser(systemUser.systemUserID, systemUser.id).subscribe((deleteResponse) => {
        this.deleteSystemUserForm.reset();
        $("#btnDeleteSystemUserCancel").trigger("click");
        this.deleteSystemUserDisabled = false;
        this.showSystemUsersSpinner = true;

        this.systemUsersService.GetAllSystemUsers().subscribe((getResponse) => {
          this.showSystemUsersSpinner = false;
          this.systemusers = getResponse;
        }, (error) => {
          console.log(error);
        });
      },
        (error) => {
          console.log(error);
          this.deleteSystemUserDisabled = false;
        });
    }
    else {
      super.getFormGroupErrors(this.deleteSystemUserForm);
    }
  }

  onViewSelectAllClick() {
    for (let propertyName of Object.keys(this.viewSystemUserCheckBoxes)) {
      this.viewSystemUserCheckBoxes[propertyName] = true;
    }
  }

  onViewDeselectAllClick() {
    for (let propertyName of Object.keys(this.viewSystemUserCheckBoxes)) {
      this.viewSystemUserCheckBoxes[propertyName] = false;
    }
  }

  onBtnSortClick() {
    this.systemusers.sort((a, b) => {
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



