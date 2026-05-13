import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../../../core/services/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  posts: any[] = [];
  categories: string[] = [];
  selectedCategory = '';
  loading = true;
  total = 0;
  page = 0;
  limit = 9;

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadPosts();
  }

  loadCategories(): void {
    this.blogService.getCategories().subscribe({
      next: (res: any) => { this.categories = res.data?.categories || []; },
      error: () => {}
    });
  }

  loadPosts(): void {
    this.loading = true;
    this.blogService.getPosts({
      ...(this.selectedCategory ? { category: this.selectedCategory } : {}),
      limit: this.limit,
      offset: this.page * this.limit
    }).subscribe({
      next: (res: any) => {
        this.posts = res.data?.posts || [];
        this.total = res.data?.total || 0;
        this.loading = false;
      },
      error: () => { this.loading = false; this.posts = []; }
    });
  }

  filterByCategory(cat: string): void {
    this.selectedCategory = cat;
    this.page = 0;
    this.loadPosts();
  }

  viewPost(slug: string): void {
    this.router.navigate(['/blog', slug]);
  }

  get totalPages(): number { return Math.ceil(this.total / this.limit); }

  nextPage(): void { if (this.page < this.totalPages - 1) { this.page++; this.loadPosts(); } }
  prevPage(): void { if (this.page > 0) { this.page--; this.loadPosts(); } }

  formatDate(d: string): string {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  }
}
