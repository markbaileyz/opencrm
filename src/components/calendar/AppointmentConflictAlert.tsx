
import React from "react";
import { format } from "date-fns";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { Appointment } from "@/types/appointment";
import AppointmentTypeBadge from "./AppointmentTypeBadge";

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
        <div className="mt-1 space-y-2">
          <p>
            Your appointment <strong>{appointment.title}</strong> with {appointment.name} 
            at {appointment.time} on {format(appointment.date, 'PPP')} conflicts with:
          </p>
          <div className="bg-destructive/10 p-2 rounded border border-destructive/30">
            <div className="flex items-center gap-2 mb-1">
              <strong>{conflictingAppointment.title}</strong>
              <AppointmentTypeBadge type={conflictingAppointment.type} size="sm" />
            </div>
            <p className="text-sm">
              With: {conflictingAppointment.name} at {conflictingAppointment.time}
            </p>
          </div>
          <p className="font-medium">
            Please choose a different time or date.
          </p>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default AppointmentConflictAlert;
