
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CalendarView from "@/components/calendar/CalendarView";
import DailyAppointments from "@/components/calendar/DailyAppointments";
import AppointmentDetails from "@/components/calendar/AppointmentDetails";
import UpcomingAppointmentsList from "@/components/calendar/UpcomingAppointmentsList";
import CalendarViewToggle from "@/components/calendar/CalendarViewToggle";
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
  onStatusChange?: (id: string, status: "upcoming" | "completed" | "canceled") => void;
  findRelatedEmails: (emails: Email[], appointment: Appointment) => Email[];
  onDateChange?: (date: Date) => void;
  onQuickAdd?: (appointment: Partial<Appointment>) => void;
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
  onStatusChange,
  findRelatedEmails,
  onDateChange,
  onQuickAdd
}) => {
  const [calendarView, setCalendarView] = useState<'day' | 'week' | 'month'>('month');
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("calendar");
  
  // Find the selected appointment if any
  const selectedAppointment = selectedAppointmentId 
    ? appointments.find(app => app.id === selectedAppointmentId)
    : null;
  
  // Handler for selecting an appointment
  const handleAppointmentSelect = (appointmentId: string) => {
    setSelectedAppointmentId(appointmentId);
  };

  // Handler to close appointment details
  const handleCloseAppointmentDetails = () => {
    setSelectedAppointmentId(null);
  };
  
  return (
    <div className="space-y-6">
      <Tabs 
        defaultValue="calendar" 
        className="w-full"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar" className="space-y-6">
          <CalendarViewToggle 
            currentView={calendarView} 
            onViewChange={setCalendarView} 
          />
          
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
                currentView={calendarView}
                onAppointmentSelect={handleAppointmentSelect}
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
                onAppointmentSelect={handleAppointmentSelect}
                onStatusChange={onStatusChange}
                findRelatedEmails={findRelatedEmails}
                onDateChange={onDateChange}
                onQuickAdd={onQuickAdd}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="list">
          <UpcomingAppointmentsList 
            appointments={appointments}
            onEditAppointment={onEditAppointment}
            onDeleteAppointment={onDeleteAppointment}
            onReminderSent={onReminderSent}
            onAppointmentSelect={handleAppointmentSelect}
            onStatusChange={onStatusChange}
          />
        </TabsContent>
        
        <TabsContent value="upcoming">
          <UpcomingAppointmentsList 
            appointments={appointments.filter(app => app.status === "upcoming")}
            onEditAppointment={onEditAppointment}
            onDeleteAppointment={onDeleteAppointment}
            onReminderSent={onReminderSent}
            onAppointmentSelect={handleAppointmentSelect}
            onStatusChange={onStatusChange}
            showOnlyUpcoming
          />
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
          onClose={handleCloseAppointmentDetails}
          onStatusChange={onStatusChange}
        />
      )}
    </div>
  );
};

export default CalendarMainContent;
