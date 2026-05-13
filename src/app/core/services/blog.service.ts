import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private api = `${environment.apiUrl}/blog`;

  constructor(private http: HttpClient) {}

  // Public
  getPosts(params?: { category?: string; limit?: number; offset?: number }): Observable<any> {
    const q = new URLSearchParams();
    if (params?.category) q.append('category', params.category);
    if (params?.limit) q.append('limit', String(params.limit));
    if (params?.offset) q.append('offset', String(params.offset));
    return this.http.get(`${this.api}?${q.toString()}`);
  }

  getPostBySlug(slug: string): Observable<any> {
    return this.http.get(`${this.api}/${slug}`);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.api}/categories`);
  }

  // Admin
  getAllPosts(status?: string): Observable<any> {
    const q = status ? `?status=${status}` : '';
    return this.http.get(`${this.api}/admin/posts${q}`);
  }

  getPostById(id: string): Observable<any> {
    return this.http.get(`${this.api}/admin/posts/${id}`);
  }

  createPost(data: any): Observable<any> {
    return this.http.post(`${this.api}/admin/posts`, data);
  }

  updatePost(id: string, data: any): Observable<any> {
    return this.http.put(`${this.api}/admin/posts/${id}`, data);
  }

  deletePost(id: string): Observable<any> {
    return this.http.delete(`${this.api}/admin/posts/${id}`);
  }

  togglePublish(id: string): Observable<any> {
    return this.http.patch(`${this.api}/admin/posts/${id}/publish`, {});
  }
}
