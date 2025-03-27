
import React from "react";
import { format } from "date-fns";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarClock, CalendarPlus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AppointmentItem from "@/components/dashboard/AppointmentItem";
import AppointmentPopover from "@/components/calendar/AppointmentPopover";
import type { Appointment } from "@/types/appointment";
import type { Email } from "@/types/email";

interface DailyAppointmentsProps {
  selectedDate: Date;
  appointments: Appointment[];
  emails: Email[];
  onAddAppointment: () => void;
  onEditAppointment: (id: string) => void;
  onDeleteAppointment: (id: string) => void;
  onReminderSent: (appointmentId: string) => void;
  onViewEmail: (emailId: string) => void;
  findRelatedEmails: (emails: Email[], appointment: Appointment) => Email[];
}

const DailyAppointments = ({
  selectedDate,
  appointments,
  emails,
  onAddAppointment,
  onEditAppointment,
  onDeleteAppointment,
  onReminderSent,
  onViewEmail,
  findRelatedEmails
}: DailyAppointmentsProps) => {
  
  const selectedDateAppointments = appointments.filter(
    (appointment) => format(appointment.date, 'PP') === format(selectedDate, 'PP')
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointments for {format(selectedDate, 'PPP')}</CardTitle>
      </CardHeader>
      <CardContent>
        {selectedDateAppointments.length > 0 ? (
          <div className="space-y-4">
            {selectedDateAppointments.map((appointment) => (
              <Popover key={appointment.id}>
                <PopoverTrigger asChild>
                  <div className="cursor-pointer">
                    <AppointmentItem
                      name={appointment.name}
                      time={appointment.time}
                      type={appointment.type}
                      status={appointment.status}
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <AppointmentPopover
                    appointment={appointment}
                    relatedEmails={findRelatedEmails(emails, appointment)}
                    onEditAppointment={onEditAppointment}
                    onDeleteAppointment={onDeleteAppointment}
                    onReminderSent={onReminderSent}
                    onViewEmail={onViewEmail}
                  />
                </PopoverContent>
              </Popover>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CalendarClock className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No appointments for this date</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={onAddAppointment}
            >
              <CalendarPlus className="h-4 w-4 mr-2" />
              Add Appointment
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DailyAppointments;
