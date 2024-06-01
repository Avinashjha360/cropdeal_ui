import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../../Service/cart.service';
import { AuthService } from '../../../../Service/auth.service';
import { CartObject } from '../../../../models/cart';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cart: CartObject = new CartObject();
  route: ActivatedRoute = inject(ActivatedRoute);
  constructor(private authService:AuthService, private cartService: CartService){}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    this.cartService.getUserCart(userId).subscribe((res:any) => {
      if (res.data) {
        this.cart=res.data;
        console.log(this.cart);
        
      } else {
        console.log("User not valid or cart is empty");
      }
    })
  }


}
