
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { BellRing, CheckCircle, Loader2, Clock } from "lucide-react";
import { useCalendarEmailIntegration } from "@/hooks/useCalendarEmailIntegration";
import { format, addHours } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Appointment } from "@/types/appointment";

interface AppointmentReminderProps {
  appointment: Appointment;
  onReminderSent: (appointmentId: string) => void;
  autoSend?: boolean;
  reminderHours?: number;
}

const AppointmentReminder = ({ 
  appointment, 
  onReminderSent, 
  autoSend = false,
  reminderHours = 24
}: AppointmentReminderProps) => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(appointment.reminderSent || false);
  const { sendAppointmentReminder } = useCalendarEmailIntegration();
  
  // Calculate when the reminder will be sent if auto-send is enabled
  const getReminderTime = () => {
    const appointmentDate = new Date(appointment.date);
    const reminderTime = addHours(appointmentDate, -reminderHours);
    return format(reminderTime, "PPP 'at' p");
  };
  
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
  
  if (autoSend && !sent) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline"
              size="sm"
              className="ml-2 pointer-events-none"
            >
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              Auto Reminder
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Reminder will be sent automatically on {getReminderTime()}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
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
