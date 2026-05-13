import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { TokenService } from './token.service';
import { User, LoginRequest, AuthResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private endpoint = '/auth';
  private loginAttempts = 0;
  private readonly MAX_LOGIN_ATTEMPTS = 5;
  private lockoutTime = 0;

  constructor(
    private api: ApiService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.initializeUser();
  }

  private initializeUser(): void {
    // Restore session from token if valid
    const token = this.tokenService.getToken();
    if (token && !this.tokenService.isTokenExpired(token)) {
      const payload = this.tokenService.getTokenPayload(token);
      if (payload) {
        this.currentUserSubject.next({
          id: payload.id,
          email: payload.email,
          role: this.normalizeRole(payload.role),
          firstName: payload.firstName || '',
          lastName: payload.lastName || ''
        } as any);
      }
    }
  }

  register(userData: any): Observable<any> {
    return this.api.post(`${this.endpoint}/register`, userData);
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    if (this.isAccountLocked()) {
      return throwError(() => ({ 
        error: { message: `Account locked. Try again in ${Math.ceil((this.lockoutTime - Date.now()) / 60000)} minutes.` }
      }));
    }

    return this.api.post<any>(`${this.endpoint}/login`, credentials).pipe(
      map(response => this.normalizeAuthResponse(response)),
      tap(response => {
        if (response.requiresMfa) return;
        if (!response.token || !response.user) {
          throw new Error('Login response did not include a user session');
        }
        this.handleLoginSuccess(response);
      }),
      catchError(error => {
        this.handleLoginFailure();
        return throwError(() => error);
      })
    );
  }

  handleLoginSuccess(response: AuthResponse): void {
    this.tokenService.setToken(response.token);
    if (response.refreshToken) {
      this.tokenService.setRefreshToken(response.refreshToken);
    }
    this.currentUserSubject.next({
      ...response.user,
      role: this.normalizeRole(response.user.role)
    });
    this.resetLoginAttempts();
  }

  private normalizeAuthResponse(response: any): AuthResponse {
    const payload = response?.data ?? response;
    if (!payload || typeof payload !== 'object') {
      throw new Error('Login response was empty');
    }

    const token = payload.token;
    const tokenPayload = token ? this.tokenService.getTokenPayload(token) : null;
    const user = payload.user ?? (tokenPayload ? {
      id: tokenPayload.id,
      email: tokenPayload.email,
      role: tokenPayload.role,
      firstName: tokenPayload.firstName || '',
      lastName: tokenPayload.lastName || ''
    } : null);

    return {
      ...payload,
      token,
      user: user ? {
        ...user,
        role: this.normalizeRole(user.role)
      } : user
    };
  }

  private normalizeRole(role: string | undefined | null): string {
    return (role || '').toString().trim().toLowerCase();
  }

  private handleLoginFailure(): void {
    this.loginAttempts++;
    if (this.loginAttempts >= this.MAX_LOGIN_ATTEMPTS) {
      this.lockoutTime = Date.now() + (15 * 60 * 1000); // 15 minutes lockout
    }
  }

  private resetLoginAttempts(): void {
    this.loginAttempts = 0;
    this.lockoutTime = 0;
  }

  private isAccountLocked(): boolean {
    return this.lockoutTime > Date.now();
  }

  forgotPassword(email: string): Observable<any> {
    return this.api.post(`${this.endpoint}/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.api.post(`${this.endpoint}/reset-password`, { token, newPassword });
  }

  verifyEmail(token: string): Observable<any> {
    return this.api.post(`${this.endpoint}/verify-email`, { token });
  }

  resendVerification(email: string): Observable<any> {
    return this.api.post(`${this.endpoint}/resend-verification`, { email });
  }

  getProfile(): Observable<any> {
    return this.api.get<any>(`${this.endpoint}/profile`).pipe(
      map((response: any) => response.data?.user ?? response)
    );
  }

  updateProfile(profileData: any): Observable<any> {
    return this.api.put(`${this.endpoint}/profile`, profileData);
  }

  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.api.post(`${this.endpoint}/change-password`, { currentPassword, newPassword });
  }

  refreshToken(): Observable<any> {
    return this.api.post(`${this.endpoint}/refresh-token`, {}).pipe(
      tap((response: any) => {
        if (response.token) {
          this.tokenService.setToken(response.token);
          if (response.refreshToken) {
            this.tokenService.setRefreshToken(response.refreshToken);
          }
        }
      }),
      catchError(error => {
        this.clearSession();
        return throwError(() => error);
      })
    );
  }

  logout(): Observable<any> {
    return this.api.post(`${this.endpoint}/logout`, {}).pipe(
      tap(() => this.clearSession()),
      catchError(() => {
        this.clearSession();
        return throwError(() => ({ error: { message: 'Logout failed' } }));
      })
    );
  }

  clearSession(): void {
    this.tokenService.clearTokens();
    this.currentUserSubject.next(null);
    this.resetLoginAttempts();
    this.router.navigate(['/admin/login']);
  }

  isAuthenticated(): boolean {
    const token = this.tokenService.getToken();
    return !!token && !this.tokenService.isTokenExpired(token);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  hasAnyRole(roles: string[]): boolean {
    const user = this.getCurrentUser();
    return user ? roles.includes(user.role) : false;
  }

  isAdmin(): boolean {
    return this.hasRole('admin');
  }

  isDoctor(): boolean {
    return this.hasRole('doctor');
  }

  isNurse(): boolean {
    return this.hasRole('nurse');
  }

  isPatient(): boolean {
    return this.hasRole('patient');
  }
}
