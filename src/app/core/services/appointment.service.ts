import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private endpoint = '/appointments';

  constructor(private api: ApiService) {}

  getAppointments(params?: { date?: string; status?: string; doctorId?: string }): Observable<any> {
    return this.api.get(this.endpoint, params);
  }

  createAppointment(data: any): Observable<any> {
    return this.api.post(this.endpoint, data);
  }

  updateStatus(id: string, status: string, notes?: string): Observable<any> {
    return this.api.put(`${this.endpoint}/${id}/status`, { status, notes });
  }

  reschedule(id: string, appointmentDate: string, appointmentTime: string, reason?: string): Observable<any> {
    return this.api.put(`${this.endpoint}/${id}/reschedule`, { appointmentDate, appointmentTime, reason });
  }

  cancel(id: string, reason?: string): Observable<any> {
    return this.api.put(`${this.endpoint}/${id}/cancel`, { reason });
  }

  getDoctors(): Observable<any> {
    return this.api.get(`${this.endpoint}/doctors`);
  }

  getAutoAssignedDoctor(date: string, time: string): Observable<any> {
    return this.api.get(`${this.endpoint}/auto-assign`, { date, time });
  }

  getAvailableSlots(doctorId: string, date: string): Observable<any> {
    return this.api.get(`${this.endpoint}/availability/${doctorId}/${date}`);
  }
}
