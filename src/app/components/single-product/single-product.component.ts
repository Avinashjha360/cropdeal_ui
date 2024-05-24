import { AfterViewInit, Component, ElementRef, Input, OnInit, SimpleChange, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Products } from '../../models/products';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [
    RouterModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './single-product.html',
  styleUrl: './single-product.component.css'
})
export class SingleProductComponent {
  @Input() products!: Products;
  @ViewChild("productName") productName?: ElementRef
}
