import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../Service/product.service';
import { OrderObject } from '../../../../models/order';
import { CartObject } from '../../../../models/cart';
import { AuthService } from '../../../../Service/auth.service';
import { OrderService } from '../../../../Service/order.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-order',
    standalone: true,
    imports: [],
    templateUrl: `order-success.component.html`,
    styleUrl: './order-success.component.css'
})
export class OrderSuccessComponent implements OnInit {
    order!: OrderObject;
    constructor(private router:ActivatedRoute, private orderService:OrderService, private authService:AuthService) { }

    ngOnInit(): void {
        const orderId = this.router.snapshot.params['id'];
        this.orderService.getOrderByOrderId(orderId).subscribe((res: any) => {
            if (res) {
                this.order = res;
            } else {
                console.log("User not valid or cart is empty");
            }
        })
    }
}
