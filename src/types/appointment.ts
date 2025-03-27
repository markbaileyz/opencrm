
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
  location?: string; // Location field
  duration?: number; // Duration in minutes
}

export interface AppointmentWithEmail extends Appointment {
  relatedEmails?: Email[];
}
