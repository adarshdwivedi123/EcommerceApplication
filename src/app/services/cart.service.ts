import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
cartItems:CartItem[]=[];
//we can use subject to publish  events in our code the event will be sent to all the subscribers
totalPrce:Subject<number>=new Subject<number>();
totalQuantity:Subject<number>=new Subject<number>();

  constructor() { }
  addToCart(theCartItem:CartItem){
    //check if we already have the item in our cart
    let alreadyExistsInCart:boolean =false;
    let existingCartItem: any;
    if(this.cartItems.length > 0)
    {
      existingCartItem=this.cartItems.find(tempCartItem =>tempCartItem.id === theCartItem.id);
        //find the item iun the cart based on item id 
      // for(let tempCartItem of this.cartItems)
      // {
      //   if(tempCartItem.id === theCartItem.id)
      //   {
      //     existingCartItem=tempCartItem;
      //     break;
      //   }
      // }

      
        //check id we fiund it
        // alreadyExistsInCart=(existingCartItem!=undefined)
    }
    if(alreadyExistsInCart)
    {
      //increment quanity
      existingCartItem.quantity++;
    }
    else{
      this.cartItems.push(theCartItem)
    }
    //compute cart total price and total quantity
    this.computeCartTotals()
  }
  computeCartTotals() {
    let totalPriceValue:number =0;
    let totalQuantityValue:number=0;
    for(let currentCartItem  of this.cartItems)
    {
      totalPriceValue+= currentCartItem.quantity*currentCartItem.unitPrice;
      totalQuantityValue+= currentCartItem.quantity;
    }
    //publuish the new vlaues ..all subscibes will recive the new data

    this.totalPrce.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

 


  }
     //log cart data just for debugging purpose
     logCartData(totalPriceValue:number, totalQuantityValue:number){
      for(let tempCartItem of this.cartItems){
          const subTotalPrice =tempCartItem.quantity * tempCartItem.unitPrice;
          console.log(`name ${tempCartItem.name},quantity=${tempCartItem.quantity},unitPrice=${tempCartItem.unitPrice},subTotalPrice=${subTotalPrice}`);
      }

      
    }
}
