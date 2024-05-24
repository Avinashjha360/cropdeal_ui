import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../Service/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, HttpClientModule, ReactiveFormsModule],
  template: `
  <div class="login-container">
  <div class="login-box">
        <h2>Login</h2>
        <form [formGroup]="loginForm" (submit)="getToken()">
            <input type="text" placeholder="Enter your email" [formControl]="username">
            <p class="red-text" [hidden]="username.valid || username.untouched">Enter correct valid email</p>
            <input type="password" placeholder="Enter your password" [formControl]="password">
            <p class="red-text" [hidden]="password.valid || password.untouched">Password must has at least 6 characters</p>
            <button type="submit">Login</button>
        </form>
        <h3>Don't have an account?<a [routerLink]="['/register']"> <span> Register</span></a></h3> 
    </div>
  </div>
  `,
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService: AuthService, private router:Router) { }

  username = new FormControl('', [
    Validators.required,
    Validators.email
  ])

  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ])

  loginForm = new FormGroup({
    username: this.username,
    password: this.password
  })

  getToken() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe((res: any) => {
        this.loginForm.reset();
        
        this.authService.setRole(res.data.user.role);
        this.authService.setUserId(res.data.user.id);
        this.authService.setToken(res.data.token);    
        this.router.navigateByUrl("/account");
      }, (err) => {
        console.log("err while login user: ", err);
      });

    } else {
      // Handle the case where the form is invalid, such as displaying error messages
      this.loginForm.markAllAsTouched(); // Mark all fields as touched to trigger error messages
    }
  }
}
