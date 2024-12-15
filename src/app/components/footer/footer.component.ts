import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../Service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
  
  <!-- Footer -->
<footer class="w3-center w3-black w3-padding-64">
    <a href="#home" class="w3-button w3-light-grey"><i class="fa fa-arrow-up w3-margin-right"></i>To the top</a>
    <div class="w3-xlarge w3-section">
      <i class="fa fa-facebook-official w3-hover-opacity mx-2"></i>
      <i class="fa fa-instagram w3-hover-opacity mx-2"></i>
      <i class="fa fa-snapchat w3-hover-opacity mx-2"></i>
      <i class="fa fa-pinterest-p w3-hover-opacity mx-2"></i>
      <i class="fa fa-twitter w3-hover-opacity mx-2"></i>
      <i class="fa fa-linkedin w3-hover-opacity mx-2"></i>
    </div>
    <p>Powered by <a href="https://cropdeal.com" title="W3.CSS" target="_blank" class="w3-hover-text-green">cropdeal.com</a></p>
  </footer>
  `,
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(public authService:AuthService){}
}
