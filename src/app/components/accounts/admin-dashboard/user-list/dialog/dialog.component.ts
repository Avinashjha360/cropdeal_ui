import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../../Service/user.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnInit {
  inputData: any;
  inputTitle: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any,
    public ref: MatDialogRef<DialogComponent>,
    private formBuilder: FormBuilder,
    private userService:UserService
  ) { }

  userForm !: FormGroup;

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password:[''],
      enabled: [true],
      role:[''],
    });
    if (this.editData.data) {
      this.userForm.controls['firstName'].setValue(this.editData.data.firstName);
      this.userForm.controls['lastName'].setValue(this.editData.data.lastName);
      this.userForm.controls['email'].setValue(this.editData.data.email);
      this.userForm.controls['password'].setValue(this.editData.data.password);
      this.userForm.controls['phone'].setValue(this.editData.data.phone);
      this.userForm.controls['enabled'].setValue(this.editData.data.enabled);
      this.userForm.controls['role'].setValue(this.editData.data.role);
    }
  }

  saveProduct() {
    if (this.userForm.valid) {
      this.userService.updateUser(this.userForm.value, this.editData.data.id).subscribe((res:any)=>{
        this.ref.close(res.data);
      });
    } else {
      console.log("Invalid Form");
    }
  }

}



