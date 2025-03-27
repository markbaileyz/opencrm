
import { z } from "zod";

export const checkInSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone number is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  insuranceProvider: z.string().min(1, { message: "Insurance provider is required" }),
  policyNumber: z.string().min(1, { message: "Policy number is required" }),
  reasonForVisit: z.string().min(1, { message: "Reason for visit is required" }),
  appointmentTime: z.string().optional(),
  preferredProvider: z.string().optional(),
  existingPatient: z.boolean().default(false),
  symptoms: z.string().optional(),
  medications: z.string().optional(),
  allergies: z.string().optional(),
  consent: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
  // Optional document uploads
  insuranceCardFront: z.any().optional(),
  insuranceCardBack: z.any().optional(),
  driversLicenseFront: z.any().optional(),
  driversLicenseBack: z.any().optional(),
});

export type CheckInFormValues = z.infer<typeof checkInSchema>;

export interface DocumentUpload {
  insuranceCardFront: string | null;
  insuranceCardBack: string | null;
  driversLicenseFront: string | null;
  driversLicenseBack: string | null;
}
