import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [NgFor,CommonModule],
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
        
        //subscribe to the cart totalPrice
        this.cartService.totalPrce.subscribe(data =>this.totalPrice=data);
        
        //subscribe to the cart totalQuantity
        this.cartService.totalQuantity.subscribe(data => this.totalQuantity=data)
        
        //Compute cart total price and quantity
        this.cartService.computeCartTotals();
    }




}
