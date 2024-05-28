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
import { AuthService } from '../../../../../Service/auth.service';
import { ProductService } from '../../../../../Service/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [ MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnInit {
  actionBtn: string = "Save";
  productForm !: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any,
    public ref: MatDialogRef<DialogComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private productService: ProductService,
    private _snackBar: MatSnackBar
  ) { }


  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      description: [''],
      image: [''],
      available: [true],
      userId: [''],
    });
    if (this.editData.data) {
      this.actionBtn = "Update";
      this.productForm.controls['name'].setValue(this.editData.data.name);
      this.productForm.controls['category'].setValue(this.editData.data.category);
      this.productForm.controls['location'].setValue(this.editData.data.location);
      this.productForm.controls['price'].setValue(this.editData.data.price);
      this.productForm.controls['quantity'].setValue(this.editData.data.quantity);
      this.productForm.controls['available'].setValue(this.editData.data.available);
      this.productForm.controls['image'].setValue(this.editData.data.image);
      this.productForm.controls['description'].setValue(this.editData.data.description);
      this.productForm.controls['userId'].setValue(this.editData.data.userId);
    }
  }

  saveProduct() {
    if (this.productForm.valid) {

      console.log(this.productForm.value);

      this.productService.updateProduct(this.productForm.value, this.editData.data.productId).subscribe((res: any) => {
        this.ref.close(res.data);
        this._snackBar.open("Product has been updated", 'Close', { verticalPosition: 'top', duration: 1500 });

      });
    } else {
      console.log("Invalid Form");
    }
  }

}



