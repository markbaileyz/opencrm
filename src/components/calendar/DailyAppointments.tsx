
import React from "react";
import { format } from "date-fns";
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, CalendarPlus, ArrowLeft, ArrowRight } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AppointmentItem from "@/components/dashboard/AppointmentItem";
import AppointmentPopover from "@/components/calendar/AppointmentPopover";
import QuickAddAppointment from "@/components/calendar/QuickAddAppointment";
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
  onAppointmentSelect: (id: string) => void;
  onStatusChange?: (id: string, status: "upcoming" | "completed" | "canceled") => void;
  findRelatedEmails: (emails: Email[], appointment: Appointment) => Email[];
  onDateChange?: (date: Date) => void;
  onQuickAdd?: (appointment: Partial<Appointment>) => void;
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
  onAppointmentSelect,
  onStatusChange,
  findRelatedEmails,
  onDateChange,
  onQuickAdd
}: DailyAppointmentsProps) => {
  
  const selectedDateAppointments = appointments.filter(
    (appointment) => format(new Date(appointment.date), 'PP') === format(selectedDate, 'PP')
  );

  // Status badge styling helper
  const getStatusBadge = (status: "upcoming" | "completed" | "canceled") => {
    switch(status) {
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "canceled":
        return <Badge className="bg-red-100 text-red-800">Canceled</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  // Helper for appointment type color
  const getAppointmentTypeColor = (type: string) => {
    switch(type.toLowerCase()) {
      case "check-in":
        return "border-l-4 border-blue-400";
      case "follow-up":
        return "border-l-4 border-purple-400";
      case "consultation":
        return "border-l-4 border-green-400";
      case "new client":
        return "border-l-4 border-orange-400";
      case "review":
        return "border-l-4 border-yellow-400";
      case "email follow-up":
        return "border-l-4 border-sky-400";
      default:
        return "border-l-4 border-gray-300";
    }
  };
  
  // Handle date navigation
  const handlePrevDay = () => {
    if (onDateChange) {
      const newDate = new Date(selectedDate);
      newDate.setDate(newDate.getDate() - 1);
      onDateChange(newDate);
    }
  };
  
  const handleNextDay = () => {
    if (onDateChange) {
      const newDate = new Date(selectedDate);
      newDate.setDate(newDate.getDate() + 1);
      onDateChange(newDate);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Appointments for {format(selectedDate, 'PPP')}</CardTitle>
          {onDateChange && (
            <div className="flex space-x-1">
              <Button variant="outline" size="icon" onClick={handlePrevDay} className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleNextDay} className="h-8 w-8">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {selectedDateAppointments.length > 0 ? (
          <div className="space-y-4">
            {selectedDateAppointments.map((appointment) => (
              <div 
                key={appointment.id}
                className={`cursor-pointer hover:bg-accent/50 rounded-md transition-colors ${getAppointmentTypeColor(appointment.type)}`}
                onClick={() => onAppointmentSelect(appointment.id)}
              >
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="cursor-pointer pl-2">
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
                      onStatusChange={onStatusChange}
                    />
                  </PopoverContent>
                </Popover>
              </div>
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
      {onQuickAdd && (
        <CardFooter className="pt-2 pb-4">
          <QuickAddAppointment 
            selectedDate={selectedDate} 
            onQuickAdd={onQuickAdd} 
          />
        </CardFooter>
      )}
    </Card>
  );
};

export default DailyAppointments;
