
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { BellRing, CheckCircle, Loader2, Clock, Mail } from "lucide-react";
import { useCalendarEmailIntegration } from "@/hooks/useCalendarEmailIntegration";
import { format, addHours } from "date-fns";
import { Tooltip } from "@/components/ui/tooltip";
import AppointmentEmailTemplate from "./AppointmentEmailTemplate";
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
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
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
    const success = await sendAppointmentReminder(
      appointment, 
      emailSubject ? { subject: emailSubject, body: emailBody } : undefined
    );
    
    if (success) {
      setSent(true);
      onReminderSent(appointment.id);
    }
    
    setSending(false);
  };

  const handleSelectTemplate = (subject: string, body: string) => {
    setEmailSubject(subject);
    setEmailBody(body);
    setShowTemplateSelector(false);
  };
  
  if (autoSend && !sent) {
    return (
      <Tooltip content={`Reminder will be sent automatically on ${getReminderTime()}`}>
        <Button 
          variant="outline"
          size="sm"
          className="ml-2 pointer-events-none"
        >
          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
          Auto Reminder
        </Button>
      </Tooltip>
    );
  }

  // Show a different button if we have a template selected
  if (emailSubject && !sent) {
    return (
      <div className="flex space-x-2 ml-2">
        <Button 
          variant="secondary"
          size="sm"
          onClick={handleSendReminder}
          disabled={sending}
        >
          {sending ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Mail className="h-4 w-4 mr-2" />
              Send Template
            </>
          )}
        </Button>
        <Button 
          variant="outline"
          size="sm"
          onClick={() => setEmailSubject("")}
        >
          Clear
        </Button>
      </div>
    );
  }
  
  return (
    <div className="flex space-x-2 ml-2">
      <Button 
        variant={sent ? "outline" : "secondary"}
        size="sm"
        onClick={handleSendReminder}
        disabled={sending || sent}
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
      
      {!sent && (
        <AppointmentEmailTemplate 
          appointment={appointment}
          onSelectTemplate={handleSelectTemplate}
        />
      )}
    </div>
  );
};

export default AppointmentReminder;
