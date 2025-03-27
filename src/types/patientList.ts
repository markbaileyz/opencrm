
import { Patient } from "./patient";

// This interface represents the simplified patient data structure
// used in the patient list views
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
    group?: string;
  };
  status: "active" | "inactive" | "pending";
  lastVisit: string | null;
  medicalHistory?: Array<{
    condition: string;
    diagnosedDate: string;
  }>;
}

// Function to convert between the simplified PatientListItem and the full Patient type
export const mapToPatientListItem = (patient: Patient): PatientListItem => {
  return {
    id: patient.id,
    name: `${patient.firstName} ${patient.lastName}`,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    phone: patient.phone,
    email: patient.email,
    address: patient.address,
    insurance: {
      provider: patient.insuranceProvider,
      policyNumber: patient.policyNumber,
      group: patient.groupNumber
    },
    status: patient.status === "inactive" ? "inactive" : "active",
    lastVisit: null // This would need to be populated from appointments data
  };
};

// Convert from PatientListItem to full Patient type for form editing
export const mapToPatient = (item: PatientListItem): Patient => {
  const [firstName, ...lastNameParts] = item.name.split(" ");
  const lastName = lastNameParts.join(" ");
  
  return {
    id: item.id,
    firstName,
    lastName,
    dateOfBirth: item.dateOfBirth,
    gender: item.gender as any, // Cast to match the Patient gender enum
    email: item.email,
    phone: item.phone,
    address: item.address,
    insuranceProvider: item.insurance.provider,
    policyNumber: item.insurance.policyNumber,
    groupNumber: item.insurance.group,
    coverageType: "unknown", // Default value
    status: item.status === "inactive" ? "inactive" : "active",
  };
};
