import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
  const token = sessionStorage.getItem('token');

  if (!token) {
    this.router.navigate(['/login']);
    return false;
  }

  // ❌ DO NOT check expiry here
  return true;
}


  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000; // exp is in seconds
      return Date.now() > exp;
    } catch (e) {
      // malformed token
      return true;
    }
  }
}
