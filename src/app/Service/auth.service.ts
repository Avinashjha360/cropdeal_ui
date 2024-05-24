import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CartObject } from '../models/cart';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private isAuthenticated = false;
  constructor(private http: HttpClient, private router: Router) { }

  login(data: any) {
    return this.http.post("http://localhost:8087/api/login", data);
  }

  getUserInfo(userEmail: String) {
    return this.http.get("http://localhost:8087/api/user/" + userEmail);
  }


  registerUser(data: any) {
    return this.http.post("http://localhost:8087/api/register", data);
  }

  public setUserId(userId: string) {
    localStorage.setItem('userId', userId);
  }

  public getUserId(): string {
    const userId = localStorage.getItem('userId');
    if (userId)
      return userId;
    return "";
  }

  public setRole(role: string) {
    localStorage.setItem('role', role);
  }
  public getRole(): string {
    const role = localStorage.getItem('role');
    if (role)
      return role;
    return "";
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken() {
    return localStorage.getItem('jwtToken');
  }

  public setCart(cart: CartObject) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  public getCart():CartObject | null{
    const cart = localStorage.getItem('cart');
    if(cart)
      return JSON.parse(cart);

    return null;
  }

  public logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
  }

  public isLoggedIn() {
    if (this.getRole() && this.getToken())
      return true;
    return false;
  }
}
