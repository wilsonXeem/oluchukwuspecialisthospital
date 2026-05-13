export interface Vitals {
  id: string;
  patientId: string;
  recordedBy: string;
  bloodPressure?: string;
  temperature?: number;
  pulse?: number;
  respiration?: number;
  weight?: number;
  height?: number;
  createdAt: Date;
}

export interface CreateVitalsRequest {
  patientId: string;
  bloodPressure?: string;
  temperature?: number;
  pulse?: number;
  respiration?: number;
  weight?: number;
  height?: number;
}