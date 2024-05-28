import { Injectable } from '@angular/core';
import { Product, Rating } from '../models/products';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  readonly PATH_OF_API = "http://localhost:8087/api/"
  readonly url2 = 'http://localhost:8087/api/product';

  readonly ratingurl = '';

  getAllProducts(){
    return this.http.get<any[]>(this.PATH_OF_API+"product");
  }

  async getProductById(id: number):
  Promise<Product> {
    const productData = await fetch(`${this.url2}/${id}`);  
    const data = await productData.json() ?? {};
    return data.data;
  }

  getProductsByUserId(userId: String){
    return this.http.get<any[]>(this.PATH_OF_API+"product/user/"+userId);
  }

  addProduct(data:any){
    return this.http.post(this.PATH_OF_API+"product/addProduct",data);
  }

  updateProduct(data:any, productId:string){
    return this.http.put(this.PATH_OF_API+"product/update/"+productId, data);
  }


  async postRating(rating: string, feedback: string, productId: string, userId: string):
  Promise<Rating> {
    const data = await fetch(this.PATH_OF_API+`ratings/addRating`,{
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


}