import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../Service/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIcon, CommonModule],
  animations: [
    trigger('increaseCount', [
      transition(':increment', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('100ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class UserDashboardComponent implements OnInit{
  currentCount: number = 0;

  constructor(public authService:AuthService) { }

  ngOnInit(): void {
    this.increaseCount(1000);
  }

  increaseCount(input:number) {
    const interval = setInterval(() => {
      this.currentCount+=10;
      if (this.currentCount === input) {
        clearInterval(interval);
      }
    }, 10); // Adjust the interval as needed
  }
}
