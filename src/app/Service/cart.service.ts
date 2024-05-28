import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartObject } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  readonly PATH_OF_API = "http://localhost:8087/api/"
  constructor(private http:HttpClient) { }

 
  removeProductFromCart(productId: String, userId: String) { 
    return this.http.delete(this.PATH_OF_API+"cart/user/"+userId+"/"+productId);
  }

  deleteUserCart(userId:String){
    return this.http.delete(this.PATH_OF_API+"cart/delete/"+userId);
  }
  getUserCart(userId:String){
    return this.http.get(this.PATH_OF_API+`cart/user/${userId}`);
  }

  async addToCart(productId: string, userId: string):
  Promise<CartObject> { 
    const data = await fetch(this.PATH_OF_API+`cart/addToCart`,{
        method: 'POST',
        headers :{
          'Content-type' : 'application/json; charset=UTF-8'
        },
        body:JSON.stringify({
          "productId":productId,
          "userId":userId
        })
    });
    return await data.json() ?? {};
  }

}
