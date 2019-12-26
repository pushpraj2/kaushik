import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserAccountService } from '../../Services/user-account.service';
import { User } from '../../Models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit
{
  loginForm: FormGroup;
  loginFormDisabled: boolean = false;
  loginFormErrorMessages: any;
  constructor(private userAccountService: UserAccountService, private router: Router)
  {
    this.loginForm = new FormGroup(
      {
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required]),
        usertype: new FormControl(null, [Validators.required])
      });
    this.loginFormErrorMessages = {
      email: { required: "Email can't be blank", pattern: "Email is invalid" },
      password: { required: "Password can't be blank" },
      userType: { required: "User Type should be selected" }
    };
  }

  ngOnInit()
  {
  }
  getFormControlCssClass(formControl: FormControl, formGroup: FormGroup): any {
    return {
      'is-invalid': formControl.invalid && (formControl.dirty || formControl.touched || formGroup["submitted"]),
      'is-valid': formControl.valid && (formControl.dirty || formControl.touched || formGroup["submitted"])
    };
  }

  getFormControlErrorMessage(formControlName: string, validationProperty: string): string {
    return this.loginFormErrorMessages[formControlName][validationProperty];
  }
  getCanShowFormControlErrorMessage(formControlName: string, validationProperty: string, formGroup: FormGroup): boolean {
    return formGroup.get(formControlName).invalid && (formGroup.get(formControlName).dirty || formGroup.get(formControlName).touched || formGroup['submitted']) && formGroup.get(formControlName).errors[validationProperty];
  }
  onLoginClick()
  {
    
    this.userAccountService.authenticate(this.loginForm.value.email, this.loginForm.value.password, this.loginForm.value.usertype).subscribe((response) => {
      
      if (response != null && response.length > 0) {
        if (this.loginForm.value.usertype == "Admin") {
          this.userAccountService.currentUser = new User(this.loginForm.value.email, response[0].adminName);
          this.userAccountService.currentUserType = "Admin";
          this.userAccountService.isLoggedIn = true;
          this.router.navigate(["/admin", "home"]);
          
        }
        if (this.loginForm.value.usertype == "Supplier") {
          this.userAccountService.currentUser = new User(this.loginForm.value.email, response[0].supplierName);
          this.userAccountService.currentUserType = "Supplier";
          this.userAccountService.isLoggedIn = true;
          this.router.navigate(["/supplier", "supplierHome"]);
        }

        if (this.loginForm.value.usertype == "SystemUser") {
          this.userAccountService.currentUser = new User(this.loginForm.value.email, response[0].systemuserName);
          this.userAccountService.currentUserType = "SystemUser";
          this.userAccountService.isLoggedIn = true;
          this.router.navigate(["/systemuser", "systemuserhome"]);
        }
        if (this.loginForm.value.usertype == "Distributor") {
          this.userAccountService.currentUser = new User(this.loginForm.value.email, response[0].distributorName);
          this.userAccountService.currentUserType = "Distributor";
          this.userAccountService.isLoggedIn = true;
          this.router.navigate(["/distributor", "distributorhome"]);
        }
      }
      else {
        alert("Incorrect Email or Password. ");
      }
      

    }, (error) => { console.log(error) });
    

    
  }
}



