import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Consultation {
  id?: string;
  patientId: string;
  diagnosis: string;
  notes: string;
  recommendedTests?: string;
  status?: string;
  createdAt?: string;
  patientName?: string;
}

export interface Prescription {
  id?: string;
  consultationId: string;
  remarks?: string;
  items: PrescriptionItem[];
}

export interface PrescriptionItem {
  drugName: string;
  drugId?: string;
  dosageForm?: string;
  route?: string;
  dosage: string;
  frequency: string;
  duration: string;
  timing?: string;
  indication?: string;
  quantityPrescribed: number;
  instructions?: string;
  asNeeded?: boolean;
  maxDailyDose?: string;
}

export interface Vitals {
  patientId: string;
  bloodPressure: string;
  temperature: number;
  pulse: number;
  respiration: number;
  weight: number;
  height: number;
}

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = `${environment.apiUrl}/doctors`;

  constructor(private http: HttpClient) {}

  // Consultations
  createConsultation(consultation: Consultation): Observable<any> {
    return this.http.post(`${this.apiUrl}/consultations`, consultation);
  }

  getConsultations(limit = 50, offset = 0): Observable<any> {
    return this.http.get(`${this.apiUrl}/consultations?limit=${limit}&offset=${offset}`);
  }

  getConsultationDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/consultations/${id}`);
  }

  // Prescriptions
  createPrescription(prescription: Prescription): Observable<any> {
    return this.http.post(`${this.apiUrl}/prescriptions`, prescription);
  }

  getPrescriptions(limit = 50, offset = 0): Observable<any> {
    return this.http.get(`${this.apiUrl}/prescriptions?limit=${limit}&offset=${offset}`);
  }

  // Vitals
  recordVitals(vitals: Vitals): Observable<any> {
    return this.http.post(`${this.apiUrl}/vitals`, vitals);
  }

  getPatientVitals(patientId: string, limit = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}/vitals/${patientId}?limit=${limit}`);
  }

  // Patient History
  getPatientHistory(patientId: string, limit = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}/patients/${patientId}/history?limit=${limit}`);
  }

  // Lab Requests
  createLabRequests(data: { consultationId: string; patientId: string; tests: string[] }): Observable<any> {
    return this.http.post(`${this.apiUrl}/lab-requests`, data);
  }

  // Appointments
  getAppointments(date?: string, status?: string, limit = 50, offset = 0): Observable<any> {
    let url = `${this.apiUrl}/appointments?limit=${limit}&offset=${offset}`;
    if (date) url += `&date=${date}`;
    if (status) url += `&status=${status}`;
    return this.http.get(url);
  }

  updateAppointmentStatus(id: string, status: string, notes?: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/appointments/${id}/status`, { status, notes });
  }

  // Additional methods
  updateConsultation(id: string, consultation: Consultation): Observable<any> {
    return this.http.put(`${this.apiUrl}/consultations/${id}`, consultation);
  }

  getPrescriptionDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/prescriptions/${id}`);
  }

  updatePrescription(id: string, prescription: Prescription): Observable<any> {
    return this.http.put(`${this.apiUrl}/prescriptions/${id}`, prescription);
  }

  cancelPrescription(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/prescriptions/${id}/cancel`, {});
  }

  // Dashboard stats
  getDashboardStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard`);
  }

  // Drug search for prescriptions
  searchDrugs(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/drugs/search?q=${query}`);
  }

  // Print prescription
  getPrescriptionPrint(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/prescriptions/${id}/print`);
  }

  // Get patient vitals history
  getPatientVitalsHistory(patientId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/patients/${patientId}/vitals`);
  }

  // Search patients (if not available in patient service)
  searchPatients(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/patients/search?q=${query}`);
  }

  // Get today's appointments count
  getTodayAppointmentsCount(): Observable<any> {
    const today = new Date().toISOString().split('T')[0];
    return this.http.get(`${this.apiUrl}/appointments/count?date=${today}`);
  }

  // Get total consultations count
  getTotalConsultationsCount(): Observable<any> {
    return this.http.get(`${this.apiUrl}/consultations/count`);
  }

  // Get total prescriptions count
  getTotalPrescriptionsCount(): Observable<any> {
    return this.http.get(`${this.apiUrl}/prescriptions/count`);
  }

  getLabRequests(limit = 50, offset = 0): Observable<any> {
    return this.http.get(`${this.apiUrl}/lab-requests?limit=${limit}&offset=${offset}`);
  }

  // Lab Results
  getLabResults(patientId?: string, limit = 50, offset = 0): Observable<any> {
    let url = `${this.apiUrl}/lab-results?limit=${limit}&offset=${offset}`;
    if (patientId) url += `&patientId=${patientId}`;
    return this.http.get(url);
  }

  getLabResultDetails(resultId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/lab-results/${resultId}`);
  }

  getPatientLabResults(patientId: string, limit = 20): Observable<any> {
    return this.http.get(`${this.apiUrl}/patients/${patientId}/lab-results?limit=${limit}`);
  }

  getLabRequestStatus(requestId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/lab-requests/${requestId}/status`);
  }

  // Missing methods for appointment scheduler
  scheduleAppointment(appointmentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/appointments`, appointmentData);
  }

  // Missing methods for dashboard
  getPatientQueue(): Observable<any> {
    return this.http.get(`${this.apiUrl}/patient-queue`);
  }

  // Missing methods for enhanced consultation form
  getPatientById(patientId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/patients/${patientId}`);
  }

  // Missing methods for referral form
  createReferral(referralData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/referrals`, referralData);
  }

  // Missing methods for lab result details
  getLabTrendingData(resultId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/lab-results/${resultId}/trending`);
  }

  requestLabFollowUp(resultId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/lab-results/${resultId}/follow-up`, {});
  }
}
