export interface Admission {
  id: string;
  facilityId: string;
  patientId: string;
  admissionNumber: string;
  admissionType: 'inpatient' | 'outpatient' | 'emergency' | 'day_care';
  admissionDate: string;
  dischargeDate?: string;
  bedId?: string;
  wardId?: string;
  admittingDoctorId: string;
  dischargingDoctorId?: string;
  status: 'admitted' | 'discharged' | 'transferred';
  admissionReason?: string;
  dischargeReason?: string;
  dischargeSummary?: string;
  totalCharges: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdmissionDetails extends Admission {
  patient: {
    id: string;
    firstName: string;
    lastName: string;
    patientCode: string;
    dateOfBirth: string;
    gender: string;
  };
  ward?: {
    id: string;
    name: string;
  };
  bed?: {
    id: string;
    bedNumber: string;
  };
  admittingDoctor: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export interface AdmissionStats {
  totalAdmissions: number;
  activeAdmissions: number;
  todayAdmissions: number;
  todayDischarges: number;
}

export interface RoomCharges {
  id: string;
  chargeDate: string;
  dailyRate: number;
  numberOfDays: number;
  totalAmount: number;
  chargeType: string;
  status: string;
  bedNumber?: string;
  wardName?: string;
}