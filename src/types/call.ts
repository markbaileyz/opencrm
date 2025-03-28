export interface CallRecord {
  id: string;
  name: string;
  phone: string;
  date: string;
  timestamp?: string;
  duration: number;
  notes: string;
  type: "incoming" | "outgoing" | "missed" | "scheduled";
  
  // Additional fields being used by components
  contactName?: string;
  phoneNumber?: string;
  contactRole?: string;
  organization?: string;
  patientName?: string;
  purpose?: string;
  tags?: string[];
  followUp?: {
    status: "pending" | "completed";
    date: string;
    notes?: string;
  };
  relatedRecords?: Array<{
    type: string;
    name: string;
    id?: string;
  }>;
  recordingUrl?: string;
  createdBy?: string;
  createdAt?: string;
  contactId?: string;
  organizationId?: string;
  organizationName?: string;
  direction?: "inbound" | "outbound";
  status?: "completed" | "missed" | "scheduled";
}

// Add a helper function to convert between the different call record formats
export function normalizeCallRecord(call: any): CallRecord {
  return {
    id: call.id,
    name: call.contactName || call.name || '',
    phone: call.phoneNumber || call.phone || '',
    date: call.timestamp || call.date || new Date().toISOString(),
    timestamp: call.timestamp || call.date || new Date().toISOString(),
    duration: call.duration || 0,
    notes: call.notes || '',
    type: call.type || (call.status === 'missed' ? 'missed' : call.direction === 'inbound' ? 'incoming' : 'outgoing'),
    
    // Keep all additional fields
    ...call
  };
}
