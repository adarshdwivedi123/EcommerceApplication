import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import myAppConfig from './config/my-app-config';
import OktaAuth from '@okta/okta-auth-js';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { LoginComponent } from './components/login/login.component';
import { MembersPageComponent } from './components/members-page/members-page.component';
import { inject, } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRedirectServiceService } from './services/auth-redirect-service.service';

const oktaConfig=myAppConfig.oidc;
const oktaAuth =new OktaAuth(oktaConfig);

// ✅ Declare this above the routes
function sendToLoginPage() {
  const router = inject(Router);
  // optional: you could also use oktaAuth.getOriginalUri() if needed
  router.navigate(['/login']);
}

export const routes: Routes = [
    
    {path:'products/:id',component:ProductDetailsComponent},
    {path:'search/:keyword',component:ProductListComponent},
    {path:'category/:id',component:ProductListComponent},
    {path:'category',component:ProductListComponent},
    {path:'products',component:ProductListComponent},
    {path:'cart-details',component:CartDetailsComponent},
    {path:'checkout',component:CheckoutComponent},
    {path:'login/callback',component:OktaCallbackComponent},
    {path:'members',component:MembersPageComponent ,canActivate:[OktaAuthGuard],
         data:{
         onAuthRequired: (oktaAuth: any, injector: { get: (arg0: typeof Router) => any; }) => {
      const router = injector.get(Router);
      console.log(router)
      router.navigate(['/login']);
    }
        }
        },
    {path:'login',component:LoginComponent},
    {path:'', redirectTo:'/products',pathMatch:'full'},
    {path:'**',redirectTo:'/products',pathMatch:'full'},


];
