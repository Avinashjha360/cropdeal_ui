import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../Service/product.service';
import { OrderObject } from '../../../../models/order';
import { CartObject } from '../../../../models/cart';
import { AuthService } from '../../../../Service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-order',
    standalone: true,
    imports: [CommonModule],
    templateUrl: `order.component.html`,
    styleUrl: './order.component.css'
})
export class FarmerOrderComponent implements OnInit {
    orderList: OrderObject[] = [];
    constructor(private productService: ProductService, private authService: AuthService) { }

    ngOnInit(): void {
        const userId = this.authService.getUserId()
        this.productService.getUserOrdersByProductUserId(userId).subscribe((res: OrderObject[]) => {
            if (res) {
                this.orderList = res;
            } else {
                console.log("User not valid or cart is empty");
            }
        })
    }

    public getUserId() {
        return this.authService.getUserId();
    }
}
