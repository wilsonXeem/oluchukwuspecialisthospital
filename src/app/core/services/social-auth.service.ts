import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class SocialAuthService {
  private googleInitialized = false;

  constructor(private api: ApiService) {}

  initializeGoogle(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.googleInitialized) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.onload = () => {
        google.accounts.id.initialize({
          client_id: 'YOUR_GOOGLE_CLIENT_ID',
          callback: this.handleGoogleResponse.bind(this)
        });
        this.googleInitialized = true;
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  loginWithGoogle(): Observable<any> {
    return new Observable(observer => {
      this.initializeGoogle().then(() => {
        google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            observer.error('Google login cancelled');
          }
        });
      }).catch(err => observer.error(err));
    });
  }

  private handleGoogleResponse(response: any): void {
    this.api.post('/auth/google', { token: response.credential }).subscribe();
  }
}