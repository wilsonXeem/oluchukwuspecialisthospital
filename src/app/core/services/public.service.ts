import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { CacheService } from './cache.service';

export interface FacilityInfo {
  id?: string;
  name?: string;
  type?: string;
  description?: string;
  mission?: string;
  vision?: string;
  services?: string[];
  departments?: string[];
  address?: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  operatingHours?: OperatingHours;
  emergencyContact?: string;
  aboutContent?: string;
  servicesOffered?: ServiceOffered[];
  logoUrl?: string;
  socialMediaLinks?: SocialMediaLinks;
}

export interface OperatingHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
  emergency?: string;
}

export interface ServiceOffered {
  name: string;
  description?: string;
  icon?: string;
}

export interface SocialMediaLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
}

export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  department?: string;
  specialization?: string;
  isAvailable?: boolean;
}

export interface HospitalServices {
  services: string[];
  departments: string[];
}

export interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface AppointmentBooking {
  patientName: string;
  email: string;
  phone: string;
  doctorId: string;
  appointmentDate: string;
  appointmentTime: string;
  reason?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  constructor(private api: ApiService, private cache: CacheService) {}

  getFacilityInfo(): Observable<FacilityInfo> {
    return this.cache.cacheRequest('facility-info', this.api.get<FacilityInfo>('/public/facility-info'));
  }

  getAvailableDoctors(): Observable<Doctor[]> {
    return this.cache.cacheRequest('doctors', this.api.get<Doctor[]>('/public/doctors'));
  }

  getHospitalServices(): Observable<HospitalServices> {
    return this.cache.cacheRequest('services', this.api.get<HospitalServices>('/public/services'));
  }

  getAvailableSlots(doctorId: string, date: string): Observable<{availableSlots: string[]}> {
    return this.api.get<{availableSlots: string[]}>('/public/available-slots', { doctorId, date });
  }

  submitContact(data: ContactSubmission): Observable<{success: boolean, id: string, message: string}> {
    return this.api.post<{success: boolean, id: string, message: string}>('/public/contact', data);
  }

  bookAppointment(data: AppointmentBooking): Observable<{success: boolean, appointmentId: string, message: string}> {
    return this.api.post<{success: boolean, appointmentId: string, message: string}>('/public/book-appointment', data);
  }

  getDoctorFullName(doctor: Doctor): string {
    return `${doctor.firstName} ${doctor.lastName}`.trim();
  }

  formatOperatingHours(hours: OperatingHours): string[] {
    if (!hours) return [];
    const formatted: string[] = [];
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    
    days.forEach(day => {
      if (hours[day as keyof OperatingHours]) {
        formatted.push(`${day.charAt(0).toUpperCase() + day.slice(1)}: ${hours[day as keyof OperatingHours]}`);
      }
    });
    
    if (hours.emergency) {
      formatted.push(`Emergency: ${hours.emergency}`);
    }
    
    return formatted;
  }
}