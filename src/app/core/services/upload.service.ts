import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UploadService {
  private api = `${environment.apiUrl}/upload`;

  constructor(private http: HttpClient) {}

  uploadFile(file: File, folder: 'blog' | 'patients' | 'lab' | 'logos' | 'documents' | 'general' = 'general'): Observable<{ url: string; publicId: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.api}?folder=${folder}`, formData).pipe(
      map(res => res.data)
    );
  }

  deleteFile(publicId: string): Observable<any> {
    return this.http.delete(this.api, { body: { publicId } });
  }
}
