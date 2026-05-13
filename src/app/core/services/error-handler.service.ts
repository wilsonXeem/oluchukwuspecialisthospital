import { Injectable, ErrorHandler } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {
  constructor(private notificationService: NotificationService) {}

  handleError(error: any): void {
    console.error('Global error handler:', error);
    
    let message = 'An unexpected error occurred';
    if (error?.message) {
      message = error.message;
    }
    
    this.notificationService.showError(message);
  }
}