import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ModuleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const requiredModule = route.data['module'];
    const requiredAction = route.data['action'] || 'read';

    return this.authService.getUserPermissions().pipe(
      map(permissions => {
        const modulePermissions = permissions[requiredModule];
        
        if (!modulePermissions || !modulePermissions.includes(requiredAction)) {
          this.router.navigate(['/unauthorized']);
          return false;
        }
        
        return true;
      })
    );
  }
}