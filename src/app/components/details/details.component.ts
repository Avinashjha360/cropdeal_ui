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
  templateUrl: './details.component.html',
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
