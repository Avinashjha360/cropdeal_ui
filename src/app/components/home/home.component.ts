import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleProductComponent } from '../single-product/single-product.component';
import { ProductService } from '../../Service/product.service';
import { Products } from '../../models/products';
import { AddProductComponent } from '../accounts/farmer-dashboard/add-product/add-product.component';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { SlickCarouselComponent } from '../../slick-carousel/slick-carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SingleProductComponent,
    MdbCarouselModule,
    SlickCarouselComponent
  ],
  template: `
  <mdb-carousel [controls]="true" [indicators]="true" [animation]="'fade'">
  <mdb-carousel-item>
    <img
      src="/assets/carausel5.jpg"
      class="d-block w-100"
      alt="..."
      height="250"
    />
  </mdb-carousel-item>
  <mdb-carousel-item>
    <img
      src="/assets/carausel2.jpg"
      class="d-block w-100"
      alt="..."
      height="250"
    />
  </mdb-carousel-item>
  <mdb-carousel-item>
    <img
      src="/assets/carausel4.jpg"
      class="d-block w-100"
      alt="..."
      height="250"
    />
  </mdb-carousel-item>
</mdb-carousel>
<app-slick-carousel [products]="productList"></app-slick-carousel>
<app-slick-carousel [products]="productList"></app-slick-carousel>

    <section class="results">
      <app-single-product
        *ngFor="let products of productList"
        [products]="products">
      </app-single-product>
    </section>

  `,
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit{
  productService: ProductService = inject(ProductService);
  productList: Products[] = [];

  constructor() {    
  }
  ngOnInit(): void {
    this.productService.getAllProducts().then((productList: Products[])=>{
      this.productList = productList;      
    })    
  }

}