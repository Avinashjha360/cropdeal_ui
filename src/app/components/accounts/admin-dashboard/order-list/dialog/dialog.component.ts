import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../../Service/product.service';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../../../Service/order.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule, ReactiveFormsModule, MatDialogActions, MatDialogContent, MatButtonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnInit {
  title: string = '';
  order = 
    {
      "orderId": "123456",
      "transactionId": "789012",
      "date": "2024-05-26T07:15:35.702Z",
      "item": {
        "id": "654321",
        "userId": "user123",
        "products": [
          {
            "productId": "p001",
            "userId": "user123",
            "name": "Product 1",
            "category": "Category 1",
            "location": "Location 1",
            "image": "image1.jpg",
            "price": 10,
            "quantity": 2
          }
        ],
        "totalAmount": 35
      }
    };
  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any,
    public ref: MatDialogRef<DialogComponent>,
    private orderService:OrderService
  ) { }

  productForm !: FormGroup;

  ngOnInit(): void {
    this.order = this.editData.data;
    this.title = this.editData.title;
  }

  deleteOrder() {    
    this.orderService.deleteOrder(this.editData.data.orderId).subscribe((res:any)=>{
      this.ref.close(res);
    })
  }
}