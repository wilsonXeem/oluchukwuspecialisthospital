import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../../core/services/blog.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  totalPosts = 0;
  publishedPosts = 0;
  draftPosts = 0;
  recentPosts: any[] = [];
  loading = true;

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    this.blogService.getAllPosts().subscribe({
      next: (res: any) => {
        const posts = res.data?.posts || [];
        this.totalPosts = posts.length;
        this.publishedPosts = posts.filter((p: any) => p.status === 'published').length;
        this.draftPosts = posts.filter((p: any) => p.status === 'draft').length;
        this.recentPosts = posts.slice(0, 5);
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  formatDate(d: string): string {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }
}
