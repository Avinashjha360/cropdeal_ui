import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductService } from '../../Service/product.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Product, Rating } from '../../models/products';
import { RatingsComponent } from '../ratings/ratings.component';
import { SharedService } from '../../Service/shared.service';
import { AuthService } from '../../Service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../Service/cart.service';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RatingsComponent],
  template: `
   <div class="container">
  <div class="row mt-3">
    <div class="col-md-4">
      <div class="product-container">
        <div class="product-image">
          <img [src]="products?.image" alt="Product Image" class="img-fluid">
        </div>

      </div>
    </div>
    <div class="col-md-6">
    <div class="product-details">
          <h1 class="product-name">{{products?.name}}</h1>
          <p class="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum commodo feugiat justo, eget convallis nisi ultricies at. Nulla facilisi.</p>
          <p class="product-price">Price: {{"&#8377;"+products?.price}}</p>
          <p class="product-availability text-success">In Stock</p>
          <p class="product-quantity">Quantity Available: {{products?.quantity}}</p>
          <p class="product-category">Category: {{products?.category}}</p>
          <p class="seller-info">Sold by: Vindo Sharma | Location: {{products?.location}} | Contact:vinod.com</p>
          <div class="action-buttons">
            <button class="btn btn-primary buy-now" (click)="addToCart('buy-now')">Buy Now</button>
            <button class="btn btn-success add-to-cart" (click)="addToCart('add-to-cart')">Add to Cart</button>
          </div>
        </div>
    </div>
  </div>
  <div class="row">
  <div class="col-md-9">
      <div class="additional-info">
        <h2>About the Product</h2>
        <p>{{products?.description}}</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum commodo feugiat justo, eget convallis nisi ultricies at. Nulla facilisi.</p>
      </div>
    </div>
  </div>
</div>

 <section>
    <app-ratings [ratings]="rating" [product]="products"></app-ratings>
</section>


`,
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  products: Product | undefined;
  rating: Rating[] = [];

  constructor(
    private _router: Router,
    private authService: AuthService,
    private productService: ProductService,
    private cartService: CartService,
    public sharedService: SharedService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.params['id'];

    this.productService.getProductById(productId).then(product => {
      this.products = product;
      this.rating = product.ratings || [];
    });

    this._router.events.subscribe((event) => { 
      if (!(event instanceof NavigationEnd)) { 
          return; 
      } 
      window.scrollTo(0, 0) 
  }); 
  }


  addToCart(input: string): void {
    const productId = this.products?.productId || '';
    if (this.authService.isLoggedIn()) {
      // User is logged in, add product to server-side cart
      const userId = this.authService.getUserId();
      this.cartService.addToCart(productId, userId).then((res) => {
        if (res) {
          this.sharedService.setCount(res?.products.length);
          if (input == "buy-now") {
            this._router.navigate(['checkout'])
          }
        }
      });
    } else {
      this._snackBar.open("Please Log In to Add Products to Your Cart.", 'Close', { verticalPosition: 'top', duration: 2000 });
    }
  }
}
