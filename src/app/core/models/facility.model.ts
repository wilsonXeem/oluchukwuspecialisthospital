export interface Facility {
  id: string;
  tenantId: string;
  name: string;
  type: 'hospital' | 'clinic' | 'diagnostic_center' | 'pharmacy' | 'warehouse';
  address?: string;
  contactEmail?: string;
  contactPhone?: string;
  description?: string;
  mission?: string;
  vision?: string;
  services?: string[];
  departments?: string[];
  operatingHours?: OperatingHours;
  emergencyContact?: string;
  website?: string;
  aboutContent?: string;
  servicesOffered?: ServiceOffered[];
  logoUrl?: string;
  socialMediaLinks?: SocialMediaLinks;
  isActive: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export interface OperatingHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
  emergency?: string;
}

export interface ServiceOffered {
  name: string;
  description?: string;
  icon?: string;
}

export interface SocialMediaLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
}

export interface CreateFacilityRequest {
  name: string;
  type: 'hospital' | 'clinic' | 'diagnostic_center' | 'pharmacy' | 'warehouse';
  address?: string;
  contactEmail?: string;
  contactPhone?: string;
}