import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleProductComponent } from '../single-product/single-product.component';
import { ProductService } from '../../Service/product.service';
import { Products } from '../../models/products';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SingleProductComponent
  ],
  template: `
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