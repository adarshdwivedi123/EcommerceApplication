import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [NgFor,CommonModule,NgIf,RouterLink],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent  implements OnInit{

  carItems:CartItem[]=[];
  totalPrice:number=0;
  totalQuantity:number=0;

  constructor(private cartService:CartService){}
  ngOnInit(): void {
    this.listCartDetails();
  }

    listCartDetails() {
        //get  a handle to the cart items
        this.carItems= this.cartService.cartItems;
        console.log('cart-Items',this.carItems);
        
        this.cartService.totalPrce.subscribe((data)=>{
          this.totalPrice =data;
          console.log('total-price',this.totalPrice);
          //subscibe to  the cart totalQunatity
      });
  
      this.cartService.totalQuantity.subscribe((data)=>{
        this.totalQuantity=data;
        console.log('total-quantiry',this.totalQuantity);
        
      })
        
        //Compute cart total price and quantity
        this.cartService.computeCartTotals();
    }
    incrementQuantity(theCartItem: CartItem) {
       this.cartService.addToCart(theCartItem);
      }

      decrementQuantity(theCartItem:CartItem) {
          this.cartService.decrementQuantity(theCartItem);
      }
      remove(theCartItem:CartItem) {
          this.cartService.remove(theCartItem);
        }



}
