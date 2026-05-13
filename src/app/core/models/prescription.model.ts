export interface Prescription {
  id: string;
  consultationId: string;
  prescribedBy: string;
  remarks?: string;
  status: 'pending' | 'dispensed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface PrescriptionItem {
  id: string;
  prescriptionId: string;
  drugName: string;
  drugId?: string;
  dosage?: string;
  frequency?: string;
  duration?: string;
  quantityPrescribed: number;
  createdAt: Date;
}

export interface CreatePrescriptionRequest {
  consultationId: string;
  remarks?: string;
  items: CreatePrescriptionItemRequest[];
}

export interface CreatePrescriptionItemRequest {
  drugName: string;
  drugId?: string;
  dosage?: string;
  frequency?: string;
  duration?: string;
  quantityPrescribed: number;
}