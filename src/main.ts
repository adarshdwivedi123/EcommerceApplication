/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import OktaAuth from '@okta/okta-auth-js';
import myAppConfig from './app/config/my-app-config';
import { ProductService } from './app/services/product.service';
import { OKTA_CONFIG } from '@okta/okta-angular';

const oktaAuth = new OktaAuth(myAppConfig.oidc);

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    ProductService,{provide:OKTA_CONFIG,useValue:{oktaAuth}}    ]
}).catch((err) => console.error(err));
