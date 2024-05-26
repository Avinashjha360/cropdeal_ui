import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { ProductService } from './Service/product.service';
import { FooterComponent } from './components/footer/footer.component';
import { SharedService } from './Service/shared.service';
import { AuthService } from './Service/auth.service';
import { AlertComponent } from './components/alert/alert.component';
import { HeaderComponent } from './components/header/header.component';
import { SlickCarouselComponent } from './slick-carousel/slick-carousel.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    MatIconModule,
    FooterComponent,
    AlertComponent,
    HeaderComponent,
    SlickCarouselComponent
    ],
  standalone: true,
  templateUrl: `./app.component.html`,
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{

  isCollapsed = true;
  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  constructor( public sharedService: SharedService) {}

  ngOnInit(): void {
  }


}
