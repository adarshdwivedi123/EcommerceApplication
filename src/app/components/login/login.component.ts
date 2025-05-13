import { Component, Inject, OnInit } from '@angular/core';
import myAppConfig from '../../config/my-app-config';
import { OKTA_AUTH, OktaAuthModule } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';
import { RouterLink, RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ OktaAuthModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent  implements OnInit{
  OktaSignIn:any;
  constructor(@Inject(OKTA_AUTH)private oktaAuth:OktaAuth){
      this.OktaSignIn=new  OktaSignIn({
        logo:'assets/images/logo.png',
        baseUrl:myAppConfig.oidc.issuer.split('/oauth2')[0],
        client:myAppConfig.oidc.clientId,
        redirectUri:myAppConfig.oidc.redirectUri,
        authParams:{
          pkce:true,
          issuer:myAppConfig.oidc.issuer,
          scopes:myAppConfig.oidc.scopes
        }
      });
  }
  
  ngOnInit(): void {
    this.OktaSignIn.remove();
    this.OktaSignIn.renderEl({
      el:'#okta-sign-in-widget'  //this name should be same as div tag id in login component
    },
    (response:any)=>{
      if(response.status === 'SUCCESS')
      {
        this.oktaAuth.signInWithRedirect();
      }
    },
    (error:any)=>{
        throw error;
    }
  );


  }

}
