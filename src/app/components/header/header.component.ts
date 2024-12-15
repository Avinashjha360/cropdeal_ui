import { Component, OnInit, NgZone } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../Service/auth.service';
import { SharedService } from '../../Service/shared.service';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule } from '@angular/common';
import { CartService } from '../../Service/cart.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { LogoutDialogComponent } from '../logoutDialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../Service/product.service';

declare var webkitSpeechRecognition: new () => any;

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
    MatMenuModule,
    MatDividerModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: 'header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit {

  w3_open() {
    const mySidebar: any = document.getElementById("mySidebar");

    if (mySidebar.style.display === 'block') {
      mySidebar.style.display = 'none';
    } else {
      mySidebar.style.display = 'block';
    }
  }

  w3_close() {
    const mySidebar: any = document.getElementById("mySidebar");

    mySidebar.style.display = "none";
  }

  toggle: boolean = false;
  searchText = new FormControl('', [
    Validators.required,
  ])

  searchForm = new FormGroup({
    searchText: this.searchText,
  })

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    public sharedService: SharedService,
    private dialog: MatDialog,
    private route: Router,
    private ngZone: NgZone,
    private productService: ProductService
  ) { }
  ngOnInit(): void {
    const userId = this.authService.getUserId();

    if (this.isLoggedIn() && this.getRole() === 'DEALER') {
      this.cartService.getUserCart(userId).subscribe((res: any) => {
        if (res.data) {
          this.sharedService.setCount(res.data?.products.length);
        }
      })
    }
  }

  search() {
    if (this.searchForm.valid && this.searchText.value != null) {
        this.route.navigate(['/search', this.searchText.value]);
    }
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  public logout() {
    this.dialog.open(LogoutDialogComponent, {});
  }

  show() {
    this.toggle = true;
  }
  close() {
    this.toggle = false;
  }


  public getRole(): string {
    return this.authService.getRole();
  }

  public getUserName(): string {
    return this.authService.getUserName();
  }

  results: any;

  startListening() {
    // let voiceHandler = this.hiddenSearchHandler?.nativeElement;
    if ('webkitSpeechRecognition' in window) {
      const vSearch = new webkitSpeechRecognition();
      vSearch.continuous = false;
      vSearch.interimresults = false;
      vSearch.lang = 'en-US';
      vSearch.start();
      vSearch.onresult = (e: any) => {
        this.results = e.results[0][0].transcript;
        this.getResult();
        vSearch.stop();
      };
    } else {
      alert('Your browser does not support voice recognition!');
    }
  }

  value = [];
  routes = ["login", "register", "registersuccess", "cart", "dashboard"];
  getResult() {
    this.value = this.results.split(" ");

    for (let val of this.value) {
      if (this.routes.includes(val)) {
        this.ngZone.run(() => {

          if (this.authService.getRole() == 'ADMIN') {
            this.route.navigateByUrl("/" + val);
          } else {
            this.route.navigateByUrl("/" + val);
          }
        })
        console.log(val + " exists in routes array");
      } else {
        console.log(val + " does not exist in routes array");
      }
    }
  }

}
