
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import AppointmentList from "@/components/dashboard/AppointmentList";
import EmailIntegrationSection from "@/components/calendar/EmailIntegrationSection";

// Import custom hooks
import { useCalendar } from "@/hooks/useCalendar";
import { useAppointmentActions } from "@/hooks/useAppointmentActions";
import { useCalendarEmailIntegration } from "@/hooks/useCalendarEmailIntegration";

// Import refactored components
import CalendarHeader from "@/components/calendar/CalendarHeader";
import CalendarMainContent from "@/components/calendar/CalendarMainContent";

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
        
        <div className="mt-6">
          <AppointmentList />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Calendar;
