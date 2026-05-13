import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PharmacyService {
  private endpoint = '/pharmacy';

  constructor(private api: ApiService, private http: HttpClient) {}

  // Dashboard methods
  getDashboardStats(): Observable<any> {
    return this.api.get(`${this.endpoint}/dashboard/stats`);
  }

  // Prescription methods
  getPrescriptions(params?: any): Observable<any> {
    return this.api.get(`${this.endpoint}/prescriptions`, params);
  }

  getPrescriptionById(id: string): Observable<any> {
    return this.api.get(`${this.endpoint}/prescriptions/${id}`);
  }

  getPrescriptionDetails(id: string): Observable<any> {
    return this.api.get(`${this.endpoint}/prescriptions/${id}/details`);
  }

  dispensePrescription(data: any): Observable<any> {
    return this.api.post(`${this.endpoint}/prescriptions/dispense`, data);
  }

  // Stock methods
  getStockLevels(params?: any): Observable<any> {
    return this.api.get(`${this.endpoint}/stock`, params);
  }

  getAvailableBatches(drugId: string): Observable<any> {
    return this.api.get(`${this.endpoint}/stock/${drugId}/batches`);
  }

  // Dispensation methods
  getDispensations(params?: any): Observable<any> {
    return this.api.get(`${this.endpoint}/dispensations`, params);
  }

  createDispensation(dispensation: any): Observable<any> {
    return this.api.post(`${this.endpoint}/dispensations`, dispensation);
  }

  // Drug catalog methods
  getDrugCatalog(params?: any): Observable<any> {
    return this.api.get(`${this.endpoint}/drugs`, params);
  }

  addDrugToCatalog(drug: any): Observable<any> {
    return this.api.post(`${this.endpoint}/drugs`, drug);
  }

  updateDrug(id: string, drug: any): Observable<any> {
    return this.api.put(`${this.endpoint}/drugs/${id}`, drug);
  }

  // Pharmacist observation methods
  getPharmacistObservations(params?: any): Observable<any> {
    return this.api.get(`${this.endpoint}/observations`, params);
  }

  addPharmacistObservation(observation: any): Observable<any> {
    return this.api.post(`${this.endpoint}/observations`, observation);
  }

  // Drug interaction methods
  checkDrugInteractions(drugs: string[]): Observable<any> {
    return this.api.post(`${this.endpoint}/interactions/check`, { drugs });
  }

  // Controlled substances methods
  getControlledSubstances(): Observable<any> {
    return this.api.get(`${this.endpoint}/controlled-substances`);
  }

  getControlledSubstanceRecords(params?: any): Observable<any> {
    return this.api.get(`${this.endpoint}/controlled-substances/records`, params);
  }

  addControlledSubstanceRecord(data: any): Observable<any> {
    return this.api.post(`${this.endpoint}/controlled-substances/records`, data);
  }

  recordControlledSubstanceDispensation(data: any): Observable<any> {
    return this.api.post(`${this.endpoint}/controlled-substances/dispense`, data);
  }

  // Drug interaction methods
  getCommonInteractions(): Observable<any> {
    return this.api.get(`${this.endpoint}/interactions/common`);
  }

  // Reports methods
  getPharmacyReports(params?: any): Observable<any> {
    return this.api.get(`${this.endpoint}/reports`, params);
  }

  generateReport(params: any): Observable<any> {
    return this.api.post(`${this.endpoint}/reports/generate`, params);
  }

  exportReport(params: any): Observable<Blob> {
    return this.http.post(`${this.api.getBaseUrl()}${this.endpoint}/reports/export`, params, { responseType: 'blob' });
  }

  // Validation methods
  validatePrescription(id: string): Observable<any> {
    return this.api.post(`${this.endpoint}/prescriptions/${id}/validate`, {});
  }
}