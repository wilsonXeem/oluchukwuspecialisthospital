import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface LabRequest {
  id?: string;
  consultationId?: string;
  patientId: string;
  testName: string;
  assignedLabId?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  requestedBy?: string;
  createdAt?: Date;
}

export interface LabResult {
  id?: string;
  requestId: string;
  resultText?: string;
  resultFileUrl?: string;
  uploadedBy?: string;
  createdAt?: Date;
}

export interface TestCatalog {
  id: string;
  name: string;
  testName: string;
  description: string;
  normalRange: string;
  unit: string;
  category: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class LabService {
  private apiUrl = `${environment.apiUrl}/lab`;

  constructor(private http: HttpClient) {}

  // Lab Requests
  createLabRequest(request: LabRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/requests`, request);
  }

  getLabRequests(status?: string, limit = 50, offset = 0): Observable<any> {
    let url = `${this.apiUrl}/requests?limit=${limit}&offset=${offset}`;
    if (status) url += `&status=${status}`;
    return this.http.get(url);
  }

  updateRequestStatus(id: string, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/requests/${id}/status`, { status });
  }

  // Lab Results
  uploadLabResult(result: LabResult): Observable<any> {
    return this.http.post(`${this.apiUrl}/results`, result);
  }

  getLabResults(patientId: string, limit = 50, offset = 0): Observable<any> {
    return this.http.get(`${this.apiUrl}/results/${patientId}?limit=${limit}&offset=${offset}`);
  }

  // Test Catalog
  getTestCatalog(): Observable<any> {
    return this.http.get(`${this.apiUrl}/test-catalog`);
  }

  // File Upload
  uploadResultFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/upload-result`, formData);
  }

  // Bulk Operations
  createBulkLabRequests(data: { patientId: string; tests: string[]; priority?: string; notes?: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/requests/bulk`, data);
  }

  // Critical Results
  getCriticalResults(limit = 20, offset = 0): Observable<any> {
    return this.http.get(`${this.apiUrl}/results/critical?limit=${limit}&offset=${offset}`);
  }

  // Request Details
  getLabRequestDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/requests/${id}`);
  }

  getAllLabResults(filters?: { status?: string; dateFrom?: string; patientId?: string }): Observable<any> {
    let url = `${this.apiUrl}/results/all`;
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom);
    if (filters?.patientId) params.append('patientId', filters.patientId);
    if (params.toString()) url += '?' + params.toString();
    return this.http.get(url);
  }

  getWorklist(): Observable<any> {
    return this.http.get(`${this.apiUrl}/worklist`);
  }

  collectSample(requestId: string, data: { sampleType: string; notes?: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/requests/${requestId}/collect`, data);
  }

  getPatientLabHistory(patientId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/patient/${patientId}/history`);
  }

  getDailyStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats/daily`);
  }

  // Analytics methods
  getPerformanceMetrics(period = '7'): Observable<any> {
    return this.http.get(`${this.apiUrl}/analytics/performance?period=${period}`);
  }

  getTurnaroundAnalysis(): Observable<any> {
    return this.http.get(`${this.apiUrl}/analytics/turnaround`);
  }

  // Quality Control Methods
  getSampleTracking(barcode?: string): Observable<any> {
    const url = barcode ? `${this.apiUrl}/quality-control/samples/${barcode}` : `${this.apiUrl}/quality-control/samples`;
    return this.http.get(url);
  }

  getEquipmentCalibration(): Observable<any> {
    return this.http.get(`${this.apiUrl}/quality-control/equipment`);
  }

  recordCalibration(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/quality-control/calibration`, data);
  }

  getQualityAssuranceChecks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/quality-control/qa-checks`);
  }

  submitQAChecklist(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/quality-control/qa-checklist`, data);
  }

  // External Lab Integration Methods
  getExternalLabConfigurations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/external-labs/configurations`);
  }

  saveExternalLabConfig(config: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/external-labs/configurations`, config);
  }

  testExternalLabConnection(labId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/external-labs/${labId}/test-connection`, {});
  }

  sendOrdersToExternalLab(orders: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/external-labs/send-orders`, { orders });
  }

  syncExternalLabResults(): Observable<any> {
    return this.http.post(`${this.apiUrl}/external-labs/sync-results`, {});
  }

  getExternalLabStatus(): Observable<any> {
    return this.http.get(`${this.apiUrl}/external-labs/status`);
  }

  // Template Methods
  getResultTemplates(): Observable<any> {
    return this.http.get(`${this.apiUrl}/templates`);
  }

  saveResultTemplate(template: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/templates`, template);
  }

  deleteResultTemplate(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/templates/${id}`);
  }
}