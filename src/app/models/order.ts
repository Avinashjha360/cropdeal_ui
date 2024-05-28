import { Product } from "./products"

 export interface OrderObject {
    orderId: String,
    transactionId:String
    date:String,
    item:{
      id:string,
      products:Product[],
      totalAmount:number
    },
  }
