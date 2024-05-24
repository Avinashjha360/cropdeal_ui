import { Products } from "./products"

 interface Order {
    orderId: String,
    transactionId:String
    date:String,
    item:{
      id:string,
      products:Products[],
      totalAmount:number
    },
  }

  export class OrderObject implements Order {
    orderId!: String;
    transactionId!: String;
    date!: String;
    item!: { id: string; userId: String; products: Products[]; totalAmount: number; };
  }