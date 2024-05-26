import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
