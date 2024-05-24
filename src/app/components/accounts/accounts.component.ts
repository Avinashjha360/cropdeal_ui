import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../Service/auth.service';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { CommonModule } from '@angular/common';
import { FarmerDashboardComponent } from './farmer-dashboard/farmer-dashboard.component';


@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [RouterModule, AdminDashboardComponent, FarmerDashboardComponent, UserDashboardComponent, CommonModule],
  template: `
<h3>{{this.getRole()}}</h3>
<div class="account-container">
  <app-admin-dashboard *ngIf="this.getRole() === 'ADMIN'"></app-admin-dashboard>
  <app-farmer-dashboard *ngIf="this.getRole() === 'FARMER'"></app-farmer-dashboard>
  <app-user-dashboard  *ngIf="this.getRole() === 'DEALER'"></app-user-dashboard>

  <div class="content">
    <router-outlet></router-outlet>
  </div>
</div>
  `,
  styleUrl: './accounts.component.css'
})
export class AccountsComponent{

  constructor(public authService:AuthService){}

  public isLoogedIn():boolean{
    return this.authService.isLoggedIn();
  }

  public getRole(): string{
      return this.authService.getRole();
  }
  
}
