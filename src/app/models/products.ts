export interface Products {
    productId:string;
    userId:string;
    name:string;
    category:string;
    location:string;
    price:number;
    quantity:number;
    description: string,
    image: string,
    available: boolean,
    ratings:[
        {
            id:string,
            feedback:string,
            rating:number,
            userId:string
        }
    ]
}
export interface Rating {
    id: string;
    feedback: string;
    rating: number;
    userId: string;
}