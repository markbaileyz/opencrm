
import React from "react";
import { Button } from "@/components/ui/button";
import { Mail, Trash, Archive, Star, Reply, Forward } from "lucide-react";
import EmailAppointmentLink from "@/components/calendar/EmailAppointmentLink";
import type { Email } from "@/types/email";
import type { Appointment } from "@/types/appointment";

interface EmailDetailActionsProps {
  email: Email;
  onReply: (email: Email) => void;
  onForward: (email: Email) => void;
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
  onStar: (id: string) => void;
  appointments?: Appointment[];
  onAppointmentCreated?: (appointment: Appointment) => void;
}

const EmailDetailActions = ({
  email,
  onReply,
  onForward,
  onDelete,
  onArchive,
  onStar,
  appointments = [],
  onAppointmentCreated,
}: EmailDetailActionsProps) => {
  return (
    <div className="p-2 bg-muted/50 border-t flex flex-wrap gap-2 justify-between">
      <div className="flex flex-wrap gap-2">
        <Button variant="ghost" size="sm" onClick={() => onReply(email)}>
          <Reply className="h-4 w-4 mr-2" />
          Reply
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onForward(email)}>
          <Forward className="h-4 w-4 mr-2" />
          Forward
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onStar(email.id)}
          className={email.starred ? "text-yellow-500" : ""}
        >
          <Star className={`h-4 w-4 mr-2 ${email.starred ? "fill-yellow-500" : ""}`} />
          {email.starred ? "Unstar" : "Star"}
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <EmailAppointmentLink 
          email={email} 
          existingAppointments={appointments}
          onAppointmentCreated={onAppointmentCreated}
        />
        
        <Button variant="ghost" size="sm" onClick={() => onArchive(email.id)}>
          <Archive className="h-4 w-4 mr-2" />
          Archive
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onDelete(email.id)}>
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default EmailDetailActions;
