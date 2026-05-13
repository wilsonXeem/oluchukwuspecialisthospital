import { User } from './user.model';

// Doctor is a User with role 'doctor'
export interface Doctor extends Omit<User, 'role'> {
  role: 'doctor';
  specialization?: string;
}

export interface DoctorProfile {
  userId: string;
  specialization?: string;
  consultationFee?: number;
  availability?: string[];
  experience?: number;
}