import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor,NgIf,RouterModule,NgbModule],
  templateUrl: './product-list-grid.component.html',
  // templateUrl: './product-list-table.component.html',
  // templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: [DatePipe] 
})
export class ProductListComponent  implements  OnInit {
    
  products:Product[]=[];
  currentCategoryId:number=1;
  searchMode:boolean=false;
  
  //New Properties for pagnation
  thePageNumber:number=1;
  thePageSize:number=5;
  theTotalElements:number=0;
  previousCategoryId: number=1;
  previousKeyword:string="";

  constructor(private productService:ProductService ,private route: ActivatedRoute, private cartService:CartService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
    })
    
  }
  
  
  listProducts():void{
    //check if id paramete


    this.searchMode= this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode)
    {
      this.handleSearchProducts();
    }
    else{
      this.handleListProducts();
    }
    
  }

  handleSearchProducts(){
        const theKeyword:string=this.route.snapshot.paramMap.get('keyword')!;
        //If we have a differnt keyword than previous 
        //than set thePagezNUmber  to 1

        if(this.previousKeyword != theKeyword)
        {
          this.thePageNumber=1;
        }
        this.previousKeyword=theKeyword;

        //now search for the products using keyword
        this.productService.searchProductsPaginate(this.thePageNumber-1, this.thePageSize, theKeyword).subscribe(this.processResult()) 
  }

  handleListProducts(){
    const hasCategoryId:boolean=this.route.snapshot.paramMap.has('id');
    if(hasCategoryId)
    {
      this.currentCategoryId  = +this.route.snapshot.paramMap.get('id')!;
    }

    else{
        //not category id avaible ...defualt is category id 1
        this.currentCategoryId=1;
    }

    if(this.previousCategoryId != this.currentCategoryId)
    {
      this.thePageNumber=1;
    }
    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);
    
      //now get the products for  the 

      this.productService.getProductListPaginate(this.thePageNumber-1, this.thePageSize ,this.currentCategoryId).subscribe(this.processResult());
  }
  updatePageSize(pageSize:string){
      this.thePageSize=+pageSize;
      this.thePageNumber=1;
      this.listProducts();
  }

  processResult(){
    return(data:any) =>{
        this.products=data._embedded.products;       
        this.thePageNumber=data.page.number+1;
        this.thePageSize=data.page.size;
        this.theTotalElements=data.page.totalElements;

    }
  }

  addToCart(theProduct:Product){
    console.log(`Adding  to cart ${theProduct.name} ,${theProduct.unitPrice} `)
    
    const theCartItem= new CartItem(theProduct);
    this.cartService.addToCart(theCartItem)
    

  }

}
