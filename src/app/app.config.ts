import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import { authInterceptor } from './services/auth.interceptor';



export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(),
    provideHttpClient(withInterceptors([authInterceptor])),
      importProvidersFrom(OktaAuthModule), // ✅ Use NgModule in standalone
    {
      provide: OKTA_CONFIG,
      useValue: { OktaAuth }
    }
  ]
};


