import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UploadService } from '../../../core/services/upload.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  @Input() currentUrl = '';
  @Input() folder: 'blog' | 'patients' | 'lab' | 'logos' | 'documents' | 'general' = 'general';
  @Input() label = 'Upload Image';
  @Output() uploaded = new EventEmitter<string>();

  uploading = false;
  error = '';
  preview = '';

  constructor(private uploadService: UploadService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];

    // Show local preview immediately
    const reader = new FileReader();
    reader.onload = (e) => { this.preview = e.target?.result as string; };
    reader.readAsDataURL(file);

    this.uploading = true;
    this.error = '';

    this.uploadService.uploadFile(file, this.folder).subscribe({
      next: (res) => {
        this.uploading = false;
        this.currentUrl = res.url;
        this.uploaded.emit(res.url);
      },
      error: (err) => {
        this.uploading = false;
        this.preview = '';
        this.error = err?.error?.message || 'Upload failed. Please try again.';
      }
    });
  }

  get displayUrl(): string {
    return this.preview || this.currentUrl;
  }

  clear(): void {
    this.currentUrl = '';
    this.preview = '';
    this.uploaded.emit('');
  }
}
