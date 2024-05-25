import { Injectable } from '@angular/core';
import { Products, Rating } from '../models/products';
import { CartObject } from '../models/cart';
import { HttpClient } from '@angular/common/http';
import { OrderObject } from '../models/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  readonly PATH_OF_API = "http://localhost:8087/api"
  readonly url2 = 'http://localhost:8087/api/product';

  readonly ratingurl = '';

  async getAllProducts():
  Promise<Products[]>{
    const productData = await fetch(this.url2);    
    const data = await productData.json() ?? [];
    return data.data;
  }

  async getProductById(id: number):
  Promise<Products> {
    const productData = await fetch(`${this.url2}/${id}`);  
    const data = await productData.json() ?? {};
    return data.data;
  }
  async postRating(rating: string, feedback: string, productId: string, userId: string):
  Promise<Rating> {
    const data = await fetch(this.PATH_OF_API+`/ratings/addRating`,{
        method: 'POST',
        headers :{
          'Content-type' : 'application/json; charset=UTF-8'
        },
        body:JSON.stringify({
          "rating":rating,
          "feedback":feedback,
          "productId":productId,
          "userId":userId
        })
    })
    return await data.json() ?? {};
  }


  getUserCart(userId:String){
    return this.http.get(this.PATH_OF_API+`/cart/user/${userId}`);
  }

  async addToCart(productId: string, userId: string):
  Promise<CartObject> { 
    const data = await fetch(this.PATH_OF_API+`/cart/addToCart`,{
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

  deleteUserCart(userId:String){
    return this.http.delete(this.PATH_OF_API+"/cart/delete/"+userId);
  }

  placeOrder(transactionId: String, cartId: String){
    return this.http.post(this.PATH_OF_API+"/order/createOrder", {
      "transactionId": transactionId,
      "cartId": cartId
    });
  }

  getUserOrders(userId: String){
    return this.http.get<OrderObject[]>(this.PATH_OF_API+"/order/user/"+userId);
  }

  getUserOrdersByProductUserId(userId: String){
    return this.http.get<any[]>(this.PATH_OF_API+"/order/product/"+userId);
  }

  getProductsByUserId(userId: String){
    return this.http.get<any[]>(this.PATH_OF_API+"/product/user/"+userId);
  }

  addProduct(data:any){
    return this.http.post(this.PATH_OF_API+"/product/addProduct",data);
  }

  async removeProductFromCart(productId: String, userId: String):
  Promise<CartObject> { 
    const data = await fetch(this.PATH_OF_API+`/cart/user/${userId}/${productId}`,{
        method: 'DELETE',
        headers :{
          'Content-type' : 'application/json; charset=UTF-8'
        }
    });
    return await data.json() ?? {};
  }

}
