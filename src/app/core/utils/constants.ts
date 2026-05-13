export const APP_CONSTANTS = {
  API_BASE_URL: window.location.protocol === 'https:' ? 'https://localhost:3000/api' : 'http://localhost:3000/api',
  TOKEN_KEY: 'hms_auth_token',
  USER_KEY: 'user_data',
  ROLES: {
    ADMIN: 'admin',
    DOCTOR: 'doctor',
    NURSE: 'nurse',
    PHARMACIST: 'pharmacist',
    LAB_TECHNICIAN: 'lab_technician',
    RECEPTIONIST: 'receptionist'
  },
  DATE_FORMAT: 'yyyy-MM-dd',
  DATETIME_FORMAT: 'yyyy-MM-dd HH:mm:ss'
};