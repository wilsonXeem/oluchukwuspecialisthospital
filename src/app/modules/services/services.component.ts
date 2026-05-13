import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HOSPITAL, SERVICES, SERVICE_CATEGORIES } from '../../core/constants/hospital.constants';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  hospital = HOSPITAL;
  services = SERVICES;
  categories = SERVICE_CATEGORIES;
  selectedCategory = 'all';

  constructor(private router: Router) {}

  get filteredServices() {
    if (this.selectedCategory === 'all') return this.services;
    return this.services.filter(s => s.category === this.selectedCategory);
  }

  goToService(slug: string): void { this.router.navigate(['/services', slug]); }
  goToBooking(): void { this.router.navigate(['/booking']); }
}
