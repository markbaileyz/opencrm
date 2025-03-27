
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { BellRing, CheckCircle, Loader2 } from "lucide-react";
import { useCalendarEmailIntegration } from "@/hooks/useCalendarEmailIntegration";
import type { Appointment } from "@/types/appointment";

interface AppointmentReminderProps {
  appointment: Appointment;
  onReminderSent: (appointmentId: string) => void;
}

const AppointmentReminder = ({ appointment, onReminderSent }: AppointmentReminderProps) => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(appointment.reminderSent || false);
  const { sendAppointmentReminder } = useCalendarEmailIntegration();
  
  const handleSendReminder = async () => {
    if (sending || sent) return;
    
    setSending(true);
    const success = await sendAppointmentReminder(appointment);
    
    if (success) {
      setSent(true);
      onReminderSent(appointment.id);
    }
    
    setSending(false);
  };
  
  return (
    <Button 
      variant={sent ? "outline" : "secondary"}
      size="sm"
      onClick={handleSendReminder}
      disabled={sending || sent}
      className="ml-2"
    >
      {sending ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Sending...
        </>
      ) : sent ? (
        <>
          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
          Reminder Sent
        </>
      ) : (
        <>
          <BellRing className="h-4 w-4 mr-2" />
          Send Reminder
        </>
      )}
    </Button>
  );
};

export default AppointmentReminder;
