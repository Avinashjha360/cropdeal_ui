import { Component } from '@angular/core';
import {RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../../logoutDialog/dialog.component';

@Component({
  selector: 'app-farmer-dashboard',
  standalone: true,
  imports: [RouterModule, MatIconModule],
  templateUrl: './farmer-dashboard.component.html',
  styleUrl: './farmer-dashboard.component.css'
})
export class FarmerComponent {
  constructor(private dialog: MatDialog){}

  logout(){
    this.dialog.open(LogoutDialogComponent, {});
  }
}
