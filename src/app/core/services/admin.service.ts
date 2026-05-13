import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  getUsers(search?: string, limit = 50, offset = 0): Observable<any> {
    const params: any = { limit, offset };
    if (search) params.search = search;
    return this.http.get(`${this.apiUrl}/users`, { params });
  }

  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, userData);
  }

  updateUser(id: string, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}`, userData);
  }

  deactivateUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }

  getFacilitySettings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/facility`);
  }

  updateFacilitySettings(settings: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/facility`, settings);
  }

  getActivityLogs(limit = 100, offset = 0): Observable<any> {
    return this.http.get(`${this.apiUrl}/logs`, { params: { limit, offset } });
  }

  getSystemStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats`);
  }

  getOperationsSummary(): Observable<any> {
    return this.http.get(`${this.apiUrl}/operations`);
  }

  // Ward management
  createWard(wardData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/wards`, wardData);
  }

  updateWard(id: string, wardData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/wards/${id}`, wardData);
  }

  deleteWard(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/wards/${id}`);
  }

  // Doctor schedules
  getSchedules(): Observable<any> {
    return this.http.get(`${this.apiUrl}/schedules`);
  }

  saveSchedules(schedules: any[]): Observable<any> {
    return this.http.put(`${this.apiUrl}/schedules`, { schedules });
  }

  // Doctor schedules (new /schedules API)
  getDoctorSchedules(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/schedules`);
  }

  getDoctorsForSchedule(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/schedules/doctors`);
  }

  createDoctorSchedule(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/schedules`, data);
  }

  updateDoctorSchedule(id: string, data: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/schedules/${id}`, data);
  }

  deleteDoctorSchedule(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/schedules/${id}`);
  }

  toggleDoctorSchedule(id: string): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/schedules/${id}/toggle`, {});
  }

  // Module toggles
  toggleModule(name: string, enabled: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/modules/toggle`, { name, enabled });
  }

  // Notification settings
  getNotificationSettings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/notification-settings`);
  }

  saveNotificationSettings(settings: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/notification-settings`, { notificationSettings: settings });
  }

  // Role Management
  getRoles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/roles`);
  }

  createRole(roleData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/roles`, roleData);
  }

  updateRole(id: string, roleData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/roles/${id}`, roleData);
  }

  deleteRole(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/roles/${id}`);
  }

  // Audit Logs (alias for activity logs)
  getAuditLogs(filters?: any): Observable<any> {
    const params: any = {};
    if (filters?.action) params.action = filters.action;
    if (filters?.date) params.date = filters.date;
    return this.http.get(`${this.apiUrl}/logs`, { params });
  }

  // Facility Management
  getFacilities(): Observable<any> {
    return this.http.get(`${this.apiUrl}/facilities`);
  }

  createFacility(facilityData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/facilities`, facilityData);
  }

  updateFacility(id: string, facilityData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/facilities/${id}`, facilityData);
  }

  deleteFacility(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/facilities/${id}`);
  }
}
