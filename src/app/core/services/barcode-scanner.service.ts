import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface BarcodeResult {
  code: string;
  format: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class BarcodeScannerService {
  private scanResultSubject = new BehaviorSubject<BarcodeResult | null>(null);
  public scanResult$ = this.scanResultSubject.asObservable();

  private isScanning = false;
  private stream: MediaStream | null = null;

  async startScanning(videoElement: HTMLVideoElement): Promise<void> {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      videoElement.srcObject = this.stream;
      this.isScanning = true;
      
      // Mock barcode detection for demo
      this.mockBarcodeDetection();
    } catch (error) {
      console.error('Error accessing camera:', error);
      throw error;
    }
  }

  stopScanning(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    this.isScanning = false;
  }

  private mockBarcodeDetection(): void {
    // Simulate barcode detection every 3 seconds for demo
    const interval = setInterval(() => {
      if (!this.isScanning) {
        clearInterval(interval);
        return;
      }

      const mockCodes = [
        { code: '1234567890123', format: 'EAN-13' },
        { code: 'MED-001-2024', format: 'CODE-128' },
        { code: 'PAT-12345', format: 'CODE-39' }
      ];

      const randomCode = mockCodes[Math.floor(Math.random() * mockCodes.length)];
      
      this.scanResultSubject.next({
        ...randomCode,
        timestamp: new Date()
      });
    }, 3000);
  }

  scanFromImage(imageFile: File): Promise<BarcodeResult> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Mock image barcode detection
        setTimeout(() => {
          resolve({
            code: 'IMG-' + Date.now(),
            format: 'QR-CODE',
            timestamp: new Date()
          });
        }, 1000);
      };
      reader.onerror = reject;
      reader.readAsDataURL(imageFile);
    });
  }

  generateBarcode(data: string, format: string = 'CODE-128'): string {
    // Mock barcode generation - returns data URL
    return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==`;
  }
}