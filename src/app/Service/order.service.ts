import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderObject } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  readonly PATH_OF_API = "http://localhost:8087/api/"
  constructor(private http:HttpClient) { }

  getAllOrder(){
    return this.http.get(this.PATH_OF_API+"order/allOrders");
  }
  deleteOrder(orderId:string){
    return this.http.delete(this.PATH_OF_API+"order/"+orderId);
  }

  placeOrder(transactionId: String, cartId: String){
    return this.http.post(this.PATH_OF_API+"order/createOrder", {
      "transactionId": transactionId,
      "cartId": cartId
    });
  }
  
  getOrderByOrderId(orderId:string){
    return this.http.get<OrderObject[]>(this.PATH_OF_API+"order/"+orderId);
  }

  getUserOrders(userId: String){
    return this.http.get<OrderObject[]>(this.PATH_OF_API+"order/user/"+userId);
  }

  getUserOrdersByProductUserId(userId: String){
    return this.http.get<any[]>(this.PATH_OF_API+"order/product/"+userId);
  }

  public createTransaction(amount:string){
    return this.http.get(this.PATH_OF_API+"createTransaction/"+amount);
  }

}
