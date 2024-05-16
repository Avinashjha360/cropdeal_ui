import { Component, EventEmitter, Output, inject } from '@angular/core';
import { ProductService } from '../../Service/product.service';
import { CartObject } from '../../models/cart';
import { Products } from '../../models/products';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule, MatIconModule, MatBadgeModule],
  template: `
    <div class="container">
  <h1>Shopping Cart</h1>
  @for (item of cart.products; track $index) {
    <div class="cart-item">
    <img [src]="item.image" alt="Product Image">
    <div class="item-details">
      <h3>{{item.name}}</h3>
      <p>Price: {{"$"+item.price}}</p>
      <div class="quantity">
        <label for="quantity">Quantity:</label>
        <input type="number" id="quantity" name="quantity" value="{{item.quantity}}" min="1">
      </div>
      
      <button class="remove-btn" (click)="removeProductFromCart(item.productId)">Remove</button>
    </div>
  </div>

  }
  @if (cart.products && cart.products.length) {
    <p class="item-price">Total Price: {{cart.totalAmount}}</p>
    <a href="#" class="checkout-btn">Checkout</a>
  }@else {
    <div class="empty-cart">
        <h2>Your cart is empty!</h2>
        <img src="/assets/empty-cart.png" alt="" srcset="" height="150">
    </div>

    <a [routerLink]="['/']" class="checkout-btn">Shop Now</a>
  }
  

</div>
  `,
  styleUrl: './cart.component.css'
})
export class CartComponent {
  productService: ProductService = inject(ProductService);
  cart: CartObject = new CartObject();
  productCountInCart: number = 0;

  @Output() runStatusEmmiter = new EventEmitter();


  constructor() {
    this.productService.getUserCart("1").then((res: CartObject) => {
      if (res) {
        this.cart = res;
      } else {
        console.log("User not valid or cart is empty");
      }

    })
  }
  removeProductFromCart(productId: String) {
    const userId = "1";

    this.productService.removeProductFromCart(productId, userId).then((res) => {
      this.productCountInCart = res!.products.length;
      this.runStatusEmmiter.emit();

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
