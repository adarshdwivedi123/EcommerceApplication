import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Luv2ShopFormService } from '../../services/luv2-shop-form.service';
import { State } from '../../common/state';
import { Country } from '../../common/country';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {


  checkoutFromGroup!:FormGroup;
  totalPrice:number=0;
  totalQuantity:number=0;
  creditCardYears:number[]=[];
  creditCardMonths:number[]=[];
  shippingAddressStates:State[]=[];
  billingAddressStates:State[]=[];
  countries:Country[]=[];

  constructor(private formBuilder:FormBuilder,private luv2ShopFormServices:Luv2ShopFormService){

  }
  

  ngOnInit(): void { 
    this.checkoutFromGroup=this.formBuilder.group({
        customer:this.formBuilder.group({
          firstName:new FormControl('' ,[Validators.required ,Validators.minLength(2)]),
          lastName:new FormControl('' ,[Validators.required ,Validators.minLength(2)]),
          email:new FormControl('' ,
            [Validators.required ,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
        }),
        shippingAddress:this.formBuilder.group({
          street:[''],
          city:[''],
          state:[''],
          country:[''],
          zipCode:[''],
        }),
    billingAddress:this.formBuilder.group({
      street:[''],
      city:[''],
      state:[''],
      country:[''],
      zipCode:[''],
    }),

    creditCard:this.formBuilder.group({
      cartType:[''],
      nameOnCard:[''],
      cardNumber:[''],
      securityCode:[''],
      expirationMonth:[''],
      expirationYear:[''],
    }),
    
  });
  //Populate credits card months
  const  startMonth: number=new Date().getMonth()+1;
  console.log("startMonth:"+startMonth);
  this.luv2ShopFormServices.getCreditCardMonths(startMonth).subscribe(
    data =>{
      this.creditCardMonths=data;
    }
  )
  
  //Populate Credit card Years
  this.luv2ShopFormServices.getCreditCardYears().subscribe(data =>{
    this.creditCardYears=data;
    
  })

  this.luv2ShopFormServices.getCountries().subscribe((data)=>{
      console.log("Retrived Contries "+JSON.stringify(data));
      this.countries=data;
  });
 
}


get firstName(){
  return this.checkoutFromGroup.get('customer.firstName');
}

get lastName(){
  return this.checkoutFromGroup.get('customer.lastName');
}

get email(){
  return this.checkoutFromGroup.get('customer.email');
}



onsubmit(){
  if(this.checkoutFromGroup.invalid)
  {
    this.checkoutFromGroup.markAllAsTouched();
  }


}

copyShippingAddresToBillingAddress(event:any) {
  if(event.target.checked)
  {
    this.checkoutFromGroup.controls['billingAddress'].setValue(this.checkoutFromGroup.controls['shippingAddress'].value);
    this.billingAddressStates=this.shippingAddressStates;
  }
  else{
        this.checkoutFromGroup.controls['billingAddress'].reset(); 
        this.billingAddressStates=[];//clear
  }
}

handleMonthsAndYears() {
    const creditCardFormGroup =this.checkoutFromGroup.get('creditCard');
    const currentYear:number=new Date().getFullYear();
    const selectedYear:number=Number(creditCardFormGroup?.value.expirationYear);

    // if the current year   equls the selected yrear then, the start with  the current  month
    let  startMonth:number;
    if(currentYear ===  selectedYear)
    {
      startMonth =new Date().getMonth()+1;
    }
    else{
      startMonth=1;
    }
    this.luv2ShopFormServices.getCreditCardMonths(startMonth).subscribe(
      data =>{
        this.creditCardMonths =data;
      }
    )
    
}
getStates(formGroupName:string){
  alert('called');
  const formGroup =this.checkoutFromGroup.get(formGroupName);
  const countryCode=formGroup?.value.country.code;
  const countryName=formGroup?.value.country.name;
  console.log(`{formGroupName}country  code :${countryCode}`);
  console.log(`{formGroupName}country  code :${countryName}`);

  this.luv2ShopFormServices.getStates(countryCode).subscribe(
    data =>{
        if(formGroupName === 'shippingAddress'){
           this.shippingAddressStates =data;

        }
        else{
          this.billingAddressStates=data;
        }
        //select first item by default
        formGroup?.get('state')?.setValue(data[0])
    }
  )
  

}

}
  
  
