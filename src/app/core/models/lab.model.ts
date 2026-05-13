export interface LabRequest {
  id: string;
  consultationId?: string;
  patientId: string;
  testName: string;
  requestedBy: string;
  assignedLabId?: string;
  priority: 'routine' | 'urgent' | 'stat';
  status: 'pending' | 'completed';
  createdAt: Date;
}

export interface LabResult {
  id: string;
  requestId: string;
  resultText?: string;
  resultFileUrl?: string;
  resultValue?: string;
  unit?: string;
  validationStatus: 'normal' | 'abnormal' | 'critical';
  isCritical: boolean;
  uploadedBy: string;
  createdAt: Date;
}

export interface CreateLabRequestRequest {
  consultationId?: string;
  patientId: string;
  testName: string;
  assignedLabId?: string;
  priority?: 'routine' | 'urgent' | 'stat';
}

export interface CreateLabResultRequest {
  requestId: string;
  resultText?: string;
  resultFileUrl?: string;
  resultValue?: string;
  unit?: string;
  validationStatus: 'normal' | 'abnormal' | 'critical';
  isCritical?: boolean;
}