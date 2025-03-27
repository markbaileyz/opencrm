
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";
import type { Email } from "@/types/email";
import type { Appointment } from "@/types/appointment";

interface EmailTemplate {
  subject: string;
  body: string;
}

export function useCalendarEmailIntegration() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const createAppointmentFromEmail = useCallback((email: Email, date: Date, time: string): Appointment => {
    return {
      id: uuidv4(),
      title: `Re: ${email.subject}`,
      date,
      time,
      name: email.senderName,
      type: "follow-up",
      status: "upcoming",
      emailThreadId: email.id
    };
  }, []);

  const findRelatedEmails = useCallback((emails: Email[], appointment: Appointment): Email[] => {
    // Simple implementation to find emails based on subject or sender matching appointment details
    return emails.filter(email => 
      email.subject.includes(appointment.title) || 
      email.senderName === appointment.name ||
      appointment.emailThreadId === email.id
    );
  }, []);

  const sendAppointmentReminder = useCallback(async (
    appointment: Appointment, 
    template?: EmailTemplate
  ): Promise<boolean> => {
    try {
      // This would be replaced with actual email sending logic
      console.log("Sending reminder for appointment:", appointment.id);
      
      if (template) {
        console.log("Using custom template:", template);
      } else {
        console.log("Using default reminder template");
      }
      
      toast({
        title: "Reminder sent",
        description: `Reminder has been sent to ${appointment.name}`,
        variant: "success",
      });
      
      return true;
    } catch (error) {
      console.error("Failed to send reminder:", error);
      
      toast({
        title: "Failed to send reminder",
        description: "There was an error sending the reminder. Please try again.",
        variant: "destructive",
      });
      
      return false;
    }
  }, [toast]);

  return {
    createAppointmentFromEmail,
    findRelatedEmails,
    sendAppointmentReminder
  };
}
