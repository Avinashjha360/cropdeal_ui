import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../Service/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: 'login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) { }

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
        this.authService.setToken(res.data.token);
        
        if (this.authService.getRole() === 'DEALER')
          this.router.navigateByUrl("/");
        else
          this.router.navigateByUrl(this.authService.getRole().toLowerCase() + "/dashboard");
      }, (err) => {
        console.log("err while login user: ", err);
      });

    } else {
      // Handle the case where the form is invalid, such as displaying error messages
      this.loginForm.markAllAsTouched(); // Mark all fields as touched to trigger error messages
    }
  }
}
