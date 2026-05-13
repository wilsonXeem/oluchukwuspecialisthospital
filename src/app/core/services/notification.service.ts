import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = `${environment.apiUrl}/notifications`;
  private notificationsSubject = new BehaviorSubject<any[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getDoctorNotifications(): Observable<any> {
    return this.http.get(`${this.apiUrl}/doctor`);
  }

  markAsRead(notificationId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${notificationId}/read`, {});
  }

  createNotification(notification: any): Observable<any> {
    return this.http.post(this.apiUrl, notification);
  }

  getUnreadCount(): Observable<any> {
    return this.http.get(`${this.apiUrl}/unread-count`);
  }

  // Document-specific notification methods
  markAllAsRead(): Observable<any> {
    return this.http.put(`${this.apiUrl}/mark-all-read`, {});
  }

  dismissNotification(notificationId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${notificationId}`);
  }

  updateSettings(settings: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/settings`, settings);
  }

  getNotificationUpdates(): Observable<any> {
    // In a real implementation, this would use WebSocket or Server-Sent Events
    return new Observable(observer => {
      // Simulate real-time updates
      const interval = setInterval(() => {
        if (Math.random() > 0.95) { // 5% chance of new notification
          observer.next({
            type: 'new_notification',
            notification: {
              id: Date.now().toString(),
              type: 'new_document',
              title: 'New Document Uploaded',
              message: 'A new document has been uploaded to the system',
              priority: 'medium',
              createdAt: new Date(),
              read: false
            }
          });
        }
      }, 10000); // Check every 10 seconds
      
      return () => clearInterval(interval);
    });
  }

  // Document expiration notifications
  scheduleExpirationAlert(documentId: string, expirationDate: Date, reminderDays: number = 7): Observable<any> {
    return this.http.post(`${this.apiUrl}/document-expiration`, {
      documentId,
      expirationDate,
      reminderDays
    });
  }

  // Storage quota notifications
  checkStorageQuota(): Observable<any> {
    return this.http.get(`${this.apiUrl}/storage-quota`);
  }
}