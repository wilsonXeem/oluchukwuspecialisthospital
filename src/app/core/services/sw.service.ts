import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceWorkerService {
  
  registerServiceWorker(): void {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    }
  }
}