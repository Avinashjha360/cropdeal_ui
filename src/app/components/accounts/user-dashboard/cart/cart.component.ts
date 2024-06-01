import { Component, OnInit, NgZone} from '@angular/core';
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
import { CheckoutComponent } from '../checkout/checkout.component';

declare var Razorpay: any;
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule, MatIconModule, MatBadgeModule, CheckoutComponent],
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
    private _snackBar:MatSnackBar,
    private ngZone: NgZone
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

  createTransaction(cartId:string, totalAmount:string){
    
   
    this.orderService.createTransaction(totalAmount).subscribe(res=>{
      this.openTransactionModal(res, cartId);
    })

    // this.placeOrder("198298", cartId);
  }

  openTransactionModal(response:any, cartId:string){    
    var options = {
      order_id: response.orderId,
      key: response.key,
      currency:response.currency,
      name:'Avinash Jha',
      description: "Payment of Farmer's Shop",
      image: '',
      handler: (response:any)=>{
        this.placeOrder(response.razorpay_order_id, cartId);
      },
      prefill:{
        name:'Aniket',
        email:'aniket@gmail.com',
        contact:'8987331438'
      },
      notes:{
        address:'Online shoping'
      },
      theme:{
        color:"green"
      }
    };
    var  razorPayObject = new Razorpay(options);
    razorPayObject.open();
  }



  placeOrder(transactionId:String, cartId:String){
    this.orderService.placeOrder(transactionId, cartId).subscribe((res:any)=>{
      this.ngZone.run(() => {
        this.router.navigate(['/dealer/orders']);
        this._snackBar.open("Order has been placed.", 'Close', { verticalPosition: 'top', duration:1500 });
      });

      const userId = this.authService.getUserId();
      this.deleteUserCart(userId);
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

  deleteUserCart(userId:string){
    this.cartService.deleteUserCart(userId).subscribe((res:any)=>{
      this.sharedService.setCount(0);
      this.cart.products=[];
      console.log(res);
    });
  }
}