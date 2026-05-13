import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface MfaStatus {
  enabled: boolean;
  backupCodes?: string[];
  qrCode?: string;
  secret?: string;
}

export interface MfaSetupResponse {
  qrCode: string;
  secret: string;
  backupCodes: string[];
}

@Injectable({
  providedIn: 'root'
})
export class MfaService {
  private apiUrl = `${environment.apiUrl}/auth/mfa`;

  constructor(private http: HttpClient) {}

  getMfaStatus(): Observable<MfaStatus> {
    return this.http.get<MfaStatus>(`${this.apiUrl}/status`);
  }

  setupMfa(): Observable<MfaSetupResponse> {
    return this.http.post<MfaSetupResponse>(`${this.apiUrl}/setup`, {});
  }

  verifyMfaSetup(token: string, secret: string): Observable<{ success: boolean; backupCodes: string[] }> {
    return this.http.post<{ success: boolean; backupCodes: string[] }>(`${this.apiUrl}/verify-setup`, { token, secret });
  }

  disableMfa(password: string): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(`${this.apiUrl}/disable`, { password });
  }

  generateBackupCodes(): Observable<string[]> {
    return this.http.post<string[]>(`${this.apiUrl}/backup-codes`, {});
  }

  verifyMfa(token: string): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(`${this.apiUrl}/verify`, { token });
  }
}