import { Component, Input } from '@angular/core';
import { SharedService } from '../Service/shared.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  template: `
  <div class="alert-container">
  <div class="alert alert-warning alert-dismissible fade show" role="alert">
      {{message}}.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" (click)="closeAlert()"></button>
  </div>
  </div>

  `
})
export class AlertComponent {
@Input() message!:String;
constructor(private sharedService: SharedService){}
closeAlert(){
  this.sharedService.setAlert(false, "");
}
}
