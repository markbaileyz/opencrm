
export type ContactStatus = "lead" | "prospect" | "customer" | "inactive";
export type ContactPriority = "low" | "medium" | "high";
export type FollowUpStatus = "none" | "pending" | "completed" | "overdue";

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  lastContact: string;
  status: ContactStatus;
  notes: string;
  profileImage?: string;
  tags?: string[];
  priority?: ContactPriority;
  activities?: ContactActivity[];
  followUp?: FollowUp;
}

export interface FollowUp {
  id: string;
  contactId: string;
  dueDate: string;
  description: string;
  status: FollowUpStatus;
  priority: ContactPriority;
}

export interface ContactActivity {
  id: string;
  contactId: string;
  type: "email" | "call" | "meeting" | "note";
  date: string;
  description: string;
}
