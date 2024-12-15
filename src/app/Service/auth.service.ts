import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CartObject } from '../models/cart';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root' // This makes the service available application-wide
})

export class AuthService {
  constructor(private http: HttpClient, private router: Router, private sharedService:SharedService) { }

  login(data: any) {
    return this.http.post("http://localhost:8087/api/login", data);
  }

  registerUser(data: any) {
    return this.http.post("http://localhost:8087/api/register", data);
  }

  getUserByEmail(userEmail: String) {
    return this.http.get("http://localhost:8087/api/user/" + userEmail);
  }

  public getUserId(): any {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      return null;
    }    
    const payload = JSON.parse(atob(token.split('.')[1]));    
    return payload.USERID;
  }

  public getRole(): any {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      return null;
    }    
    const payload = JSON.parse(atob(token.split('.')[1]));    
    return payload.ROLE;
  }

  public getUserName(): any {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      return null;
    }    
    const payload = JSON.parse(atob(token.split('.')[1]));    
    return payload.USERNAME;
  }

  public getUserEmail(): any {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      return null;
    }    
    const payload = JSON.parse(atob(token.split('.')[1]));    
    return payload.sub;
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken() {
    return localStorage.getItem('jwtToken');
  }


  public logout(): void {
    localStorage.removeItem('jwtToken');
    this.sharedService.setCount(0);
  }

  public isLoggedIn() {
    if (this.getRole() && this.getToken())
      return true;
    
    return false;
  }
}
