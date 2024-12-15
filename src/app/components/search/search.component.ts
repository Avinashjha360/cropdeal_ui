import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, ActivatedRoute, RouterModule, NavigationEnd } from '@angular/router';
import { ProductService } from '../../Service/product.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    RouterModule,
    MatCardModule,
    MatButtonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent{
  products: any = [];
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private productService: ProductService) {
    const name = this.activatedRoute.snapshot.params['name'];    
    this.productService.getProductsByName(name).subscribe((data: any) => {
      this.products = data.data;      
    })
  }

  ngOnInit(){
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {      
      const name = this.activatedRoute.snapshot.params['name'];            
      this.productService.getProductsByName(name).subscribe((data: any) => {
        this.products = data.data;        
      })
    });
  }
}