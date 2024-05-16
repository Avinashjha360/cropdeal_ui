import { Injectable } from '@angular/core';
import { Products, Rating } from '../models/products';
import { CartObject } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }
  readonly url = 'http://localhost:3000/locations';

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
    const data = await fetch(`http://localhost:8087/api/ratings/addRating`,{
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

  async getUserCart(userId: string):
  Promise<CartObject> {
    const data = await fetch(`http://localhost:8087/api/cart/user/${userId}`,{
        headers :{
          'Content-type' : 'application/json; charset=UTF-8'
        }
    })
    return await data.json() ?? {};
  }

  async addToCart(productId: string, userId: string):
  Promise<CartObject> { 
    const data = await fetch(`http://localhost:8087/api/cart/addToCart`,{
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

  async removeProductFromCart(productId: String, userId: String):
  Promise<CartObject> { 
    const data = await fetch(`http://localhost:8087/api/cart/user/${userId}/${productId}`,{
        method: 'DELETE',
        headers :{
          'Content-type' : 'application/json; charset=UTF-8'
        }
    });
    return await data.json() ?? {};
  }



  submitApplication(rating: string, feedback: string, productId: string, userId: string) {
    console.log(`Homes application received: rating: ${rating}, feedback: ${feedback}. , productId: ${productId}, userId:${userId}`);
  }





  // async getAllHousingLocations():
  // Promise<HousingLocation[]>{
  //   const data = await fetch(this.url);
  //   console.log(this.getAllProducts());
  //   return await data.json() ?? [];
  // }

  // async getHousingLocationById(id: number):
  // Promise<HousingLocation> {
  //   const data = await fetch(`${this.url}/${id}`);
  //   return await data.json() ?? {};
  // }
}
