import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebSocketService {
  connect(_token: string): void {}
  disconnect(): void {}
  isConnected(): Observable<boolean> { return of(false); }
  getNotifications(): Observable<any> { return of(null); }
  getLabStatusUpdates(): Observable<any> { return of(null); }
  getCriticalAlerts(): Observable<any> { return of(null); }
  getDashboardData(): Observable<any> { return of(null); }
  getDataChanges(): Observable<any> { return of(null); }
  requestRefresh(): void {}
  markNotificationAsRead(_id: string): void {}
}
