export interface PatientCondition {
  id: string;
  patientId: string;
  condition: string;
  icd10Code?: string;
  isActive: boolean;
  diagnosedDate?: Date;
  notes?: string;
  recordedBy?: string;
  createdAt: Date;
}

export interface CreatePatientConditionRequest {
  patientId: string;
  condition: string;
  icd10Code?: string;
  diagnosedDate?: Date;
  notes?: string;
}

export interface UpdatePatientConditionRequest {
  condition?: string;
  icd10Code?: string;
  isActive?: boolean;
  diagnosedDate?: Date;
  notes?: string;
}