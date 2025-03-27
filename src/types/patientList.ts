
export interface PatientListItem {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  insurance: {
    provider: string;
    policyNumber: string;
    group: string;
  };
  status: string;
  lastVisit: string;
  medicalHistory?: string[]; // Added to fix the type errors in Patients.tsx
  documents?: {
    insuranceCardFront?: string;
    insuranceCardBack?: string;
    driversLicenseFront?: string;
    driversLicenseBack?: string;
  };
}
