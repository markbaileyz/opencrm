
export interface CallRecord {
  id: string;
  type: 'incoming' | 'outgoing' | 'missed' | 'scheduled';
  contactName: string;
  phoneNumber: string;
  timestamp: string;
  duration: number; // in seconds
  purpose?: string;
  notes?: string;
  organization?: string;
  contactRole?: string;
  patientName?: string;
  followUp?: {
    date: string;
    status: 'pending' | 'completed';
    notes?: string;
  };
  relatedRecords?: Array<{
    id: string;
    type: 'appointment' | 'patient' | 'organization' | 'deal';
    name: string;
  }>;
  createdBy: string;
  createdAt: string;
}
