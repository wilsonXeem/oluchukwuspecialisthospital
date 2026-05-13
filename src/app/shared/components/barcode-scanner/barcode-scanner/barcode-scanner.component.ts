import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { BarcodeScannerService, BarcodeResult } from '../../../core/services/barcode-scanner.service';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.css']
})
export class BarcodeScannerComponent {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @Output() barcodeScanned = new EventEmitter<BarcodeResult>();

  isScanning = false;
  lastResult: BarcodeResult | null = null;

  constructor(private barcodeService: BarcodeScannerService) {
    this.barcodeService.scanResult$.subscribe(result => {
      if (result) {
        this.lastResult = result;
        this.barcodeScanned.emit(result);
      }
    });
  }

  async toggleScanner(): Promise<void> {
    if (this.isScanning) {
      this.stopScanning();
    } else {
      await this.startScanning();
    }
  }

  private async startScanning(): Promise<void> {
    try {
      await this.barcodeService.startScanning(this.videoElement.nativeElement);
      this.isScanning = true;
    } catch (error) {
      console.error('Failed to start scanner:', error);
      alert('Camera access denied or not available');
    }
  }

  private stopScanning(): void {
    this.barcodeService.stopScanning();
    this.isScanning = false;
  }

  async onImageSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      try {
        const result = await this.barcodeService.scanFromImage(input.files[0]);
        this.lastResult = result;
        this.barcodeScanned.emit(result);
      } catch (error) {
        console.error('Failed to scan image:', error);
        alert('Failed to scan barcode from image');
      }
    }
  }
}