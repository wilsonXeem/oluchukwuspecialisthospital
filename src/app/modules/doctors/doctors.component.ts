import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicService } from '../../core/services/public.service';
import { HOSPITAL } from '../../core/constants/hospital.constants';

const MOCK_DOCTORS = [
  {
    id: '1', firstName: 'Dr.', lastName: 'Oluchukwu',
    department: 'Surgery & Endoscopy',
    specialization: 'Specialist Surgeon & Endoscopist',
    qualifications: 'MBBS, FWACS',
    bio: 'Lead surgeon and endoscopist with extensive experience in laparoscopic and open surgical procedures, upper GI endoscopy, and colonoscopy.',
    isAvailableForBooking: true
  }
];

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
  hospital = HOSPITAL;
  doctors: any[] = [];
  loading = true;

  constructor(private publicService: PublicService, private router: Router) {}

  ngOnInit(): void {
    this.publicService.getAvailableDoctors().subscribe({
      next: (data) => {
        this.doctors = data.length ? data : MOCK_DOCTORS;
        this.loading = false;
      },
      error: () => {
        this.doctors = MOCK_DOCTORS;
        this.loading = false;
      }
    });
  }

  getDoctorName(d: any): string {
    return `${d.firstName} ${d.lastName}`.trim();
  }

  goToBooking(): void { this.router.navigate(['/booking']); }
}
