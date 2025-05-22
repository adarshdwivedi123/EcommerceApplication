// auth.interceptor.ts
import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { from, Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<any> => {
  return from(handleAsync(req, next));
};

async function handleAsync(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const oktaAuth = inject(OKTA_AUTH) as OktaAuth;
  const secureEndpoints = ['http://localhost:8080/api/orders'];

  let authReq = req;

  if (secureEndpoints.some(url => req.urlWithParams.includes(url))) {
    const accessToken = await oktaAuth.getAccessToken();
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  return await next(authReq).toPromise(); // Convert Observable to Promise inside async context
}
