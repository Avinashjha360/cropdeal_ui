import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../Service/auth.service';

@Component({
  selector: 'app-farmer-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './farmer-dashboard.component.html',
  styleUrl: './farmer-dashboard.component.css'
})
export class FarmerDashboardComponent {
  constructor(private route:Router, private authService:AuthService){}

  logout(){
    this.authService.logout();
    this.route.navigateByUrl("/");
  }
}
