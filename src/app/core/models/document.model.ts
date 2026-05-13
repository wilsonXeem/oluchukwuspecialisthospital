export interface Document {
  id: string;
  relatedTo: string;
  relatedId: string;
  uploadedBy: string;
  fileUrl: string;
  fileType?: string;
  fileSize?: number;
  description?: string;
  ocrProcessed?: boolean;
  ocrContent?: string;
  createdAt: Date;
  updatedAt?: Date;
  // Document Permissions
  permissions?: DocumentPermissions;
  sharedWith?: SharedUser[];
  accessLevel?: 'private' | 'shared' | 'public';
  // Categories & Tags
  category?: DocumentCategory;
  tags?: string[];
  folder?: string;
  // Notifications
  expirationDate?: Date;
  reminderDate?: Date;
  // Mobile features
  capturedFromMobile?: boolean;
  location?: DocumentLocation;
}

export interface DocumentPermissions {
  canView: string[];
  canEdit: string[];
  canDelete: string[];
  canShare: string[];
}

export interface SharedUser {
  userId: string;
  userName: string;
  permissions: ('view' | 'edit' | 'delete' | 'share')[];
  sharedAt: Date;
  expiresAt?: Date;
}

export interface DocumentCategory {
  id: string;
  name: string;
  color: string;
  icon?: string;
  parentId?: string;
}

export interface DocumentLocation {
  latitude: number;
  longitude: number;
  address?: string;
}

export interface DocumentNotification {
  id: string;
  documentId: string;
  type: 'expiration' | 'reminder' | 'shared' | 'quota';
  message: string;
  scheduledFor: Date;
  sent: boolean;
}

export interface UploadDocumentRequest {
  relatedTo: string;
  relatedId: string;
  file: File;
  description?: string;
}

export interface DocumentSearchFilters {
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  fileType?: string;
  sizeFilter?: string;
  ocrQuery?: string;
}

export interface OcrSearchResult {
  documentId: string;
  matches: number;
  excerpts: string[];
}