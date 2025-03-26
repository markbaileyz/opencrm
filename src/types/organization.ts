
export interface Organization {
  id: string;
  name: string;
  type: OrganizationType;
  address: string;
  phone: string;
  email: string;
  website?: string;
  contactPersonName?: string;
  contactPersonEmail?: string;
  contactPersonPhone?: string;
  status: OrganizationStatus;
  notes?: string;
  specialties?: string[];
  size?: OrganizationSize;
  createdAt: string;
  updatedAt: string;
}

export type OrganizationType = 
  | "Hospital"
  | "Clinic"
  | "Laboratory"
  | "Pharmacy"
  | "Insurance"
  | "SpecialtyCare"
  | "RehabCenter"
  | "NursingHome"
  | "HomeHealthcare"
  | "Other";

export type OrganizationStatus = 
  | "Active"
  | "Inactive"
  | "Pending"
  | "Archived";

export type OrganizationSize =
  | "Small"
  | "Medium"
  | "Large"
  | "Enterprise";

export interface OrganizationFilters {
  search?: string;
  type?: OrganizationType;
  status?: OrganizationStatus;
  size?: OrganizationSize;
}

