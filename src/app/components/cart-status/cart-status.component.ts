import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-status',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css'
})
export class CartStatusComponent  implements OnInit{
  
  totalPrice:number= 0.00;
  totalQuantity:number=0;

  constructor(private cartServices :CartService){

  }
  ngOnInit(): void {
    this.updateCartStatus()
  }
  updateCartStatus() {
    //subscribe  to the cart totalQuantity
    this.cartServices.totalPrce.subscribe((data)=>{
        this.totalPrice =data;
        //subscibe to  the cart totalQunatity
    });

    this.cartServices.totalQuantity.subscribe((data)=>{
      this.totalQuantity=data;
      
    })
  }

}
