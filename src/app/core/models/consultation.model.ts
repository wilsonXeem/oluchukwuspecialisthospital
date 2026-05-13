export interface Consultation {
  id: string;
  patientId: string;
  doctorId: string;
  diagnosis?: string;
  notes?: string;
  recommendedTests?: string; // JSON array of test IDs
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateConsultationRequest {
  patientId: string;
  doctorId: string;
  diagnosis?: string;
  notes?: string;
  recommendedTests?: string;
}

export interface UpdateConsultationRequest {
  diagnosis?: string;
  notes?: string;
  recommendedTests?: string;
  status?: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
}