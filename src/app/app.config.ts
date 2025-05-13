import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(),
      importProvidersFrom(OktaAuthModule), // ✅ Use NgModule in standalone
    {
      provide: OKTA_CONFIG,
      useValue: { OktaAuth }
    }
  ]
};


