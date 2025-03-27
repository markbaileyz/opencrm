
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CalendarView from "@/components/calendar/CalendarView";
import DailyAppointments from "@/components/calendar/DailyAppointments";
import AppointmentDetails from "@/components/calendar/AppointmentDetails";
import type { Appointment } from "@/types/appointment";
import type { Email } from "@/types/email";

interface CalendarMainContentProps {
  currentMonth: Date;
  selectedDate: Date;
  appointments: Appointment[];
  emails: Email[];
  onDateSelect: (date: Date | undefined) => void;
  onMonthChange: (date: Date) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onAddAppointment: () => void;
  onEditAppointment: (id: string) => void;
  onDeleteAppointment: (id: string) => void;
  onReminderSent: (appointmentId: string) => void;
  onViewEmail: (emailId: string) => void;
  findRelatedEmails: (emails: Email[], appointment: Appointment) => Email[];
}

const CalendarMainContent: React.FC<CalendarMainContentProps> = ({
  currentMonth,
  selectedDate,
  appointments,
  emails,
  onDateSelect,
  onMonthChange,
  onPrevMonth,
  onNextMonth,
  onAddAppointment,
  onEditAppointment,
  onDeleteAppointment,
  onReminderSent,
  onViewEmail,
  findRelatedEmails
}) => {
  // Filter appointments for selected date
  const selectedAppointment = appointments.find(
    app => app.id === "selected" // This would be replaced with actual selection logic
  );
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CalendarView
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                appointments={appointments}
                onDateSelect={onDateSelect}
                onMonthChange={onMonthChange}
                onPrevMonth={onPrevMonth}
                onNextMonth={onNextMonth}
              />
            </div>
            
            <div className="lg:col-span-1">
              <DailyAppointments
                selectedDate={selectedDate}
                appointments={appointments}
                emails={emails}
                onAddAppointment={onAddAppointment}
                onEditAppointment={onEditAppointment}
                onDeleteAppointment={onDeleteAppointment}
                onReminderSent={onReminderSent}
                onViewEmail={onViewEmail}
                findRelatedEmails={findRelatedEmails}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="list">
          <div className="grid grid-cols-1 gap-4">
            {appointments.map(appointment => (
              <div 
                key={appointment.id} 
                className="border rounded-md p-4 hover:bg-accent cursor-pointer"
                onClick={() => onEditAppointment(appointment.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{appointment.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {appointment.time} with {appointment.name}
                    </p>
                  </div>
                  <div className="text-sm">
                    {appointment.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {selectedAppointment && (
        <AppointmentDetails
          appointment={selectedAppointment}
          relatedEmails={findRelatedEmails(emails, selectedAppointment)}
          onEditAppointment={(app) => onEditAppointment(app.id)}
          onDeleteAppointment={onDeleteAppointment}
          onReminderSent={onReminderSent}
          onViewEmail={onViewEmail}
        />
      )}
    </div>
  );
};

export default CalendarMainContent;
