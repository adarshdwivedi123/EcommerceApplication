import { Product } from "./product";

export class CartItem {
    id!:string;
    name!:string;
    imageUrl!:string;
    unitPrice!:any
    quantity!:number;

    constructor(product:Product){
            this.id=product.id;
            this.name=product.name;
            this.imageUrl =product.imageUrl;
            this.unitPrice=product.unitPrice;
            this.quantity=1;

    }
}
