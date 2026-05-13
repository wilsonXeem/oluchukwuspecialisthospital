import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Check if user is authenticated first
    if (!this.authService.isAuthenticated()) {
      return this.router.createUrlTree(['/auth/login'], {
        queryParams: { returnUrl: route.url.join('/') }
      });
    }

    const requiredRoles = route.data['roles'] as string[];
    const requiredRole = route.data['role'] as string;
    const user = this.authService.getCurrentUser();
    
    if (!user) {
      return this.router.createUrlTree(['/auth/login']);
    }

    // Support both single role and multiple roles
    const rolesToCheck = requiredRoles || (requiredRole ? [requiredRole] : []);
    
    // If no specific roles required, just check authentication
    if (rolesToCheck.length === 0) {
      return true;
    }
    
    // Check if user has any of the required roles
    const hasRequiredRole = rolesToCheck.includes(user.role);
    
    if (!hasRequiredRole) {
      // Redirect based on user's actual role
      switch (user.role) {
        case 'admin':
          return this.router.createUrlTree(['/admin']);
        case 'doctor':
          return this.router.createUrlTree(['/doctor']);
        case 'nurse':
          return this.router.createUrlTree(['/dashboard']);
        case 'patient':
          return this.router.createUrlTree(['/patient']);
        default:
          return this.router.createUrlTree(['/dashboard']);
      }
    }
    
    return true;
  }
}