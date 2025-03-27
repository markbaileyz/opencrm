
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Check, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCalendarEmailIntegration } from "@/hooks/useCalendarEmailIntegration";
import type { Email } from "@/types/email";
import type { Appointment } from "@/types/appointment";

interface EmailAppointmentLinkProps {
  email: Email;
  existingAppointments?: Appointment[];
  onAppointmentCreated?: (appointment: Appointment) => void;
}

const EmailAppointmentLink = ({ 
  email, 
  existingAppointments = [],
  onAppointmentCreated
}: EmailAppointmentLinkProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [creating, setCreating] = useState(false);
  const { createAppointmentFromEmail } = useCalendarEmailIntegration();
  
  const hasAssociatedAppointment = existingAppointments.some(
    app => app.emailThreadId === email.id
  );
  
  const handleCreateAppointment = () => {
    navigate(`/calendar?emailId=${email.id}`);
    
    toast({
      title: "Creating appointment",
      description: "Navigating to calendar to create an appointment from this email",
      variant: "default"
    });
  };
  
  const handleQuickCreate = async () => {
    setCreating(true);
    
    // Create a default appointment for next business day at 10:00 AM
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    // Skip weekends
    if (nextDay.getDay() === 0) nextDay.setDate(nextDay.getDate() + 1); // Sunday
    if (nextDay.getDay() === 6) nextDay.setDate(nextDay.getDate() + 2); // Saturday
    
    const newAppointment = createAppointmentFromEmail(email, nextDay, "10:00 AM");
    
    setTimeout(() => {
      setCreating(false);
      if (onAppointmentCreated) {
        onAppointmentCreated(newAppointment);
      }
    }, 500);
  };

  if (hasAssociatedAppointment) {
    return (
      <Button variant="outline" size="sm" onClick={handleCreateAppointment} className="gap-1">
        <Check className="h-4 w-4 text-green-500" />
        Appointment Scheduled
      </Button>
    );
  }
  
  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={handleCreateAppointment}>
        <Calendar className="h-4 w-4 mr-1" />
        Schedule Meeting
      </Button>
      <Button variant="secondary" size="sm" onClick={handleQuickCreate} disabled={creating}>
        {creating ? (
          <>
            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            Creating...
          </>
        ) : (
          <>
            <Calendar className="h-4 w-4 mr-1" />
            Quick Schedule
          </>
        )}
      </Button>
    </div>
  );
};

export default EmailAppointmentLink;
