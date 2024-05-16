import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../Service/product.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Products, Rating } from '../../models/products';
import { RatingsComponent } from '../ratings/ratings.component';
import { SharedService } from '../../Service/shared.service';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RatingsComponent],
  template: `
   <div class="product-container">
    <div class="product-image">
      <img [src]="products?.image" alt="Product Image">
    </div>
    <div class="product-details">
      <h1 class="product-name">{{products?.name}}</h1>
      <p class="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum commodo feugiat justo, eget convallis nisi ultricies at. Nulla facilisi.</p>
      <p class="product-price">Price: {{"&#8377;"+products?.price}}</p>
      <p class="product-availability">In Stock</p>
      <p class="product-quantity">Quantity Available: {{products?.quantity}}</p>
      <p class="product-category">Category: {{products?.category}}</p>
      <p class="seller-info">Sold by: Vindo Sharma | Location: {{products?.location}} | Contact:vinod.com</p>
      <div class="action-buttons">
        <button class="buy-now" (click)="addToCart('buy-now')">Buy Now</button>
        <button  class="btn btn-success add-to-cart" (click)="addToCart('add-to-cart')">Add to Cart</button>
      </div>
    </div>
    </div>
    <div class="additional-info">
      <h2>About the Product</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum commodo feugiat justo, eget convallis nisi ultricies at. Nulla facilisi.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum commodo feugiat justo, eget convallis nisi ultricies at. Nulla facilisi.</p>
    </div>
 <section>
    <app-ratings [ratings]="rating" [product]="products"></app-ratings>
  </section>
`,
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  productService = inject(ProductService);
  @Output() runStatusEmmiter = new EventEmitter();

  products: Products | undefined;
  rating: Rating[] = [];
  productCountInCart: number = 0;


  constructor(private _router: Router) {

  }

  ngOnInit(): void {
    const productId = this.route.snapshot.params['id'];
    this.productService.getProductById(productId).then(product => {
      this.products = product;
      this.rating = product.ratings || [];
    });
  }

  addToCart(input:string): void {
    const productId = this.products?.productId || '';
    const userId = "1";
    this.productService.addToCart(productId, userId).then((res) => {
      if(res){
        this.productCountInCart = res?.products.length;
        if(input == "buy-now"){
          this.navigateToCart();
        }
      }
      this.runStatusEmmiter.emit();
    });
  }

  navigateToCart() {
    this._router.navigate(['cart'])
  }
}
