import { AfterViewInit, Component, ElementRef, Input, OnInit, SimpleChange, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Products } from '../../models/products';

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [
    RouterModule
  ],
  template: `
      <section class="product-listing">
      <a [routerLink]="['/details', products.productId]" class="learn-more">
      <div class="product-details">
      <img class="product-image" [src]="products.image" alt="Image of {{ products.name }}">

    <h2 class="product-name" #productName>{{ products.name }}</h2>
    <p class="product-info">Category: {{ products.category }}</p>
    <p class="product-info">Location: {{ products.location }}</p>
    <p class="product-info">Price: {{ products.price }}</p>
    <p class="product-info">Quantity Available: {{ products.quantity }}</p>
  </div>
  </a>
  </section>
  `,
  styleUrl: './single-product.component.css'
})
export class SingleProductComponent implements OnInit, AfterViewInit {
  @Input() products!: Products;
  @ViewChild("productName") productName?: ElementRef
  constructor() {
    console.log("Cons: ", this.productName);

  }
  ngAfterViewInit(): void {
    console.log("ngAfterViewInit: ", this.productName?.nativeElement);
  }
  ngOnInit(): void {
    console.log("OnINit: ", this.productName);
  }
  ngOnChanges(changes: SimpleChange): void {
    console.log("OnChange: ", this.productName);

  }

}
