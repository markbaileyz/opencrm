
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
}
