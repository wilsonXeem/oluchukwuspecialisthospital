import { environment } from '../../../environments/environment';

export const APP_CONSTANTS = {
  API_BASE_URL: environment.apiUrl,
  APP_NAME: 'Hospital Management System',
  VERSION: '1.0.0',
  
  ROLES: {
    ADMIN: 'admin',
    DOCTOR: 'doctor',
    NURSE: 'nurse',
    RECEPTIONIST: 'receptionist',
    PHARMACIST: 'pharmacist',
    LAB_TECHNICIAN: 'lab_technician'
  },
  
  APPOINTMENT_STATUS: {
    SCHEDULED: 'scheduled',
    CONFIRMED: 'confirmed',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled'
  },
  
  PAYMENT_STATUS: {
    PENDING: 'pending',
    PAID: 'paid',
    PARTIAL: 'partial',
    REFUNDED: 'refunded'
  }
};