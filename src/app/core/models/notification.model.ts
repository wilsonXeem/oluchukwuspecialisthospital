export interface Notification {
  id: string;
  facilityId: string;
  userId: string;
  type: 'appointment' | 'lab_result' | 'payment' | 'inventory' | 'system';
  title: string;
  message: string;
  data?: any; // Additional data for the notification
  isRead: boolean;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  createdAt: Date;
  readAt?: Date;
}

export interface CreateNotificationRequest {
  userId: string;
  type: 'appointment' | 'lab_result' | 'payment' | 'inventory' | 'system';
  title: string;
  message: string;
  data?: any;
  priority?: 'low' | 'normal' | 'high' | 'urgent';
}

export interface MarkNotificationReadRequest {
  notificationIds: string[];
}