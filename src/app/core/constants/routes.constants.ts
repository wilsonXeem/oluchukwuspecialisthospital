export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  BOOKING: '/booking',
  AUTH: {
    BASE: '/auth',
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password'
  },
  PATIENTS: {
    BASE: '/patients',
    LIST: '/patients',
    NEW: '/patients/new',
    DETAILS: '/patients/:id',
    EDIT: '/patients/:id/edit'
  },
  PATIENT: {
    BASE: '/patient',
    PROFILE: '/patient/profile',
    APPOINTMENTS: '/patient/appointments',
    MEDICAL_RECORDS: '/patient/medical-records'
  },
  DOCTOR: {
    BASE: '/doctor',
    PROFILE: '/doctor/profile',
    APPOINTMENTS: '/doctor/appointments',
    PATIENTS: '/doctor/patients'
  },
  PHARMACY: {
    BASE: '/pharmacy',
    MEDICINES: '/pharmacy/medicines',
    PRESCRIPTIONS: '/pharmacy/prescriptions'
  },
  LAB: {
    BASE: '/lab',
    TESTS: '/lab/tests',
    RESULTS: '/lab/results'
  },
  INVENTORY: {
    BASE: '/inventory',
    ITEMS: '/inventory/items',
    STOCK: '/inventory/stock'
  },
  FINANCE: {
    BASE: '/finance',
    BILLING: '/finance/billing',
    PAYMENTS: '/finance/payments'
  },
  ADMIN: {
    BASE: '/admin',
    USERS: '/admin/users',
    SETTINGS: '/admin/settings',
    REPORTS: '/admin/reports'
  }
} as const;