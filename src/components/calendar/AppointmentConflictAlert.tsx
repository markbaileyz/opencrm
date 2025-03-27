
import React from "react";
import { format } from "date-fns";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { Appointment } from "@/types/appointment";

interface AppointmentConflictAlertProps {
  appointment: Appointment;
  conflictingAppointment: Appointment;
}

const AppointmentConflictAlert = ({ 
  appointment, 
  conflictingAppointment 
}: AppointmentConflictAlertProps) => {
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Scheduling Conflict Detected</AlertTitle>
      <AlertDescription>
        <p className="mt-1">
          Your appointment <strong>{appointment.title}</strong> with {appointment.name} at {appointment.time} on {format(appointment.date, 'PPP')} 
          conflicts with an existing appointment: <strong>{conflictingAppointment.title}</strong> with {conflictingAppointment.name} 
          at {conflictingAppointment.time}.
        </p>
        <p className="mt-2">
          Please choose a different time or date.
        </p>
      </AlertDescription>
    </Alert>
  );
};

export default AppointmentConflictAlert;
