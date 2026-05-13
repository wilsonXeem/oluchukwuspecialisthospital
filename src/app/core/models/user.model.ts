export interface User {
  id: string;
  facilityId: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  role: string;
  phone?: string;
  department?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  phone?: string;
  department?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
  requiresMfa?: boolean;
  defaultRoute?: string;
}
