import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../core/services/blog.service';

@Component({
  selector: 'app-blog-management',
  templateUrl: './blog-management.component.html',
  styleUrls: ['./blog-management.component.css']
})
export class BlogManagementComponent implements OnInit {
  posts: any[] = [];
  filtered: any[] = [];
  loading = false;
  statusFilter = '';
  searchTerm = '';

  showForm = false;
  editingId: string | null = null;
  submitting = false;
  deleteConfirmId: string | null = null;
  successMsg = '';
  errorMsg = '';

  form: FormGroup;

  categories = [
    'Health Tips', 'Hospital News', 'Surgery', 'Endoscopy',
    'Patient Stories', 'Medical Advice', 'Events', 'General'
  ];

  constructor(private blogService: BlogService, private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      excerpt: [''],
      content: ['', Validators.required],
      featuredImage: [''],
      category: [''],
      tags: [''],
      status: ['draft']
    });
  }

  ngOnInit(): void { this.load(); }

  load(): void {
    this.loading = true;
    this.blogService.getAllPosts().subscribe({
      next: (res: any) => {
        this.posts = res.data?.posts || [];
        this.applyFilters();
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  applyFilters(): void {
    const q = this.searchTerm.toLowerCase().trim();
    this.filtered = this.posts.filter(p => {
      const matchSearch = !q || p.title?.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q);
      const matchStatus = !this.statusFilter || p.status === this.statusFilter;
      return matchSearch && matchStatus;
    });
  }

  openCreate(): void {
    this.editingId = null;
    this.form.reset({ status: 'draft' });
    this.errorMsg = '';
    this.showForm = true;
  }

  openEdit(post: any): void {
    this.editingId = post.id;
    this.blogService.getPostById(post.id).subscribe({
      next: (res: any) => {
        const p = res.data?.post;
        this.form.patchValue({
          title: p.title,
          excerpt: p.excerpt || '',
          content: p.content,
          featuredImage: p.featuredImage || '',
          category: p.category || '',
          tags: p.tags || '',
          status: p.status
        });
        this.errorMsg = '';
        this.showForm = true;
      },
      error: () => {}
    });
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.submitting = true;
    this.errorMsg = '';

    const call = this.editingId
      ? this.blogService.updatePost(this.editingId, this.form.value)
      : this.blogService.createPost(this.form.value);

    call.subscribe({
      next: () => {
        this.submitting = false;
        this.showForm = false;
        this.successMsg = this.editingId ? 'Post updated.' : 'Post created.';
        setTimeout(() => this.successMsg = '', 3000);
        this.load();
      },
      error: (err: any) => {
        this.errorMsg = err?.error?.message || 'Failed to save post.';
        this.submitting = false;
      }
    });
  }

  togglePublish(post: any): void {
    this.blogService.togglePublish(post.id).subscribe({
      next: () => {
        this.successMsg = post.status === 'published' ? 'Post unpublished.' : 'Post published.';
        setTimeout(() => this.successMsg = '', 3000);
        this.load();
      },
      error: () => {}
    });
  }

  confirmDelete(id: string): void { this.deleteConfirmId = id; }

  doDelete(): void {
    if (!this.deleteConfirmId) return;
    this.blogService.deletePost(this.deleteConfirmId).subscribe({
      next: () => {
        this.deleteConfirmId = null;
        this.successMsg = 'Post deleted.';
        setTimeout(() => this.successMsg = '', 3000);
        this.load();
      },
      error: () => {}
    });
  }

  formatDate(d: string): string {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }
}
