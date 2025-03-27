
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { format, isSameDay } from "date-fns";
import type { Appointment, AppointmentWithEmail } from "@/types/appointment";
import type { Email } from "@/types/email";
import { formatAppointmentForEmail } from "@/utils/calendarEmailUtils";

export function useCalendarEmailIntegration() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Create a calendar appointment from an email
  const createAppointmentFromEmail = (email: Email, date: Date, time: string): Appointment => {
    const newAppointment: Appointment = {
      id: `app-${Date.now()}`,
      title: `Meeting re: ${email.subject}`,
      date: date,
      time: time,
      type: "Email Follow-up",
      name: email.senderName,
      status: "upcoming",
      notes: `Follow-up from email: ${email.subject}`,
      emailThreadId: email.id,
      reminderSent: false
    };
    
    toast({
      title: "Appointment created from email",
      description: `Appointment with ${email.senderName} scheduled for ${format(date, 'PPP')} at ${time}`,
      variant: "success"
    });
    
    return newAppointment;
  };
  
  // Navigate to email page to view an email
  const navigateToEmail = (emailId: string) => {
    navigate(`/email?emailId=${emailId}`);
    toast({
      title: "Navigating to email",
      description: "Opening the related email thread",
    });
  };
  
  // Send an email reminder for an appointment
  const sendAppointmentReminder = async (appointment: Appointment): Promise<boolean> => {
    setIsProcessing(true);
    
    try {
      // Create email content based on appointment details
      const emailContent = formatAppointmentForEmail(appointment);
      
      // Simulate sending email reminder
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsProcessing(false);
      toast({
        title: "Reminder email sent",
        description: `Reminder sent for appointment with ${appointment.name}`,
        variant: "success"
      });
      
      return true;
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: "Failed to send reminder",
        description: "Could not send the appointment reminder email",
        variant: "destructive"
      });
      
      return false;
    }
  };
  
  // Find emails related to an appointment
  const findRelatedEmails = (emails: Email[], appointment: Appointment): Email[] => {
    if (!appointment.emailThreadId) {
      // If no direct thread ID, try to match by name/subject
      return emails.filter(email => 
        email.senderName.toLowerCase().includes(appointment.name.toLowerCase()) ||
        email.subject.toLowerCase().includes(appointment.title.toLowerCase())
      );
    }
    
    // Return emails from the same thread
    return emails.filter(email => email.id === appointment.emailThreadId);
  };

  // Find appointments for a specific date
  const findAppointmentsForDate = (appointments: Appointment[], date: Date): Appointment[] => {
    return appointments.filter(appointment => {
      const appointmentDate = typeof appointment.date === 'string' 
        ? new Date(appointment.date) 
        : appointment.date;
      
      return isSameDay(appointmentDate, date);
    });
  };

  // Check if email has any related appointments
  const hasRelatedAppointments = (email: Email, appointments: Appointment[]): boolean => {
    return appointments.some(appointment => appointment.emailThreadId === email.id);
  };

  return {
    createAppointmentFromEmail,
    navigateToEmail,
    sendAppointmentReminder,
    findRelatedEmails,
    findAppointmentsForDate,
    hasRelatedAppointments,
    isProcessing
  };
}
