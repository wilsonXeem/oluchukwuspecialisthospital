export const ORGANIZATION_TYPES = {
  HOSPITAL: 'hospital',
  CLINIC: 'clinic', 
  PHARMACY: 'pharmacy',
  WAREHOUSE: 'warehouse',
  DIAGNOSTIC_CENTER: 'diagnostic_center'
} as const;

export type OrganizationType = typeof ORGANIZATION_TYPES[keyof typeof ORGANIZATION_TYPES];

export interface Tenant {
  id: string;
  name: string;
  organizationType: OrganizationType;
  subdomain: string;
  customDomain?: string;
  subscriptionPlan: string;
  maxFacilities: number;
  maxUsers: number;
  allowedModules?: string[];
  billingEmail?: string;
  isActive: boolean;
  trialEndsAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTenantRequest {
  name: string;
  organizationType: OrganizationType;
  subdomain: string;
  subscriptionPlan: string;
  billingEmail?: string;
}