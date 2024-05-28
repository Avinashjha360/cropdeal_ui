import { Product } from "./products"

 interface Cart {
    id: string,
    userId: string,
    products:Product [],
    totalAmount: number,
  }

  export class CartObject implements Cart {
    id!: string;
    userId!: string;
    products!: Product[];
    totalAmount!: number;
  }