import { Component, Input, booleanAttribute, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Products, Rating } from '../../models/products';
import { FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../Service/product.service';

@Component({
  selector: 'app-ratings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
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


<form id="feedback" [formGroup]="applyForm" (submit)="submitRating()">
 <div class="pinfo">Rate our overall services.</div>
<div class="form-group">
  <div class="col-md-4 inputGroupContainer">
  <div class="input-group">
  <span class="input-group-addon"><i class="fa fa-heart"></i></span>
   <select class="form-control" id="rate" formControlName="rating" required="true">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
    </div>
  </div>
</div>

 <div class="pinfo">Write your feedback.</div>
<div class="form-group">
  <div class="col-md-4 inputGroupContainer">
  <div class="input-group">
  <span class="input-group-addon"><i class="fa fa-pencil"></i></span>
  <textarea class="form-control" id="review" rows="3" formControlName="feedback"></textarea>
    </div>
  </div>
</div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
</div>
  `,
  styleUrl: './ratings.component.css'
})
export class RatingsComponent {
  ProductService = inject(ProductService);
  @Input() product: Products | undefined;
  @Input() ratings: Rating[] = [];

  applyForm = new FormGroup({
    rating: new FormControl(''),
    feedback: new FormControl(''),
  });

  submitRating() {
    const ratingValue = this.applyForm.value.rating ?? ''; // Default value if undefined
    const feedbackValue = this.applyForm.value.feedback ?? '' 
    const productId = this.product?.productId || '';
    const userId = "1";

    this.ProductService.postRating(
      ratingValue,
      feedbackValue,
      productId,
      userId
    ).then(res =>{
      if (res) { // Check if res is not undefined
        this.ratings.push(res);
        this.applyForm.reset();
      } else {
        console.error("Response from postRating is undefined or not of type Rating");
      }
    })
  }
}
