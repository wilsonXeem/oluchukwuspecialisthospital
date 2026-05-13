import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private endpoint = '/patients';

  constructor(private api: ApiService) {}

  createPatient(patient: Partial<Patient>): Observable<any> {
    return this.api.post(this.endpoint, patient);
  }

  getPatients(params?: { search?: string; limit?: number; offset?: number }): Observable<any> {
    return this.api.get(this.endpoint, params);
  }

  getPatientById(id: string): Observable<any> {
    return this.api.get(`${this.endpoint}/${id}`);
  }

  updatePatient(id: string, patient: Partial<Patient>): Observable<any> {
    return this.api.put(`${this.endpoint}/${id}`, patient);
  }

  getPatientMedicalHistory(id: string): Observable<any> {
    return this.api.get(`${this.endpoint}/${id}/medical-history`);
  }

  addPatientVitals(id: string, vitals: any): Observable<any> {
    return this.api.post(`${this.endpoint}/${id}/vitals`, vitals);
  }

  addPatientAllergy(id: string, allergy: any): Observable<any> {
    return this.api.post(`${this.endpoint}/${id}/allergies`, allergy);
  }

  addPatientCondition(id: string, condition: any): Observable<any> {
    return this.api.post(`${this.endpoint}/${id}/conditions`, condition);
  }

  getPatientStats(): Observable<any> {
    return this.api.get(`${this.endpoint}/stats/overview`);
  }

  deletePatient(id: string): Observable<any> {
    return this.api.delete(`${this.endpoint}/${id}`);
  }

  deletePatients(ids: string[]): Observable<any> {
    return this.bulkDeletePatients(ids);
  }

  bulkDeletePatients(ids: string[]): Observable<any> {
    return this.api.post(`${this.endpoint}/bulk-delete`, { patientIds: ids });
  }

  exportPatients(params: any): Observable<any> {
    return this.api.post(`${this.endpoint}/export`, params);
  }

  bulkUpdatePatients(ids: string[], updates: any): Observable<any> {
    return this.api.put(`${this.endpoint}/bulk-update`, { patientIds: ids, updates });
  }

  searchPatientsAdvanced(filters: any): Observable<any> {
    return this.api.get(`${this.endpoint}/search`, filters);
  }

  searchPatients(query: string): Observable<any> {
    return this.api.get(`${this.endpoint}/search`, { q: query, limit: 10 });
  }

  getDoctors(): Observable<any> {
    return this.api.get('/doctors');
  }

  getWards(): Observable<any> {
    return this.api.get('/wards');
  }

  getBedsByWard(wardId: string): Observable<any> {
    return this.api.get(`/wards/${wardId}/beds`);
  }
}