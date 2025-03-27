
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarPlus } from "lucide-react";

// Import custom hooks
import { useCalendar } from "@/hooks/useCalendar";
import { useAppointmentActions } from "@/hooks/useAppointmentActions";
import { useCalendarEmailIntegration } from "@/hooks/useCalendarEmailIntegration";

// Import refactored components
import CalendarHeader from "@/components/calendar/CalendarHeader";
import CalendarMainContent from "@/components/calendar/CalendarMainContent";
import EmailIntegrationSection from "@/components/calendar/EmailIntegrationSection";
import AppointmentForm from "@/components/calendar/AppointmentForm";

const Calendar = () => {
  const {
    currentMonth,
    setCurrentMonth,
    selectedDate,
    setSelectedDate,
    isAddAppointmentOpen,
    setIsAddAppointmentOpen,
    isBatchModeOpen,
    setIsBatchModeOpen,
    isRecurringModeOpen,
    setIsRecurringModeOpen,
    editAppointmentId,
    setEditAppointmentId,
    appointments,
    setAppointments,
    emails,
    nextMonth,
    prevMonth,
    handleDateSelect
  } = useCalendar();

  const { findRelatedEmails } = useCalendarEmailIntegration();

  const {
    handleAddAppointment,
    handleBatchAppointmentsCreated,
    handleEditAppointment,
    handleDeleteAppointment,
    handleSendReminder,
    handleGoToEmail,
    navigateToEmail
  } = useAppointmentActions({
    appointments,
    setAppointments,
    selectedDate,
    setIsAddAppointmentOpen,
    editAppointmentId,
    setEditAppointmentId
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-semibold">Calendar</h1>
          <Button onClick={() => setIsAddAppointmentOpen(true)}>
            <CalendarPlus className="mr-2 h-4 w-4" />
            New Appointment
          </Button>
        </div>
        
        <CalendarHeader
          selectedDate={selectedDate}
          editAppointmentId={editAppointmentId}
          appointments={appointments}
          emails={emails}
          isAddAppointmentOpen={isAddAppointmentOpen}
          setIsAddAppointmentOpen={setIsAddAppointmentOpen}
          isBatchModeOpen={isBatchModeOpen}
          setIsBatchModeOpen={setIsBatchModeOpen}
          isRecurringModeOpen={isRecurringModeOpen}
          setIsRecurringModeOpen={setIsRecurringModeOpen}
          onAddAppointment={handleAddAppointment}
          onBatchAppointmentsCreated={handleBatchAppointmentsCreated}
          onGoToEmail={handleGoToEmail}
        />
        
        <CalendarMainContent
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          appointments={appointments}
          emails={emails}
          onDateSelect={handleDateSelect}
          onMonthChange={setCurrentMonth}
          onPrevMonth={prevMonth}
          onNextMonth={nextMonth}
          onAddAppointment={() => setIsAddAppointmentOpen(true)}
          onEditAppointment={handleEditAppointment}
          onDeleteAppointment={handleDeleteAppointment}
          onReminderSent={handleSendReminder}
          onViewEmail={navigateToEmail}
          findRelatedEmails={findRelatedEmails}
        />
        
        <EmailIntegrationSection onGoToEmail={handleGoToEmail} />
        
        <Dialog open={isAddAppointmentOpen} onOpenChange={setIsAddAppointmentOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editAppointmentId ? "Edit Appointment" : "New Appointment"}
              </DialogTitle>
            </DialogHeader>
            <AppointmentForm
              selectedDate={selectedDate}
              editAppointmentId={editAppointmentId}
              appointments={appointments}
              emails={emails}
              onSubmit={handleAddAppointment}
            />
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Calendar;
