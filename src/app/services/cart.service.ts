import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//ccheck a gadbad here
export class CartService {

cartItems:CartItem[]=[];
//we can use subject to publish  events in our code the event will be sent to all the subscribers
totalPrce:Subject<number>=new BehaviorSubject<number>(0);
totalQuantity:Subject<number>=new BehaviorSubject<number>(0);

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

      
      //  check id we fiund it
        alreadyExistsInCart=(existingCartItem!=undefined)
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
    console.log('total price',this.totalPrce);
    this.totalQuantity.next(totalQuantityValue);
    

    this.logCartData(totalPriceValue, totalQuantityValue);


  }
     //log cart data just for debugging purpose
     logCartData(totalPriceValue:number, totalQuantityValue:number){
      for(let tempCartItem of this.cartItems){
          const subTotalPrice =tempCartItem.quantity * tempCartItem.unitPrice;
          console.log(`name ${tempCartItem.name},quantity=${tempCartItem.quantity},unitPrice=${tempCartItem.unitPrice},subTotalPrice=${subTotalPrice}`);
      }

      
    }
    decrementQuantity(theCartItem: CartItem) {
      theCartItem.quantity--;
        if(theCartItem.quantity === 0)
        {
          this.remove(theCartItem);
        }
        else{
          this.computeCartTotals();
        }
    }
  remove(theCartItem: CartItem) {
    //get index of items in the array
    const itemIndex=this.cartItems.findIndex(tempCartItem =>tempCartItem.id === theCartItem.id);
    //if found remove the item from the array at the given index
    if(itemIndex >-1)
    {
      this.cartItems.splice(itemIndex,1);
      this.computeCartTotals();
    }

  }
}
