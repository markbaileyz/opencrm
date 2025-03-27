
import { Email } from "./email";

export interface Appointment {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: string;
  name: string;
  status: "upcoming" | "completed" | "canceled";
  notes?: string;
  emailThreadId?: string; // Reference to related email thread
  reminderSent?: boolean;
  location?: string; // Added location field
}

export interface AppointmentWithEmail extends Appointment {
  relatedEmails?: Email[];
}
