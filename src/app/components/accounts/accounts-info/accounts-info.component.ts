import { Component } from '@angular/core';

@Component({
  selector: 'app-accounts-info',
  standalone: true,
  imports: [],
  template: `
      <div class="container">
        <h1>Personal Information <a>Edit</a></h1>
        <div class="user-info">
            <div class="user-field">
                <span class="field-name">Name:</span>
                <span class="field-value">Avinash Jha</span>
            </div>
            <div class="user-field">
                <span class="field-name">Age:</span>
                <span class="field-value">22</span>
            </div>
            <div class="user-field">
                <span class="field-name">Email:</span>
                <span class="field-value">avinash.jha.com</span>
            </div>
            <div class="user-field">
                <span class="field-name">Mobile Number:</span>
                <span class="field-value">8975742356</span>
            </div>
            <div class="user-field">
                <span class="field-name">Location:</span>
                <span class="field-value">MUMBAI, INDIA</span>
            </div>
        </div>
    </div>
  `,
  styleUrl: './accounts-info.component.css'
})
export class AccountsInfoComponent {

}
