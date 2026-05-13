import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HOSPITAL, SERVICES, WHY_CHOOSE_US } from '../../core/constants/hospital.constants';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  hospital = HOSPITAL;
  services = SERVICES;
  whyChooseUs = WHY_CHOOSE_US;
  constructor(private router: Router) {}
  goToBooking(): void { this.router.navigate(['/booking']); }
  goToContact(): void { this.router.navigate(['/contact']); }
}
