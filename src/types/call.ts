
export interface CallRecord {
  id: string;
  contactName: string;
  phoneNumber: string;
  timestamp: string;
  duration: number;
  type: 'incoming' | 'outgoing' | 'missed' | 'scheduled';
  purpose?: string;
  patientName?: string;
  notes?: string;
  followUpDate?: string;
  assignedTo?: string;
  tags?: string[];
  
  // Additional properties used in components
  name?: string; 
  phone?: string;
  date?: string;
  organization?: string;
  contactRole?: string;
  recordingUrl?: string;
  createdBy?: string;
  createdAt?: string;
  
  // Followup structure
  followUp?: {
    date: string;
    status: 'pending' | 'completed';
    notes?: string;
  };
  
  // Related records
  relatedRecords?: Array<{
    id: string;
    type: string;
    name: string;
  }>;
}
