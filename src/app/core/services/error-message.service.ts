import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {
  private readonly errorMessages: { [key: string]: string } = {
    'INVALID_CREDENTIALS': 'Invalid email or password. Please try again.',
    'ACCOUNT_LOCKED': 'Account temporarily locked due to multiple failed attempts.',
    'EMAIL_NOT_FOUND': 'No account found with this email address.',
    'EMAIL_ALREADY_EXISTS': 'An account with this email already exists.',
    'WEAK_PASSWORD': 'Password does not meet security requirements.',
    'NETWORK_ERROR': 'Connection failed. Please check your internet connection.',
    'SERVER_ERROR': 'Server temporarily unavailable. Please try again later.',
    'VALIDATION_ERROR': 'Please check your input and try again.',
    'TOKEN_EXPIRED': 'Your session has expired. Please log in again.',
    'UNAUTHORIZED': 'You are not authorized to perform this action.'
  };

  getUserFriendlyMessage(error: any): string {
    if (typeof error === 'string') {
      return this.errorMessages[error] || error;
    }

    if (error?.error?.code) {
      return this.errorMessages[error.error.code] || error.error.message || 'An unexpected error occurred.';
    }

    if (error?.status === 0) {
      return this.errorMessages['NETWORK_ERROR'];
    }

    if (error?.status >= 500) {
      return this.errorMessages['SERVER_ERROR'];
    }

    if (error?.status === 401) {
      return this.errorMessages['UNAUTHORIZED'];
    }

    return error?.error?.message || error?.message || 'An unexpected error occurred.';
  }
}