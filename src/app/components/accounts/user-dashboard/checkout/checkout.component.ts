import { Component, OnInit, inject, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../../Service/cart.service';
import { AuthService } from '../../../../Service/auth.service';
import { CartObject } from '../../../../models/cart';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from '../../../../Service/order.service';
import { SharedService } from '../../../../Service/shared.service';

declare var Razorpay: any;
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  cart: CartObject = new CartObject();
  route: ActivatedRoute = inject(ActivatedRoute);
  constructor(
    private router:Router, 
    private authService: AuthService, 
    private cartService: CartService, 
    private orderService:OrderService, 
    public sharedService:SharedService,
    private _snackBar:MatSnackBar,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    this.cartService.getUserCart(userId).subscribe((res: any) => {
      if (res.data) {
        this.cart = res.data;
        console.log(this.cart);

      } else {
        console.log("User not valid or cart is empty");
      }
    })
  }

 

onSubmit(orderForm:any) {
  if(!orderForm.valid){
    this._snackBar.open("Please add valid Address Information", 'Close', { verticalPosition: 'top', duration:2000 });
    return;
  }

  this.orderService.createTransaction(this.cart.totalAmount.toString()).subscribe(res=>{
    this.openTransactionModal(res, this.cart.id, orderForm.value);
  });
}


openTransactionModal(response:any, cartId:string, address:any){      
  var options = {
    order_id: response.orderId,
    key: response.key,
    currency:response.currency,
    name:address.fullName,
    description: "Payment of Farmer's Shop",
    image: '',
    handler: (response:any)=>{
      this.placeOrder(response.razorpay_order_id, cartId, address);
    },
    prefill:{
      name:address.fullName,
      email:address.email,
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




placeOrder(transactionId:String, cartId:String, address:any){
  
  this.orderService.placeOrder(transactionId, cartId, address).subscribe((res:any)=>{
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

deleteUserCart(userId:string){
  this.cartService.deleteUserCart(userId).subscribe((res:any)=>{
    this.sharedService.setCount(0);
    this.cart.products=[];
    console.log(res);
  });
}

}
