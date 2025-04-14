import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  

  product!:Product
  constructor(private productService :ProductService ,private route:ActivatedRoute,private cartService:CartService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() =>{
        this.handleProductDetails();
    })
  }


  handleProductDetails() {
    //get the id params string converted string to a number using '+' symbol

    const theProductId:number =+this.route.snapshot.paramMap.get('id')!;
    this.productService.getProduct(theProductId).subscribe((data)=>{
      this.product=data;
    })

  }
  addToCart() {

const theCartItem =new CartItem(this.product);
this.cartService.addToCart(theCartItem);

      
  }

}
