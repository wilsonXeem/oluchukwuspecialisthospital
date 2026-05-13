import { Injectable } from '@angular/core';
import { ToastService } from '../../shared/components/toast/toast.service';

export interface StandardMessage {
  loading: string;
  success: string;
  error: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageStandardizationService {
  private standardMessages: { [key: string]: StandardMessage } = {
    save: {
      loading: 'Saving...',
      success: 'Saved successfully',
      error: 'Failed to save. Please try again.'
    },
    delete: {
      loading: 'Deleting...',
      success: 'Deleted successfully',
      error: 'Failed to delete. Please try again.'
    },
    load: {
      loading: 'Loading...',
      success: 'Data loaded successfully',
      error: 'Failed to load data. Please refresh the page.'
    },
    update: {
      loading: 'Updating...',
      success: 'Updated successfully',
      error: 'Failed to update. Please try again.'
    },
    create: {
      loading: 'Creating...',
      success: 'Created successfully',
      error: 'Failed to create. Please try again.'
    },
    upload: {
      loading: 'Uploading...',
      success: 'File uploaded successfully',
      error: 'Failed to upload file. Please try again.'
    },
    download: {
      loading: 'Downloading...',
      success: 'Download completed',
      error: 'Failed to download. Please try again.'
    },
    search: {
      loading: 'Searching...',
      success: 'Search completed',
      error: 'Search failed. Please try again.'
    },
    export: {
      loading: 'Exporting data...',
      success: 'Data exported successfully',
      error: 'Failed to export data. Please try again.'
    },
    import: {
      loading: 'Importing data...',
      success: 'Data imported successfully',
      error: 'Failed to import data. Please check the file format.'
    },
    send: {
      loading: 'Sending...',
      success: 'Sent successfully',
      error: 'Failed to send. Please try again.'
    },
    process: {
      loading: 'Processing...',
      success: 'Processing completed',
      error: 'Processing failed. Please try again.'
    }
  };

  constructor(private toastService: ToastService) {}

  getMessages(action: string): StandardMessage {
    return this.standardMessages[action] || {
      loading: 'Processing...',
      success: 'Operation completed successfully',
      error: 'Operation failed. Please try again.'
    };
  }

  showLoading(action: string, customMessage?: string): void {
    const message = customMessage || this.getMessages(action).loading;
    // This would integrate with a loading service
    console.log(`Loading: ${message}`);
  }

  showSuccess(action: string, customMessage?: string): void {
    const message = customMessage || this.getMessages(action).success;
    this.toastService.show('success', message);
  }

  showError(action: string, customMessage?: string): void {
    const message = customMessage || this.getMessages(action).error;
    this.toastService.show('error', message);
  }

  // Utility method for common operation patterns
  async executeWithMessages<T>(
    action: string,
    operation: () => Promise<T>,
    customMessages?: Partial<StandardMessage>
  ): Promise<T> {
    const messages = { ...this.getMessages(action), ...customMessages };
    
    try {
      this.showLoading(action, messages.loading);
      const result = await operation();
      this.showSuccess(action, messages.success);
      return result;
    } catch (error) {
      this.showError(action, messages.error);
      throw error;
    }
  }
}