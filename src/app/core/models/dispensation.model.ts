export interface Dispensation {
  id: string;
  prescriptionItemId: string;
  pharmacistId: string;
  batchId: string;
  quantityDispensed: number;
  patientCounseled: boolean;
  remarks?: string;
  createdAt: Date;
}

export interface CreateDispensationRequest {
  prescriptionItemId: string;
  batchId: string;
  quantityDispensed: number;
  patientCounseled?: boolean;
  remarks?: string;
}