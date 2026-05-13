export interface ActivityLog {
  id: string;
  userId?: string;
  module?: string;
  action?: string;
  details?: string;
  createdAt: Date;
}

export interface CreateActivityLogRequest {
  module: string;
  action: string;
  details?: string;
}