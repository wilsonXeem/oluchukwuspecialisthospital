import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HOSPITAL, SERVICES } from '../../core/constants/hospital.constants';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {
  hospital = HOSPITAL;
  service: any = null;
  otherServices: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      this.service = SERVICES.find(s => s.slug === slug) || null;
      this.otherServices = SERVICES.filter(s => s.slug !== slug).slice(0, 3);
      if (!this.service) this.router.navigate(['/services']);
    });
  }

  goToBooking(): void { this.router.navigate(['/booking']); }
  goToService(slug: string): void { this.router.navigate(['/services', slug]); }
}
