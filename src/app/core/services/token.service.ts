import { Injectable } from '@angular/core';

const TOKEN_KEY = 'hms_token';
const REFRESH_KEY = 'hms_refresh_token';

@Injectable({ providedIn: 'root' })
export class TokenService {

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  setRefreshToken(token: string): void {
    localStorage.setItem(REFRESH_KEY, token);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_KEY);
  }

  clearTokens(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
  }

  isTokenExpired(token?: string): boolean {
    const t = token || this.getToken();
    if (!t) return true;
    try {
      const payload = JSON.parse(atob(t.split('.')[1]));
      return Date.now() >= (payload.exp * 1000) - 60000;
    } catch {
      return true;
    }
  }

  getTokenPayload(token?: string): any {
    const t = token || this.getToken();
    if (!t) return null;
    try {
      return JSON.parse(atob(t.split('.')[1]));
    } catch {
      return null;
    }
  }

  getTimeUntilExpiration(token?: string): number {
    const t = token || this.getToken();
    if (!t) return 0;
    try {
      const payload = JSON.parse(atob(t.split('.')[1]));
      return Math.max(0, (payload.exp * 1000) - Date.now());
    } catch {
      return 0;
    }
  }

  getTokenExpirationDate(token?: string): Date | null {
    const payload = this.getTokenPayload(token);
    if (!payload?.exp) return null;
    return new Date(payload.exp * 1000);
  }
}
