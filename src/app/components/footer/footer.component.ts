import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
     <footer class="footer">
  <div class="footer-content">
    <div class="farmer-section">
      <h3>For Farmers</h3>
      <p>Join our community and start selling your products to dealers.</p>
      <a href="/farmer/signup" class="btn">Sign Up</a>
    </div>
    <div class="dealer-section">
      <h3>For Dealers</h3>
      <p>Explore a wide range of agricultural products from local farmers.</p>
      <a href="/dealer/signup" class="btn">Sign Up</a>
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
