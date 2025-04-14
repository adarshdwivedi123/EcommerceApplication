import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../common/product-category';
import { ProductService } from '../../services/product.service';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-category-menu',
  standalone: true,
  imports: [NgFor,RouterModule ],
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css'
})
export class ProductCategoryMenuComponent  implements OnInit{
  productCategories:ProductCategory[]=[];
  constructor(private productServices: ProductService){

  }
  ngOnInit(): void {
    this.listProductCategories();
  }

  listProductCategories(){
    this.productServices.getProductCategories().subscribe((data)=>{
      console.log('product-category',JSON.stringify(data));
      this.productCategories=data;
    })
  }

}
