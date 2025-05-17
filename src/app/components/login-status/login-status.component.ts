import { NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OKTA_AUTH, OKTA_CONFIG, OktaAuthModule, OktaAuthStateService } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  standalone: true,
  imports: [NgIf,OktaAuthModule,RouterLink],
  providers:[],
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css'
})
export class LoginStatusComponent  implements OnInit{
  isAuthenticated:boolean=false;
  userFullName:string='';
  storage:Storage=sessionStorage;

  constructor(private oktaAuthService:OktaAuthStateService,
    @Inject(OKTA_AUTH)private OktaAuth:OktaAuth)
  {}
  ngOnInit(): void {
    //Subscibe to authenticate state changes 
    this.oktaAuthService.authState$.subscribe((result)=>{
      this.isAuthenticated=result.isAuthenticated!;
      this.getUserDetails();

    })
    
  }

  getUserDetails() {
    if(this.isAuthenticated){
      //Fetch  the logged inuser details (user ,claims)
      //user fullnam,eis exposes as prpert name

      this.OktaAuth.getUser().then(
        (res)=>{
          this.userFullName=res.name as string;

          //retrive the user's email from authentication resosne
          const theEmail = res.email;
          
          // now store the email in browser storage
          this.storage.setItem('userEmail',JSON.stringify(theEmail));
        }
      );
    }
    
  }
  logout(){
    //Terminates  the  session okta  and removes current tokens
    this.OktaAuth.signOut();
    }




}
