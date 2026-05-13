export interface PatientAllergy {
  id: string;
  patientId: string;
  allergen: string;
  allergenType: 'drug' | 'food' | 'environmental';
  severity: 'mild' | 'moderate' | 'severe' | 'life-threatening';
  reaction?: string;
  onsetDate?: Date;
  recordedBy?: string;
  createdAt: Date;
}

export interface CreatePatientAllergyRequest {
  patientId: string;
  allergen: string;
  allergenType: 'drug' | 'food' | 'environmental';
  severity: 'mild' | 'moderate' | 'severe' | 'life-threatening';
  reaction?: string;
  onsetDate?: Date;
}