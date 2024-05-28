import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../Service/auth.service';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RegisterSuccessComponent } from './register-success.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  template: `
  <div class="register-container">
  <div class="bg"></div>
    <div class="bg bg2"></div>
    <div class="bg bg3"></div>
    <div class="content">
    </div>
    <div class="register-box">
    <div class="box">
            <h2>Join us today</h2>
            <p>Enter your information to register</p>
        </div>
        <form [formGroup]="registerForm" (submit)="registerUser()">
            <input type="text" placeholder="Enter your first name" [formControl]="firstName">
            <p class="red-text" [hidden]="firstName.valid || firstName.untouched">Please enter a valid first name</p>
            <input type="text" placeholder="Enter your last name" [formControl]="lastName">
            <p class="red-text" [hidden]="lastName.valid || lastName.untouched">Please enter a valid last name</p>
            <input type="email" placeholder="Enter your email" [formControl]="email">
            <p class="red-text" [hidden]="email.valid || email.untouched">Please enter a valid email address</p>
            <input type="text" placeholder="Enter your phone number" [formControl]="phone">
            <p class="red-text" [hidden]="phone.valid || phone.untouched">Please enter a valid phone number</p>
            <input type="password" placeholder="Enter your password" [formControl]="password">
            <p class="red-text" [hidden]="password.valid || password.untouched">Password should be at least 6 characters long and must include a number and a special character.</p>
           
            <select name="userType"  [formControl]="role">
                <option disabled [selected]="true">Select your role</option>
                <option value="FARMER">Farmer</option>
                <option value="DEALER">Dealer</option>
            </select>
            <p class="red-text" [hidden]="role.valid || role.untouched">Please select the role</p>

            <button type="submit">Register</button>
        </form>
        <h3>Already have an account?<a [routerLink]="['/login']"> <span> Login</span></a></h3> 
    </div>
    <div>
        `,
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private _router: Router, private authService: AuthService) { }

  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  email = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  phone = new FormControl('', [Validators.required]);

  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    this.numberValidator,
    this.specialCharacterValidator
  ]);

  role = new FormControl('', [Validators.required]);

  registerForm = new FormGroup({
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    phone: this.phone,
    password: this.password,
    role: this.role
  })

  registerUser() {
    if (this.registerForm.valid) {
      this.authService.registerUser(this.registerForm.value).subscribe((res: any) => {
        console.log(res.data);
        this.registerForm.reset();
        this._router.navigate(['registersuccess']);
      }, (err) => {
        console.log("err while register user: ", err);
      })
    } else {
      // Handle the case where the form is invalid, such as displaying error messages
      this.registerForm.markAllAsTouched(); // Mark all fields as touched to trigger error messages
    }
  }

  // Custom validator function for requiring at least one number
  numberValidator(control: AbstractControl): ValidationErrors | null {
    const numberRegex = /\d/;
    if (!numberRegex.test(control.value)) {
      return { missingNumber: true };
    }
    return null;
  }

  specialCharacterValidator(control: AbstractControl): ValidationErrors | null {
    const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (!specialCharacterRegex.test(control.value)) {
      return { missingSpecialCharacter: true };
    }
    return null;
  }
}
