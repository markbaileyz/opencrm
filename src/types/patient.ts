
export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface Insurance {
  provider: string;
  policyNumber: string;
  groupNumber?: string;
  coverageType: string;
  startDate?: string;
  endDate?: string;
  copay?: string;
  deductible?: string;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other" | "prefer-not-to-say";
  email: string;
  phone: string;
  address: string;
  insuranceProvider: string;
  policyNumber: string;
  groupNumber?: string;
  coverageType: string;
  primaryCarePhysician?: string;
  emergencyContact?: EmergencyContact;
  medicalConditions?: string[];
  allergies?: string[];
  medications?: string[];
  notes?: string;
  status: "active" | "inactive" | "pending";
  avatarUrl?: string;
  lastVisit?: string;
  documents?: PatientDocument[];
  appointments?: PatientAppointment[];
  insuranceHistory?: Insurance[];
  tasks?: PatientTask[];
  // New fields for document uploads
  documentUploads?: {
    insuranceCardFront?: string;
    insuranceCardBack?: string;
    driversLicenseFront?: string;
    driversLicenseBack?: string;
  };
}

export interface PatientDocument {
  id: string;
  patientId: string;
  name: string;
  type: "insurance" | "medical" | "consent" | "other";
  uploadDate: string;
  fileUrl: string;
  notes?: string;
}

export interface PatientAppointment {
  id: string;
  patientId: string;
  date: string;
  time: string;
  duration: number; // in minutes
  provider: string;
  location: string;
  reason: string;
  status: "scheduled" | "completed" | "cancelled" | "no-show";
  notes?: string;
}

export interface PatientTask {
  id: string;
  patientId: string;
  title: string;
  description?: string;
  dueDate: string;
  assignedTo?: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
}
