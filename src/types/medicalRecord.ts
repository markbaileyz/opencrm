
export interface MedicalRecord {
  id: string;
  patientId: string;
  recordType: "visit" | "lab" | "imaging" | "procedure" | "vaccination" | "allergy" | "diagnosis" | "note";
  title: string;
  date: string;
  provider: string;
  facility?: string;
  description: string;
  attachments?: string[];
  status: "draft" | "final" | "amended";
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MedicalRecordFilter {
  recordType?: string[];
  dateRange?: { from: string; to: string };
  provider?: string[];
  status?: string[];
  searchTerm?: string;
}

export interface MedicalRecordStats {
  totalRecords: number;
  recordsByType: {
    type: string;
    count: number;
  }[];
  recentActivity: {
    date: string;
    count: number;
  }[];
}
