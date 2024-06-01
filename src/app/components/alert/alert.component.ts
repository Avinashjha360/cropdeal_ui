import { Component, Input } from '@angular/core';
import { SharedService } from '../../Service/shared.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  template: `
  <!-- <div class="alert-container">
  <div class="alert alert-warning alert-dismissible fade show" role="alert">
      {{message}}.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" (click)="closeAlert()"></button>
  </div>
  </div> -->
  `,
  styleUrl: './alert.component.css'
})
export class AlertComponent {
@Input() message!:string;
constructor(private _snackBar: MatSnackBar, private sharedService: SharedService){
  this._snackBar.open("Please Log In to Add Products to Your Cart.", 'Close', { verticalPosition: 'top', duration:1500});
}

}
