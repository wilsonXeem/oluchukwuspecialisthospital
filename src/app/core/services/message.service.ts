import { Injectable } from '@angular/core';
import { ToastService } from '../../shared/components/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private toastService: ToastService) {}

  // Standardized success messages
  showSuccess(message: string): void {
    this.toastService.success(message);
  }

  // Standardized error messages
  showError(message: string): void {
    this.toastService.error(message);
  }

  // Standardized info messages
  showInfo(message: string): void {
    this.toastService.info(message);
  }

  // Common success messages
  saveSuccess(): void {
    this.showSuccess('Changes saved successfully');
  }

  deleteSuccess(): void {
    this.showSuccess('Item deleted successfully');
  }

  createSuccess(item: string = 'Item'): void {
    this.showSuccess(`${item} created successfully`);
  }

  updateSuccess(item: string = 'Item'): void {
    this.showSuccess(`${item} updated successfully`);
  }

  // Common error messages
  saveError(): void {
    this.showError('Failed to save changes. Please try again.');
  }

  deleteError(): void {
    this.showError('Failed to delete item. Please try again.');
  }

  loadError(): void {
    this.showError('Failed to load data. Please refresh the page.');
  }

  networkError(): void {
    this.showError('Network error. Please check your connection.');
  }

  validationError(field: string = 'Field'): void {
    this.showError(`${field} is required or invalid`);
  }

  permissionError(): void {
    this.showError('You do not have permission to perform this action');
  }

  sessionExpiredError(): void {
    this.showError('Your session has expired. Please log in again.');
  }

  // Common info messages
  loadingInfo(): void {
    this.showInfo('Loading data...');
  }

  processingInfo(): void {
    this.showInfo('Processing request...');
  }

  noDataInfo(): void {
    this.showInfo('No data available');
  }

  unsavedChangesInfo(): void {
    this.showInfo('You have unsaved changes');
  }
}