import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreatePaymentRequest, PaymentRefundRequest } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = `${environment.apiUrl}/payments`;

  constructor(private http: HttpClient) {}

  createPayment(payment: CreatePaymentRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}`, payment);
  }

  getPayments(patientId?: string, status?: string, limit = 50, offset = 0, id?: string): Observable<any> {
    if (id) {
      return this.http.get(`${this.apiUrl}/${id}`);
    }
    let url = `${this.apiUrl}?limit=${limit}&offset=${offset}`;
    if (patientId) url += `&patientId=${patientId}`;
    if (status) url += `&status=${status}`;
    return this.http.get(url);
  }

  getPaymentByReference(referenceCode: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/reference/${referenceCode}`);
  }

  verifyPayment(id: string, status: 'approved' | 'rejected'): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/verify`, { status });
  }

  updatePaymentStatus(id: string, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/status`, { status });
  }

  processPayment(paymentId: string, paymentMethod: string, transactionId?: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/process`, { paymentId, paymentMethod, transactionId });
  }

  generateReceipt(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/receipt`);
  }

  getPaymentSummary(startDate?: string, endDate?: string): Observable<any> {
    let url = `${this.apiUrl}/summary`;
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (params.toString()) url += '?' + params.toString();
    return this.http.get(url);
  }

  refundPayment(id: string, refundData: PaymentRefundRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/refund`, refundData);
  }

  createPaymentIntent(amount: number, currency: string = 'NGN', gateway: string = 'paystack', metadata?: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/intent`, { amount, currency, gateway, metadata });
  }

  confirmPayment(paymentIntentId: string, paymentMethod: any, gateway: string = 'paystack'): Observable<any> {
    return this.http.post(`${this.apiUrl}/confirm`, { paymentIntentId, paymentMethod, gateway });
  }

  recordManualPayment(paymentId: string, method: 'cash' | 'transfer'): Observable<any> {
    return this.http.post(`${this.apiUrl}/process`, { paymentId, paymentMethod: method });
  }

  getSupportedGateways(): Observable<any> {
    return this.http.get(`${this.apiUrl}/gateways`);
  }
}