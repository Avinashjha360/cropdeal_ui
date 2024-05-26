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
  actionBtn: string = "Save";
  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any,
    public ref: MatDialogRef<DialogComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private productService: ProductService
  ) { }

  productForm !: FormGroup;

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
      userId: this.authService.getUserId(),
    });
    if (this.editData.data) {
      this.actionBtn = "Update";
      this.productForm.controls['name'].setValue(this.editData.data.name);
      this.productForm.controls['category'].setValue(this.editData.data.category);
      this.productForm.controls['location'].setValue(this.editData.data.location);
      this.productForm.controls['price'].setValue(this.editData.data.price);
      this.productForm.controls['quantity'].setValue(this.editData.data.quantity);
      this.productForm.controls['image'].setValue(this.editData.data.image);
      this.productForm.controls['description'].setValue(this.editData.data.description);
    }
  }

  saveProduct() {
    if (this.productForm.valid) {
      if (!this.editData.data) {
        this.productService.addProduct(this.productForm.value).subscribe((res: any) => {
          this.productForm.reset();
          this.ref.close(res.data);
        })
      }
      else {
        this.updateProduct();

      }
    } else {
      console.log("Invalid Form");
    }
  }


  updateProduct() {
    this.productService.updateProduct(this.productForm.value, this.editData.data.productId).subscribe((res:any)=>{
      this.ref.close(res.data);
    });
  }
}



