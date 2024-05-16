import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../Service/auth.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,HttpClientModule],
  template: `
  <div class="container">
  <div class="login-container">
        <h2>Login</h2>
        <form action="#">
            <input type="text" placeholder="Enter your email" required>
            <input type="password" placeholder="Enter your password" required>
            <button type="submit">Login</button>
        </form>
        <h3>Don't have an account?<a [routerLink]="['/register']"> <span> Register</span></a></h3> 
    </div>
    
  </div>

  `,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService: AuthService = inject(AuthService);

  constructor(){}

  ngOnInit(){
    this.authService.getToken("avinash@gmail.com", "avinash");
  }
}
