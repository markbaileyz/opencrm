
import { Pharmacy, PharmacyIntegration, PrescriptionTransmission } from "@/types/pharmacy";

export const pharmacies: Pharmacy[] = [
  {
    id: "pharm-001",
    name: "Walgreens",
    address: "1234 Main Street",
    city: "Springfield",
    state: "IL",
    zipCode: "62701",
    phone: "(555) 123-4567",
    fax: "(555) 123-4568",
    email: "pharmacy@walgreens.example.com",
    isIntegrated: true,
    integrationId: "int-001",
    preferredByPatients: 45
  },
  {
    id: "pharm-002",
    name: "CVS Pharmacy",
    address: "5678 Oak Avenue",
    city: "Springfield",
    state: "IL",
    zipCode: "62702",
    phone: "(555) 987-6543",
    fax: "(555) 987-6544",
    email: "pharmacy@cvs.example.com",
    isIntegrated: true,
    integrationId: "int-002",
    preferredByPatients: 38
  },
  {
    id: "pharm-003",
    name: "Rite Aid",
    address: "910 Pine Road",
    city: "Springfield",
    state: "IL",
    zipCode: "62703",
    phone: "(555) 456-7890",
    isIntegrated: false,
    preferredByPatients: 22
  },
  {
    id: "pharm-004",
    name: "Walmart Pharmacy",
    address: "1112 Retail Drive",
    city: "Springfield",
    state: "IL",
    zipCode: "62704",
    phone: "(555) 345-6789",
    fax: "(555) 345-6780",
    email: "pharmacy@walmart.example.com",
    isIntegrated: true,
    integrationId: "int-003",
    preferredByPatients: 30
  },
  {
    id: "pharm-005",
    name: "HealthFirst Pharmacy",
    address: "1516 Hospital Way",
    city: "Springfield",
    state: "IL",
    zipCode: "62705",
    phone: "(555) 234-5678",
    isIntegrated: false,
    preferredByPatients: 15
  }
];

export const pharmacyIntegrations: PharmacyIntegration[] = [
  {
    id: "int-001",
    pharmacyId: "pharm-001",
    provider: "Surescripts",
    apiKey: "ss_api_key_walgreens",
    endpoint: "https://api.surescripts.example.com/v1/walgreens",
    status: "active",
    lastSyncDate: "2023-05-15T14:30:00Z"
  },
  {
    id: "int-002",
    pharmacyId: "pharm-002",
    provider: "Surescripts",
    apiKey: "ss_api_key_cvs",
    endpoint: "https://api.surescripts.example.com/v1/cvs",
    status: "active",
    lastSyncDate: "2023-05-16T09:15:00Z"
  },
  {
    id: "int-003",
    pharmacyId: "pharm-004",
    provider: "RxNorm",
    apiKey: "rxnorm_api_key_walmart",
    endpoint: "https://api.rxnorm.example.com/v2/walmart",
    status: "inactive",
    lastSyncDate: "2023-04-30T11:45:00Z",
    errorMessage: "API key expired"
  }
];

export const prescriptionTransmissions: PrescriptionTransmission[] = [
  {
    id: "trans-001",
    prescriptionId: "1",
    pharmacyId: "pharm-001",
    status: "filled",
    sentDate: "2023-05-10T09:30:00Z",
    receivedDate: "2023-05-10T09:32:00Z",
    filledDate: "2023-05-10T14:15:00Z",
    trackingNumber: "RX123456",
    estimatedReadyDate: "2023-05-10T14:00:00Z"
  },
  {
    id: "trans-002",
    prescriptionId: "3",
    pharmacyId: "pharm-002",
    status: "processing",
    sentDate: "2023-05-16T10:45:00Z",
    receivedDate: "2023-05-16T10:48:00Z",
    estimatedReadyDate: "2023-05-16T16:00:00Z"
  },
  {
    id: "trans-003",
    prescriptionId: "4",
    pharmacyId: "pharm-001",
    status: "error",
    sentDate: "2023-05-12T11:30:00Z",
    errorDetails: "Insurance information outdated"
  },
  {
    id: "trans-004",
    prescriptionId: "2",
    pharmacyId: "pharm-004",
    status: "pending",
    sentDate: "2023-05-17T08:15:00Z"
  }
];

// Helper functions for pharmacy integration
export const getPharmacyById = (id: string): Pharmacy | undefined => {
  return pharmacies.find(pharmacy => pharmacy.id === id);
};

export const getIntegrationByPharmacyId = (pharmacyId: string): PharmacyIntegration | undefined => {
  return pharmacyIntegrations.find(integration => integration.pharmacyId === pharmacyId);
};

export const getTransmissionsByPrescriptionId = (prescriptionId: string): PrescriptionTransmission[] => {
  return prescriptionTransmissions.filter(transmission => transmission.prescriptionId === prescriptionId);
};
