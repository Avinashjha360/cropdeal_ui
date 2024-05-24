import { Component, Input, booleanAttribute, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Products, Rating } from '../../models/products';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../Service/product.service';
import { AuthService } from '../../Service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ratings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
<div class="container-fluid my-3">
  <div class="row justify-content-center">
    <div class="col-md-10">
      <div class="review-container">
        <div class="review-header">
          <h2>Customer Reviews</h2>
          <hr>
        </div>

        @for (rating of ratings; track $index) {
        <div class="review">
          <div class="review-rating">
            <span class="rating">{{rating.rating}}</span> <!-- Rating out of 5 -->
          </div>
          <div class="review-content">
            <p class="feedback">"{{rating.feedback}}"</p>
            <p class="review-user">- Customer ID: {{rating.userId}}</p>
          </div>
        </div>
        <hr>
        }

        <h2 id="fh2">We Appreciate Your Review!</h2>
        <h6 id="fh6">Your review will help us to improve our web hosting quality products, and customer services.</h6>

        <form id="feedback" [formGroup]="ratingForm" (submit)="submitRating()">
          <div class="form-group">
            <label for="rate" class="pinfo">Rate our overall services.</label>
            <select class="form-control" id="rate" formControlName="rating" required="true">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div class="form-group">
            <label for="review" class="pinfo">Write your feedback.</label>
            <textarea class="form-control" id="review" rows="3" formControlName="feedback"></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</div>

  `,
  styleUrl: './ratings.component.css'
})
export class RatingsComponent {
  ProductService = inject(ProductService);
  @Input() product: Products | undefined;
  @Input() ratings: Rating[] = [];

  constructor(private _snackBar: MatSnackBar, public authService: AuthService) {

  }

  ratingForm = new FormGroup({
    rating: new FormControl(''),
    feedback: new FormControl(''),
  });

  submitRating() {
    const ratingValue = this.ratingForm.value.rating ?? ''; // Default value if undefined
    const feedbackValue = this.ratingForm.value.feedback ?? ''
    const productId = this.product?.productId || '';
    const userId = this.authService.getUserId();
    if (this.authService.isLoggedIn()) {
      this.ProductService.postRating(
        ratingValue,
        feedbackValue,
        productId,
        userId
      ).then(res => {
        if (res) { // Check if res is not undefined
          this.ratings.push(res);
          this.ratingForm.reset();
        } else {
          console.error("Response from postRating is undefined or not of type Rating");
        }
      })
    }else{
      this._snackBar.open("Please Log In to post rating on the Products.", 'Close', { verticalPosition: 'top', });
    }
  }
}
