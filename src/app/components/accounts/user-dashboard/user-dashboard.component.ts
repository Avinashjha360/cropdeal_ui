import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../Service/auth.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  constructor(private route:Router, private authService:AuthService){}

  logout(){
    this.authService.logout();
    this.route.navigateByUrl("/");
  }
}
