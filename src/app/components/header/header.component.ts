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
  templateUrl: 'header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit{
  constructor(private route:Router, private authService:AuthService, private productService: ProductService, public sharedService: SharedService) {
   
  }

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if(this.isLoggedIn() && this.getRole() === 'Dealer'){
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
