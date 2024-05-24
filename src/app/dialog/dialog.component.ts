import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatButtonModule,MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnInit {
  inputData:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, public ref: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.inputData = this.data;
  }


  closePopup(){
    this.ref.close("Data has been saved");
  }

}



