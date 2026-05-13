import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HOSPITAL, SERVICES, WHY_CHOOSE_US } from '../../core/constants/hospital.constants';
import { BlogService } from '../../core/services/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hospital = HOSPITAL;
  services = SERVICES;
  whyChooseUs = WHY_CHOOSE_US;
  featuredServices = SERVICES.filter(s => s.isFeatured).slice(0, 4);
  latestPosts: any[] = [];

  constructor(public router: Router, private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getPosts({ limit: 3 }).subscribe({
      next: (res: any) => { this.latestPosts = res.data?.posts || []; },
      error: () => {}
    });
  }

  goToBooking(): void { this.router.navigate(['/booking']); }
  goToServices(): void { this.router.navigate(['/services']); }
  goToContact(): void { this.router.navigate(['/contact']); }
  goToAbout(): void { this.router.navigate(['/about']); }

  formatDate(d: string): string {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }
}
