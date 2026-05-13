import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  autoLogout: number;
  showPatientPhotos: boolean;
  compactView: boolean;
}

export interface NotificationSettings {
  email: {
    appointments: boolean;
    labResults: boolean;
    prescriptions: boolean;
    systemAlerts: boolean;
    marketing: boolean;
  };
  sms: {
    appointments: boolean;
    emergencyAlerts: boolean;
    prescriptionReminders: boolean;
  };
  push: {
    enabled: boolean;
    appointments: boolean;
    messages: boolean;
    alerts: boolean;
  };
}

export interface SecuritySettings {
  sessionTimeout: number;
  requireReauth: boolean;
  logoutOnClose: boolean;
  emailOnLogin: boolean;
  blockSuspiciousLogin: boolean;
}

export interface FacilitySettings {
  name: string;
  licenseNumber: string;
  address: string;
  phone: string;
  email: string;
  timezone: string;
  currency: string;
  allowOnlineBooking: boolean;
  requireInsurance: boolean;
  operatingHours?: { [key: string]: { open: string; close: string; closed: boolean } };
}

export interface SystemSettings {
  passwordMinLength: number;
  sessionTimeout: number;
  requireMfa: boolean;
  enforcePasswordPolicy: boolean;
  backupFrequency: string;
  dataRetentionDays: number;
  enableAuditLog: boolean;
  autoArchive: boolean;
  maxUsers: number;
  maxFileSize: number;
  apiRateLimit: number;
  maxConcurrentSessions: number;
  enableSystemNotifications: boolean;
  enableEmailNotifications: boolean;
  enableSmsNotifications: boolean;
  maintenanceMode: string;
  maintenanceStartTime: string;
  maintenanceMessage: string;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private apiUrl = `${environment.apiUrl}/settings`;

  constructor(private http: HttpClient) {}

  // User Preferences
  getUserPreferences(): Observable<UserPreferences> {
    return this.http.get<UserPreferences>(`${this.apiUrl}/preferences`);
  }

  updateUserPreferences(preferences: UserPreferences): Observable<any> {
    return this.http.put(`${this.apiUrl}/preferences`, preferences);
  }

  // Notification Settings
  getNotificationSettings(): Observable<NotificationSettings> {
    return this.http.get<NotificationSettings>(`${this.apiUrl}/notifications`);
  }

  updateNotificationSettings(settings: NotificationSettings): Observable<any> {
    return this.http.put(`${this.apiUrl}/notifications`, settings);
  }

  // Security Settings
  getSecuritySettings(): Observable<SecuritySettings> {
    return this.http.get<SecuritySettings>(`${this.apiUrl}/security`);
  }

  updateSecuritySettings(settings: SecuritySettings): Observable<any> {
    return this.http.put(`${this.apiUrl}/security`, settings);
  }

  // Facility Settings (Admin only)
  getFacilitySettings(): Observable<FacilitySettings> {
    return this.http.get<FacilitySettings>(`${this.apiUrl}/facility`);
  }

  updateFacilitySettings(settings: FacilitySettings): Observable<any> {
    return this.http.put(`${this.apiUrl}/facility`, settings);
  }

  // System Settings (Admin only)
  getSystemSettings(): Observable<SystemSettings> {
    return this.http.get<SystemSettings>(`${this.apiUrl}/system`);
  }

  updateSystemSettings(settings: SystemSettings): Observable<any> {
    return this.http.put(`${this.apiUrl}/system`, settings);
  }
}