
export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  fax?: string;
  email?: string;
  isIntegrated: boolean;
  integrationId?: string;
  preferredByPatients?: number;
}

export interface PharmacyIntegration {
  id: string;
  pharmacyId: string;
  provider: "Surescripts" | "RxNorm" | "NCPDP" | "Manual" | "Other";
  apiKey?: string;
  endpoint?: string;
  status: "active" | "inactive" | "pending" | "error";
  lastSyncDate?: string;
  errorMessage?: string;
}

export interface PrescriptionTransmission {
  id: string;
  prescriptionId: string;
  pharmacyId: string;
  status: "pending" | "sent" | "received" | "processing" | "filled" | "error" | "cancelled";
  sentDate?: string;
  receivedDate?: string;
  filledDate?: string;
  trackingNumber?: string;
  estimatedReadyDate?: string;
  notes?: string;
  errorDetails?: string;
}

export type PharmacySortField = "name" | "address" | "city" | "state" | "isIntegrated" | "preferredByPatients";
