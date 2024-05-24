import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  template: `
     <footer class="footer">
  <div class="footer-content">
    <div class="farmer-section">
      <h3>For Farmers</h3>
      <p>Join our community and start selling your products to dealers.</p>
      <a [routerLink]="['/register']" class="btn">Sign Up</a>
    </div>
    <div class="dealer-section">
      <h3>For Dealers</h3>
      <p>Explore a wide range of agricultural products from local farmers.</p>
      <a [routerLink]="['/register']" class="btn">Sign Up</a>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2024 YourFarmersMarket. All rights reserved.</p>
  </div>
</footer>
  `,
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
