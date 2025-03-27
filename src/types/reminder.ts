
export interface AppointmentReminder {
  appointmentId: string;
  status: 'pending' | 'sent' | 'failed';
  sentAt?: Date;
  scheduledFor?: Date;
  emailSubject?: string;
  recipientEmail?: string;
}

export interface ReminderSettings {
  defaultReminderTime: number; // Hours before appointment
  autoSendReminders: boolean;
  reminderTemplate: string;
  includeAppointmentDetails: boolean;
  sendCopy: boolean;
  copyTo?: string;
}
