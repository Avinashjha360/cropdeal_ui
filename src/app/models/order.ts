import { Product } from "./products"

 interface Order {
    orderId: String,
    transactionId:String
    date:String,
    item:{
      id:string,
      products:Product[],
      totalAmount:number
    },
  }

  export class OrderObject implements Order {
    orderId!: String;
    transactionId!: String;
    date!: String;
    item!: { id: string; userId: String; products: Product  []; totalAmount: number; };
  }