import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../Service/auth.service';
import { MatIcon } from '@angular/material/icon';

import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../../logoutDialog/dialog.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterModule, MatIcon],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminComponent{
  constructor(private dialog: MatDialog){}

  logout(){
    this.dialog.open(LogoutDialogComponent, {});
  }
}
