import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Admission, AdmissionDetails, AdmissionStats, RoomCharges } from '../models/admission.model';

@Injectable({
  providedIn: 'root'
})
export class AdmissionService {
  private endpoint = '/admissions';

  constructor(private api: ApiService) {}

  createAdmission(data: any): Observable<{ admission: Admission }> {
    return this.api.post(`${this.endpoint}`, data);
  }

  getAdmissions(params?: any): Observable<{ admissions: Admission[] }> {
    return this.api.get(`${this.endpoint}`, params);
  }

  getAdmissionById(id: string): Observable<{ admission: AdmissionDetails }> {
    return this.api.get(`${this.endpoint}/${id}`);
  }

  dischargePatient(id: string, data: any): Observable<{ admission: Admission }> {
    return this.api.patch(`${this.endpoint}/${id}/discharge`, data);
  }

  transferPatient(id: string, data: any): Observable<{ admission: Admission }> {
    return this.api.patch(`${this.endpoint}/${id}/transfer`, data);
  }

  getAdmissionStats(): Observable<AdmissionStats> {
    return this.api.get(`${this.endpoint}/stats`);
  }

  getInpatientConsultations(id: string): Observable<{ consultations: any[] }> {
    return this.api.get(`${this.endpoint}/${id}/consultations`);
  }

  createInpatientConsultation(id: string, data: any): Observable<{ consultation: any }> {
    return this.api.post(`${this.endpoint}/${id}/consultations`, data);
  }

  calculateRoomCharges(id: string): Observable<{ charges: any }> {
    return this.api.get(`${this.endpoint}/${id}/charges/calculate`);
  }

  createRoomCharges(id: string): Observable<{ charges: RoomCharges }> {
    return this.api.post(`${this.endpoint}/${id}/charges`, {});
  }

  getRoomCharges(id: string): Observable<{ charges: RoomCharges[] }> {
    return this.api.get(`${this.endpoint}/${id}/charges`);
  }
}