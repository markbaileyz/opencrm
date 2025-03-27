
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
  color?: string; // Custom color for appointment type
}

export interface AppointmentWithEmail extends Appointment {
  relatedEmails?: Email[];
}

export type AppointmentType = {
  value: string;
  label: string;
  color: string;
  description?: string;
  icon?: string;
};

export const APPOINTMENT_TYPES: AppointmentType[] = [
  { 
    value: "consultation", 
    label: "Consultation", 
    color: "bg-green-100 text-green-800 border-green-300",
    description: "Initial consultation with a client",
    icon: "💬"
  },
  { 
    value: "follow-up", 
    label: "Follow-up", 
    color: "bg-purple-100 text-purple-800 border-purple-300",
    description: "Follow-up meeting with existing client",
    icon: "🔄"
  },
  { 
    value: "check-in", 
    label: "Check-in", 
    color: "bg-blue-100 text-blue-800 border-blue-300",
    description: "Regular check-in with client",
    icon: "✓"
  },
  { 
    value: "review", 
    label: "Review", 
    color: "bg-yellow-100 text-yellow-800 border-yellow-300",
    description: "Review of ongoing work or project",
    icon: "📋"
  },
  { 
    value: "new-client", 
    label: "New Client", 
    color: "bg-orange-100 text-orange-800 border-orange-300",
    description: "Meeting with a new client",
    icon: "👋"
  },
  { 
    value: "email-follow-up", 
    label: "Email Follow-up", 
    color: "bg-sky-100 text-sky-800 border-sky-300",
    description: "Follow-up from an email conversation",
    icon: "📧"
  }
];

export const getAppointmentTypeInfo = (typeValue: string): AppointmentType => {
  const type = APPOINTMENT_TYPES.find(t => t.value === typeValue.toLowerCase());
  return type || APPOINTMENT_TYPES[0]; // Default to consultation if type not found
};
