import { Component, Input } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { Products } from '../models/products';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-slick-carousel',
  standalone: true,
  imports: [SlickCarouselModule,  MatCardModule,
    MatButtonModule, RouterModule],
  templateUrl: './slick-carousel.component.html',
  styleUrl: './slick-carousel.component.css'
})
export class SlickCarouselComponent {

  @Input() products: Products[] = [];
  slides = [
    {img: "http://placehold.it/350x150/000000"},
  ];
  slideConfig = {
    "slidesToShow": 6, 
    "slidesToScroll": 6,
    "autoplay":true,
    "autoplaySpeed":3000,
    "pauseOnHover":true,
    "infinite":true
  
  };
  
  addSlide() {
    this.slides.push({img: "http://placehold.it/350x150/777777"})
  }
  
  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
  
  slickInit(e:any) {
    console.log('slick initialized');
  }
  
  breakpoint(e:any) {
    console.log('breakpoint');
  }
  
  afterChange(e:any) {
    console.log('afterChange');
  }
  
  beforeChange(e:any) {
    console.log('beforeChange');
  }
}
