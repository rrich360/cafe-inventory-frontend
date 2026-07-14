import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const expectedRoles: string[] = route.data['expectedRole'];
      if (expectedRoles) {
        const role = this.getRole();
        if (!expectedRoles.includes(role)) {
          this.router.navigate(['/cafe/dashboard']);
          return false;
        }
      }
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }

  getRole(): string {
    try {
      const token = localStorage.getItem('token');
      if (!token) return '';
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      return payload.role || '';
    } catch {
      return '';
    }
  }

  getEmail(): string {
    try {
      const token = localStorage.getItem('token');
      if (!token) return '';
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      return payload.sub || '';
    } catch {
      return '';
    }
  }
}
