
export type CallDirection = "inbound" | "outbound";
export type CallStatus = "completed" | "missed" | "scheduled" | "cancelled";
export type CallPriority = "normal" | "urgent" | "follow-up";

export interface CallRecord {
  id: string;
  patientId: string;
  direction: CallDirection;
  status: CallStatus;
  priority: CallPriority;
  timestamp: string;
  duration?: number; // in seconds
  notes?: string;
  followUpRequired?: boolean;
  followUpDate?: string;
  staffMember?: string;
  tags?: string[];
  recordingUrl?: string;
}

export interface CallStats {
  totalCalls: number;
  inboundCalls: number;
  outboundCalls: number;
  missedCalls: number;
  averageDuration: number; // in seconds
  callsByDay: { date: string; count: number }[];
}
