import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../Service/auth.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [ MatDialogActions, MatDialogContent, MatButtonModule],
  templateUrl: './dialog.component.html',
})
export class LogoutDialogComponent {

  constructor(
    public ref: MatDialogRef<LogoutDialogComponent>,
    private route:Router, 
    private authService:AuthService,
  ) { }


  logout(){
    this.ref.close();
    this.authService.logout();
    this.route.navigateByUrl("/");
  }
}