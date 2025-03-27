
import { z } from "zod";
import { Patient } from "@/types/patient";

export const patientSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female", "other", "prefer-not-to-say"]),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  insuranceProvider: z.string().min(1, "Insurance provider is required"),
  policyNumber: z.string().min(1, "Policy number is required"),
  groupNumber: z.string().optional(),
  coverageType: z.string().min(1, "Coverage type is required"),
  primaryCarePhysician: z.string().optional(),
  emergencyContact: z.object({
    name: z.string().min(1, "Emergency contact name is required"),
    relationship: z.string().min(1, "Relationship is required"),
    phone: z.string().min(1, "Phone number is required"),
  }).optional(),
  medicalConditions: z.array(z.string()).optional(),
  allergies: z.array(z.string()).optional(),
  medications: z.array(z.string()).optional(),
  notes: z.string().optional(),
  status: z.enum(["active", "inactive"]),
});

export type PatientFormValues = z.infer<typeof patientSchema>;

export const mapFormValuesToPatient = (data: PatientFormValues): Patient => {
  return {
    id: data.id || new Date().getTime().toString(),
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: data.dateOfBirth,
    gender: data.gender,
    email: data.email,
    phone: data.phone,
    address: data.address,
    insuranceProvider: data.insuranceProvider,
    policyNumber: data.policyNumber,
    groupNumber: data.groupNumber,
    coverageType: data.coverageType,
    primaryCarePhysician: data.primaryCarePhysician,
    emergencyContact: data.emergencyContact ? {
      name: data.emergencyContact.name,
      relationship: data.emergencyContact.relationship,
      phone: data.emergencyContact.phone
    } : undefined,
    medicalConditions: data.medicalConditions,
    allergies: data.allergies,
    medications: data.medications,
    notes: data.notes,
    status: data.status
  };
};

export const mapPatientToFormValues = (patient: Patient | null): PatientFormValues => {
  return {
    id: patient?.id,
    firstName: patient?.firstName || "",
    lastName: patient?.lastName || "",
    dateOfBirth: patient?.dateOfBirth || "",
    gender: patient?.gender || "prefer-not-to-say",
    email: patient?.email || "",
    phone: patient?.phone || "",
    address: patient?.address || "",
    insuranceProvider: patient?.insuranceProvider || "",
    policyNumber: patient?.policyNumber || "",
    groupNumber: patient?.groupNumber || "",
    coverageType: patient?.coverageType || "",
    primaryCarePhysician: patient?.primaryCarePhysician || "",
    emergencyContact: patient?.emergencyContact || {
      name: "",
      relationship: "",
      phone: "",
    },
    medicalConditions: patient?.medicalConditions || [],
    allergies: patient?.allergies || [],
    medications: patient?.medications || [],
    notes: patient?.notes || "",
    status: patient?.status || "active",
  };
};
