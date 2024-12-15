import { Component, Input, OnInit, inject } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { Product } from '../models/products';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slick-carousel',
  standalone: true,
  imports: [SlickCarouselModule, MatCardModule, MatButtonModule, RouterModule, CommonModule],
  templateUrl: './slick-carousel.component.html',
  styleUrl: './slick-carousel.component.css'
})
export class SlickCarouselComponent {


  @Input() products: Product[] = [];
  fruit: Product[] = [];
  vegetable: Product[] = [];
  private route = inject(Router);

 getFruits(){
  this.route.navigate(['/search', 'Fruit']);
 }
 getVegetables(){
  this.route.navigate(['/search', 'Vegetable']);
 }

  slideConfig = {
    "slidesToShow": 6,
    "slidesToScroll": 6,
    "autoplay": true,
    "autoplaySpeed": 3000,
    "pauseOnHover": true,
    "infinite": true,
    "arrows": false,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
        
      },
    ],
  };

  slideConfig2 = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "autoplay": true,
    "autoplaySpeed": 2000,
    "pauseOnHover": true,
    "infinite": true,
    "arrows": false

  };


  ngOnChanges() {
    console.log("ngOnChanges", this.products);
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].category === 'Fruit')
        this.fruit.push(this.products[i]);
      else
        this.vegetable.push(this.products[i]);
    }
  }

  ngOnInit() {
    console.log("ngOnInit", this.products);

  }

  ngAfterContentInit() {
    console.log("ngAfterContentInit", this.products);


  }

  
  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');

  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }
}
