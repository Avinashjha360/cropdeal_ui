import { Products } from "./products"

 interface Cart {
    id: string,
    userId: string,
    products:Products [],
    totalAmount: number,
  }

  export class CartObject implements Cart {
    id!: string;
    userId!: string;
    products!: Products[];
    totalAmount!: number;
  }