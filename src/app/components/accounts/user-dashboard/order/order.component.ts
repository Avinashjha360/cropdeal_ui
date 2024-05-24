import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../Service/product.service';
import { OrderObject } from '../../../../models/order';
import { CartObject } from '../../../../models/cart';
import { AuthService } from '../../../../Service/auth.service';

@Component({
    selector: 'app-order',
    standalone: true,
    imports: [],
    template: `
  <div class="container">
        <h1>Order History</h1>
        <div class="order-list">
        @for (order of orderList.reverse(); track $index) {
            
            <h4>{{order.date.split("T")[0]+", "+order.date.split("T")[1].split(".")[0].substring(0,5)}}</h4>
            @for (item of order.item.products; track $index) {
                <div class="order">
            <img [src]="item.image" alt="Product Image" [height]="100">
                <div class="order-info">
                    <p><strong>{{item.name}}</strong></p>
                    <p><strong>Total Amount:</strong> {{item.price}}</p>
                    <p><strong>Quantity:</strong> {{item.quantity}}</p>
                    <p><strong>Status:</strong> Pending</p>
                </div>
                <div class="actions">
                    <button class="details-btn">View Details</button>
                </div>
            </div>
            }
        }
        </div>

    </div>
  `,
    styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
    orderList: OrderObject[] = [];
    constructor(private productService: ProductService, private authService:AuthService) { }

    ngOnInit(): void {
        const userId = this.authService.getUserId()
        this.productService.getUserOrders(userId).subscribe((res: OrderObject[]) => {
            if (res) {
                this.orderList = res;
            } else {
                console.log("User not valid or cart is empty");
            }
        })
    }
}
