
import React from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, FileText, Edit, Trash } from "lucide-react";
import AppointmentReminder from "./AppointmentReminder";
import AppointmentRelatedEmails from "./AppointmentRelatedEmails";
import type { Appointment } from "@/types/appointment";
import type { Email } from "@/types/email";

interface AppointmentPopoverProps {
  appointment: Appointment;
  relatedEmails: Email[];
  onEditAppointment: (id: string) => void;
  onDeleteAppointment: (id: string) => void;
  onReminderSent: (appointmentId: string) => void;
  onViewEmail: (emailId: string) => void;
}

const AppointmentPopover = ({
  appointment,
  relatedEmails,
  onEditAppointment,
  onDeleteAppointment,
  onReminderSent,
  onViewEmail,
}: AppointmentPopoverProps) => {
  const statusColors = {
    upcoming: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    canceled: "bg-red-100 text-red-800",
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg">{appointment.title}</h3>
        <Badge className={statusColors[appointment.status]}>
          {appointment.status}
        </Badge>
      </div>
      
      <div className="grid grid-cols-3 gap-1">
        <p className="text-muted-foreground text-sm">Client:</p>
        <p className="col-span-2 text-sm">{appointment.name}</p>
        
        <p className="text-muted-foreground text-sm">Date:</p>
        <p className="col-span-2 text-sm">{format(appointment.date, 'PPP')}</p>
        
        <p className="text-muted-foreground text-sm">Time:</p>
        <p className="col-span-2 text-sm">{appointment.time}</p>
        
        <p className="text-muted-foreground text-sm">Type:</p>
        <p className="col-span-2 text-sm">{appointment.type}</p>
        
        <p className="text-muted-foreground text-sm">Status:</p>
        <p className="col-span-2 text-sm capitalize">{appointment.status}</p>
      </div>
      
      {appointment.notes && (
        <>
          <p className="text-muted-foreground text-sm">Notes:</p>
          <p className="text-sm">{appointment.notes}</p>
        </>
      )}
      
      <div className="flex items-center pt-2 space-x-2">
        <AppointmentReminder 
          appointment={appointment}
          onReminderSent={onReminderSent}
        />
        <AppointmentRelatedEmails
          emails={relatedEmails}
          onViewEmail={onViewEmail}
        />
      </div>
      
      <div className="flex justify-end space-x-2 pt-2">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onEditAppointment(appointment.id)}
        >
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </Button>
        <Button 
          variant="destructive" 
          size="sm"
          onClick={() => onDeleteAppointment(appointment.id)}
        >
          <Trash className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default AppointmentPopover;
