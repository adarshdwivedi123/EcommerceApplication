import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthRedirectServiceService {

   constructor(private router: Router) {}

  handleAuthRequired = () => {
    this.router.navigate(['/login']);
  };
}
