import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleProductComponent } from '../single-product/single-product.component';
import { ProductService } from '../../Service/product.service';
import { Product } from '../../models/products';
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

<app-slick-carousel [products]="productList"></app-slick-carousel>

    <section class="results">
      <app-single-product
        *ngFor="let products of productList | slice:0:12"
        [products]="products"> 
      </app-single-product>
    </section>

  `,
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit{
  productList: Product[] = [];

  constructor(private productService:ProductService) { }
  ngOnInit(): void {   
    this.productService.getAllProducts().subscribe((res:any)=>{
      this.productList = res.data;
    })
  }

}