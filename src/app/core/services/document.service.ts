import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { UploadDocumentRequest } from '../models/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  constructor(private http: HttpClient, private api: ApiService) {}

  getDocuments(relatedTo?: string, relatedId?: string, filters?: any): Observable<any> {
    const params: any = {};
    if (relatedTo) params.relatedTo = relatedTo;
    if (relatedId) params.relatedId = relatedId;
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key]) params[key] = filters[key];
      });
    }
    return this.api.get('/documents', params);
  }

  searchDocumentContent(query: string): Observable<any> {
    return this.api.post('/documents/search-content', { query });
  }

  uploadDocument(data: UploadDocumentRequest): Observable<any> {
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('relatedTo', data.relatedTo);
    formData.append('relatedId', data.relatedId);
    if (data.description) formData.append('description', data.description);
    
    return this.http.post(`${this.api.getBaseUrl()}/documents/upload`, formData);
  }

  deleteDocument(id: string): Observable<any> {
    return this.api.delete(`/documents/${id}`);
  }

  downloadDocument(id: string): Observable<Blob> {
    return this.http.get(`${this.api.getBaseUrl()}/documents/${id}/download`, { 
      responseType: 'blob' 
    });
  }

  getDocumentAnalytics(): Observable<any> {
    return this.api.get('/documents/analytics');
  }

  // Document Categories
  getCategories(): Observable<any> {
    return this.api.get('/documents/categories');
  }

  createCategory(category: any): Observable<any> {
    return this.api.post('/documents/categories', category);
  }

  // Document Permissions
  shareDocument(documentId: string, shareData: any): Observable<any> {
    return this.api.post(`/documents/${documentId}/share`, shareData);
  }

  updateDocumentPermissions(documentId: string, permissions: any): Observable<any> {
    return this.api.put(`/documents/${documentId}/permissions`, permissions);
  }

  // Document Notifications
  getDocumentNotifications(): Observable<any> {
    return this.api.get('/documents/notifications');
  }

  createExpirationAlert(documentId: string, expirationDate: Date): Observable<any> {
    return this.api.post('/documents/notifications/expiration', {
      documentId,
      expirationDate
    });
  }

  getExpiringDocuments(days: number = 30): Observable<any> {
    return this.api.get('/documents/expiring', { days });
  }

  // Bulk Operations
  bulkDelete(documentIds: string[]): Observable<any> {
    return this.api.post('/documents/bulk-delete', { documentIds });
  }

  bulkDownload(documentIds: string[]): Observable<Blob> {
    return this.http.post(`${this.api.getBaseUrl()}/documents/bulk-download`, 
      { documentIds }, 
      { responseType: 'blob' }
    );
  }

  bulkUpdateMetadata(documentIds: string[], metadata: any): Observable<any> {
    return this.api.post('/documents/bulk-update', { documentIds, metadata });
  }
}