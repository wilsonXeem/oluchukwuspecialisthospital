import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const token = this.tokenService.getToken();

    if (!token || this.tokenService.isTokenExpired(token)) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    // Read role directly from token payload — no async needed
    const payload = this.tokenService.getTokenPayload(token);
    if (payload?.role === 'admin') {
      return true;
    }

    // Authenticated but not admin — send to dashboard
    this.router.navigate(['/dashboard']);
    return false;
  }
}
