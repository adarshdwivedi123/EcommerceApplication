import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import { from, lastValueFrom, Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService  implements HttpInterceptor {

  constructor(@Inject(OKTA_AUTH)private oktaAuth:OktaAuth) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request,next));
  }
   async handleAccess(request:HttpRequest<any>,next:HttpHandler):Promise<HttpEvent<any>> {
      // Only add  an acces token secure endpoints
      const theEndPoint=environment.luv2shopApiUrl+'orders'
      const  secureEndpoints=[theEndPoint];
      if(secureEndpoints.some(url => request.urlWithParams.includes(url))){
        //get access token
        const accessToken=this.oktaAuth.getAccessToken();
        //clone the request and add new header with access token
        //we are clone becoz request is immutable
        request =request.clone({
          setHeaders:{
            Authorization:'Bearer '+accessToken
          }
        });
      }
      return  await lastValueFrom(next.handle(request));
  }


}
