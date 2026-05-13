import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  readonly icons = {
    // Contact & Communication
    phone: 'phone',
    email: 'email',
    location: 'location_on',
    schedule: 'schedule',
    directions: 'directions',
    
    // Medical & Healthcare
    medical: 'medical_services',
    hospital: 'local_hospital',
    emergency: 'emergency',
    pharmacy: 'local_pharmacy',
    lab: 'biotech',
    
    // Navigation & Actions
    home: 'home',
    info: 'info',
    contact: 'contact_mail',
    book: 'event_available',
    login: 'login',
    menu: 'menu',
    close: 'close',
    
    // Status & Feedback
    check: 'check_circle',
    error: 'error',
    warning: 'warning',
    loading: 'hourglass_empty',
    
    // General
    star: 'star',
    arrow_forward: 'arrow_forward',
    expand_more: 'expand_more',
    search: 'search'
  } as const;

  getIcon(name: keyof typeof this.icons): string {
    return this.icons[name];
  }
}