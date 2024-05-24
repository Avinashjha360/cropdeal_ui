import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../Service/auth.service';
import { ProductService } from '../../Service/product.service';
import { SharedService } from '../../Service/shared.service';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
     MatIconModule, 
     MatMenuTrigger, 
     MatBadgeModule,
     MatMenuModule
    ],
  template: `

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
  <mat-icon aria-hidden="false" *ngIf="isLoggedIn()?getRole() === 'DEALER':true" [matBadge]="sharedService.getCounter()>0?sharedService.getCounter():''" matBadgeColor="accent" aria-label="Example cart icon" class="cart-icon" >shopping_cart</mat-icon>
</a>
<a [routerLink]="['/login']">
  <button class="login-button bg-primary"  *ngIf="!isLoggedIn()">Login</button>
</a>
  <mat-toolbar class="account-toolbar" *ngIf="isLoggedIn()">
    <mat-menu #userMenu="matMenu">
    <a [routerLink]="['/account']"><button mat-menu-item>Accounts</button></a>
    <button mat-menu-item>Settings</button>
    <button mat-menu-item>Notifications</button>
    <button mat-menu-item (click)="logout()" >Logout</button>
  </mat-menu>
    <mat-icon class="account-icon" [matMenuTriggerFor]="userMenu">account_circle</mat-icon>
</mat-toolbar>

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
  `,
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit{
  constructor(private route:Router, private authService:AuthService, private productService: ProductService, public sharedService: SharedService) {
   
  }

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if(this.isLoggedIn()){
    this.productService.getUserCart(userId).subscribe((res:any) => {
      if (res.data) {
        this.sharedService.setCount(res.data?.products.length);
      }
    })
  }
  }

  public isLoggedIn():boolean{
    return this.authService.isLoggedIn();
  }

  public logout(){
    this.authService.logout();
    this.route.navigateByUrl("/");
  }

  public getRole(): string{
    return this.authService.getRole();
}
}
