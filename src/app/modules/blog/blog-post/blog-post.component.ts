import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../../core/services/blog.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {
  post: any = null;
  related: any[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.load(params['slug']);
      window.scrollTo(0, 0);
    });
  }

  load(slug: string): void {
    this.loading = true;
    this.blogService.getPostBySlug(slug).subscribe({
      next: (res: any) => {
        this.post = res.data?.post || null;
        this.related = res.data?.related || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.router.navigate(['/blog']);
      }
    });
  }

  formatDate(d: string): string {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  }

  getTags(): string[] {
    if (!this.post?.tags) return [];
    return this.post.tags.split(',').map((t: string) => t.trim()).filter(Boolean);
  }

  viewPost(slug: string): void {
    this.router.navigate(['/blog', slug]);
  }
}
