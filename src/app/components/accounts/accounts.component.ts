import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../Service/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl:'accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {

  constructor(public authService: AuthService) { }

  public isLoogedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  public getRole(): string {
    return this.authService.getRole();
  }

}
