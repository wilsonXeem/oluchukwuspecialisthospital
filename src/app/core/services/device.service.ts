import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Device {
  id: string;
  name: string;
  type: string;
  browser: string;
  os: string;
  lastActive: Date;
  isCurrent: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  constructor(private api: ApiService) {}

  getDevices(): Observable<Device[]> {
    return this.api.get('/auth/devices');
  }

  revokeDevice(deviceId: string): Observable<any> {
    return this.api.delete(`/auth/devices/${deviceId}`);
  }

  getCurrentDeviceInfo(): any {
    const ua = navigator.userAgent;
    return {
      browser: this.getBrowser(ua),
      os: this.getOS(ua),
      type: this.getDeviceType(ua),
      name: `${this.getBrowser(ua)} on ${this.getOS(ua)}`
    };
  }

  private getBrowser(ua: string): string {
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari')) return 'Safari';
    if (ua.includes('Edge')) return 'Edge';
    return 'Unknown';
  }

  private getOS(ua: string): string {
    if (ua.includes('Windows')) return 'Windows';
    if (ua.includes('Mac')) return 'macOS';
    if (ua.includes('Linux')) return 'Linux';
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('iOS')) return 'iOS';
    return 'Unknown';
  }

  private getDeviceType(ua: string): string {
    if (/Mobi|Android/i.test(ua)) return 'Mobile';
    if (/Tablet|iPad/i.test(ua)) return 'Tablet';
    return 'Desktop';
  }
}