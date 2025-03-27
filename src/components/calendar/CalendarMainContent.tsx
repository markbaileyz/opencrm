
import React from "react";
import CalendarView from "@/components/calendar/CalendarView";
import DailyAppointments from "@/components/calendar/DailyAppointments";
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <CalendarView
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        appointments={appointments}
        onDateSelect={onDateSelect}
        onMonthChange={onMonthChange}
        onPrevMonth={onPrevMonth}
        onNextMonth={onNextMonth}
      />
      
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
  );
};

export default CalendarMainContent;
