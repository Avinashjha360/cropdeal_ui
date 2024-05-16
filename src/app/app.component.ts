import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { ProductService } from './Service/product.service';
import { FooterComponent } from './components/footer/footer.component';

@Component({

  selector: 'app-root',
  imports: [
    RouterModule,
    MatIconModule,
    MatBadgeModule, 
    FooterComponent
  ],
  standalone: true,
  template: `
  <main>
  
 
  <header class="header">
  <a [routerLink]="['/']">
  <div class="brand-name">
    <img class="brand-logo" src="/assets/logo.jpg" alt="logo" aria-hidden="true" height="60px" width="70px">
  </div>
  </a>
  <div class="search-container">
  <input type="text" class="search-input" placeholder="Search...">
  <button type="submit" class="search-button">
    <mat-icon aria-hidden="false" aria-label="Example search icon" fontIcon="search"></mat-icon>
  </button>
</div>
<div class="icons">
<a [routerLink]="['/cart']">
  <mat-icon aria-hidden="false" [matBadge]="number>0?number:''" matBadgeColor="accent" aria-label="Example cart icon" class="cart-icon" >shopping_cart</mat-icon>
</a>
<a [routerLink]="['/login']">
  <button class="login-button">Login</button>
</a>
</div>
  
</header>
 
  <section class="second-header">
    <div class="item">SHOP BY CATEGORY</div>
    <div class="item">OFFERS</div>
    <div class="item">BLOGS</div>
    <div class="item">FARMER'S CHOICE</div>
    <div class="item">DEALER'S CHOICE</div>
    <div class="item">TOP STORES OF THE MONTH</div>
  </section>

  <section>
    <router-outlet (activate)="subsciberMessage($event)"></router-outlet>
  </section>
  <app-footer></app-footer>

</main>`,

  styleUrl: './app.component.css'
})




export class AppComponent {
  number: number = 0;
  productService = inject(ProductService);

  constructor(){    
    this.productService.getUserCart("1").then((res)=>{
      if(res)
         this.number = res?.products.length;
    })
  }

  subsciberMessage(ref:any){
    if(ref.runStatusEmmiter){
          ref.runStatusEmmiter.subscribe((res:any) =>{    
          this.number = ref.productCountInCart; 
         })
    }
  }
}
