import { Component, OnInit} from '@angular/core';
import { ProductService } from '../../../../Service/product.service';
import { CartObject } from '../../../../models/cart';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { SharedService } from '../../../../Service/shared.service';
import { AuthService } from '../../../../Service/auth.service';
import { OrderService } from '../../../../Service/order.service';
import { CartService } from '../../../../Service/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule, MatIconModule, MatBadgeModule],
  templateUrl: `./cart.component.html`,
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  cart: CartObject = new CartObject();

  constructor(
    private router:Router, 
    private orderService:OrderService, 
    private authService:AuthService, 
    protected cartService:CartService,
    public sharedService:SharedService,
    private _snackBar:MatSnackBar
  ) {  }

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if(this.authService.isLoggedIn()){
    this.cartService.getUserCart(userId).subscribe((res:any) => {
      if (res.data) {
        this.cart=res.data;
      } else {
        console.log("User not valid or cart is empty");
      }
    })
  }
  }

  placeOrder(transactionId:String, cartId:String){
    const userId = this.authService.getUserId();

    this.orderService.placeOrder(transactionId, cartId).subscribe((res)=>{
      
      this.cartService.deleteUserCart(userId).subscribe(res=>{
        this.sharedService.setCount(0);
        this.cart.products=[];
        this._snackBar.open("Order placed.", 'Close', { verticalPosition: 'top', duration:1500 });
        this.router.navigateByUrl('account/dealer/orders');
      });
    },(err)=>{
      console.log(err);
      
    })
  }


  removeProductFromCart(productId: String) {
    const userId = this.authService.getUserId();

    this.cartService.removeProductFromCart(productId, userId).subscribe((res:any) => {
    this.sharedService.setCount(res!.products.length);
    this._snackBar.open("Product removed from Cart.", 'Close', { verticalPosition: 'top',duration: 1500});

      this.cart?.products.forEach((value) => {
        if (value.productId === productId) {
          // Remove the product from the cart
          // Assuming `this.cart` is an array, we can use `splice` to remove the item
          const index = this.cart!.products.indexOf(value);
          if (index !== -1) {
            this.cart!.totalAmount = this.cart!.totalAmount - (value.price * value.quantity);
            this.cart!.products.splice(index, 1);
          }
        }
      });
    })
  }
}