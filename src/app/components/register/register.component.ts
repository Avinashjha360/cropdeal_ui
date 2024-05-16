import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule],
  template: `
  <div class="container">
    <div class="registration-container">
        <h2>Registration</h2>
        <form action="#">
            <input type="text" placeholder="Enter your first name" required>
            <input type="text" placeholder="Enter your last name" required>
            <input type="email" placeholder="Enter your email" required>
            <input type="text" placeholder="Enter your phone number" required>
            <input type="password" placeholder="Enter your password" required>
            <select name="userType" aria-placeholder="Select your role">
                <option >Select your role</option>
                <option value="FARMER">Farmer</option>
                <option value="DEALER">Dealer</option>
            </select>
            <button type="submit">Register</button>
        </form>
        <h3>Already have an account?<a [routerLink]="['/login']"> <span> Login</span></a></h3> 
    </div>
    <div>
  `,
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
