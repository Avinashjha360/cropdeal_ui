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
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../Service/auth.service';
import { ProductService } from '../Service/product.service';

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
    @Inject(MAT_DIALOG_DATA) public data: any,
    public ref: MatDialogRef<DialogComponent>,
    private builder: FormBuilder,
    private authService: AuthService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.inputTitle = this.data.title;
    this.inputData = this.data.data;
    if (this.data.data) {
      this.productForm.setValue({
        productId:this.inputData.productId,
        name: this.inputData.name,
        userId: this.inputData.userId,
        category: this.inputData.category,
        location: this.inputData.location,
        price: this.inputData.price,
        quantity: this.inputData.quantity,
        description: this.inputData.description,
        image: this.inputData.image,
        available: this.inputData.available
      });
    }
  }


  closePopup(res: any) {
    this.ref.close(res);
  }

  productForm = this.builder.group({
    productId:this.builder.control(null),
    userId: this.authService.getUserId(),
    name: this.builder.control(''),
    category: this.builder.control(''),
    location: this.builder.control(''),
    price: this.builder.control(null),
    quantity: this.builder.control(null),
    description: this.builder.control(''),
    image: this.builder.control(''),
    available: this.builder.control(true)
  })


  saveProduct() {
    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value).subscribe((res: any) => {
          this.closePopup(res.data);
      })
    } else {
      console.log("Not Valid");
    }
  }
}



