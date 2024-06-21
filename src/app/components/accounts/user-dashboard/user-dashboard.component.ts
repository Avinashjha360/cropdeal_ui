import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../Service/auth.service';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../../logoutDialog/dialog.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [RouterModule, MatIcon],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserComponent {
  constructor(private dialog: MatDialog){}

  logout(){
    this.dialog.open(LogoutDialogComponent, {});
  }
}
