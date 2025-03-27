
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useCalendarEmailIntegration } from "@/hooks/useCalendarEmailIntegration";
import type { Email } from "@/types/email";
import type { Appointment, AppointmentWithEmail } from "@/types/appointment";

export function useAppointmentEmailIntegration(
  emails: Email[] = [],
  appointments: Appointment[] = []
) {
  const [emailIdFromUrl, setEmailIdFromUrl] = useState<string | null>(null);
  const [appointmentsWithEmails, setAppointmentsWithEmails] = useState<AppointmentWithEmail[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { findRelatedEmails, createAppointmentFromEmail } = useCalendarEmailIntegration();

  // Extract email ID from URL if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailId = params.get("emailId");
    if (emailId) {
      setEmailIdFromUrl(emailId);
    } else {
      setEmailIdFromUrl(null);
    }
  }, [location.search]);

  // Find the email referenced in the URL
  const emailFromUrl = emails.find(email => email.id === emailIdFromUrl);

  // Connect appointments with their related emails
  useEffect(() => {
    const enhanced = appointments.map(appointment => {
      const relatedEmails = findRelatedEmails(emails, appointment);
      return {
        ...appointment,
        relatedEmails
      };
    });

    setAppointmentsWithEmails(enhanced);
  }, [appointments, emails]);

  // Create an appointment from the email in the URL
  const createAppointmentFromUrlEmail = (date: Date, time: string) => {
    if (!emailFromUrl) {
      toast({
        title: "Error",
        description: "No email found to create appointment from",
        variant: "destructive"
      });
      return null;
    }

    const newAppointment = createAppointmentFromEmail(emailFromUrl, date, time);
    
    // Clear the URL parameter
    navigate("/calendar", { replace: true });
    
    return newAppointment;
  };

  // Get appointments related to a specific email
  const getAppointmentsForEmail = (emailId: string): Appointment[] => {
    return appointments.filter(app => 
      app.emailThreadId === emailId || 
      findRelatedEmails(emails, app).some(e => e.id === emailId)
    );
  };

  // Get emails related to a specific appointment
  const getEmailsForAppointment = (appointmentId: string): Email[] => {
    const appointment = appointments.find(app => app.id === appointmentId);
    if (!appointment) return [];
    
    return findRelatedEmails(emails, appointment);
  };

  // Navigate to email from appointment
  const viewEmailFromAppointment = (appointmentId: string) => {
    const appointment = appointments.find(app => app.id === appointmentId);
    if (appointment?.emailThreadId) {
      navigate(`/email?emailId=${appointment.emailThreadId}`);
    } else {
      toast({
        title: "No linked email",
        description: "This appointment doesn't have a directly linked email",
        variant: "default"
      });
    }
  };

  return {
    emailFromUrl,
    appointmentsWithEmails,
    createAppointmentFromUrlEmail,
    getAppointmentsForEmail,
    getEmailsForAppointment,
    viewEmailFromAppointment
  };
}
