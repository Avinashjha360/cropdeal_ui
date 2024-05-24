import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register-success',
  standalone: true,
  imports: [RouterModule],
  template: `
   <div class="container">
   <div class="message-container">
        <h1>Registration Complete!</h1>
        <p>Thank you for registering on Farmo. You are almost done.</p>
        <p>Our team will review your registration, and once approved, you will gain access to all available functionality in Farmo.</p>
        <div class="button-container">
        <a [routerLink]="['/login']"> Return to login page</a>
        </div>
    </div>
    <div>
  `,
  styleUrl: './register.component.css'
})
export class RegisterSuccessComponent {
  constructor(){}
}
