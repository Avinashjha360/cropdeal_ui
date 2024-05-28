import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Service/user.service';
import { AuthService } from '../../../Service/auth.service';
import { CommonModule } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-accounts-info',
    standalone: true,
    imports: [CommonModule, MatFormField, MatLabel, MatInputModule, ReactiveFormsModule],
    templateUrl: 'accounts-info.html',
    styleUrl: './accounts-info.component.css'
})
export class AccountsInfoComponent implements OnInit {
    editbutton = false;
    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private authService: AuthService,
        private _snackBar:MatSnackBar
    ) { }


    userForm = this.formBuilder.group({
        firstName: new FormControl({ value: null, disabled: true }),
        lastName: new FormControl({ value: null, disabled: true }),
        email: new FormControl({ value: null, disabled: true }),
        phone: new FormControl({ value: null, disabled: true }),
        password: new FormControl({ value: null, disabled: true }),
        enabled: new FormControl({ value: true, disabled: true }),
        role: new FormControl({ value: null, disabled: true }),
    });

    ngOnInit(): void {
        this.getUserById();
    }
    getUserById() {
        const userId = this.authService.getUserId();
        this.userService.getUserById(userId).subscribe((res: any) => {
            this.userForm.controls['firstName'].setValue(res.data.firstName);
            this.userForm.controls['lastName'].setValue(res.data.lastName);
            this.userForm.controls['email'].setValue(res.data.email);
            this.userForm.controls['password'].setValue(res.data.password);
            this.userForm.controls['phone'].setValue(res.data.phone);
            this.userForm.controls['enabled'].setValue(res.data.enabled);
            this.userForm.controls['role'].setValue(res.data.role);
        })
    }
    public clickEdit(): void {
        this.editbutton = !this.editbutton;
        if (this.editbutton) {
            this.userForm.get('firstName')?.enable();
            this.userForm.get('lastName')?.enable();
            this.userForm.get('phone')?.enable();
        } else {
            this.userForm.get('firstName')?.disable();
            this.userForm.get('lastName')?.disable();
            this.userForm.get('phone')?.disable();
        }

    }
    submitForm() {
        const userId = this.authService.getUserId();
        this.userService.updateUser(this.userForm.getRawValue(), userId).subscribe((res: any) => {
            this.getUserById();
            this.clickEdit();
            this._snackBar.open("User Info has been updated", 'Close', { verticalPosition: 'top', duration:1500 });
        })
    }
}
