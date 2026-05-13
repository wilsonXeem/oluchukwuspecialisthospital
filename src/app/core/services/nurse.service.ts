import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class NurseService {
  private api = `${environment.apiUrl}/nurse`;

  constructor(private http: HttpClient) {}

  getDashboard(): Observable<any> {
    return this.http.get(`${this.api}/dashboard`);
  }

  getWardPatients(wardId?: string): Observable<any> {
    const params = wardId ? `?wardId=${wardId}` : '';
    return this.http.get(`${this.api}/ward-patients${params}`);
  }

  getPatientVitals(patientId: string): Observable<any> {
    return this.http.get(`${this.api}/patients/${patientId}/vitals`);
  }

  recordVitals(patientId: string, data: any): Observable<any> {
    return this.http.post(`${this.api}/patients/${patientId}/vitals`, data);
  }

  getPatientCare(patientId: string): Observable<any> {
    return this.http.get(`${this.api}/patients/${patientId}/care`);
  }
}
