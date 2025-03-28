
import { useState } from "react";

export const useCalendar = () => {
  // Basic calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  
  // Additional state required by the Calendar component
  const [isAddAppointmentOpen, setIsAddAppointmentOpen] = useState(false);
  const [isBatchModeOpen, setIsBatchModeOpen] = useState(false);
  const [isRecurringModeOpen, setIsRecurringModeOpen] = useState(false);
  const [editAppointmentId, setEditAppointmentId] = useState<string | null>(null);
  const [emails, setEmails] = useState([]);

  // Navigation functions
  const nextMonth = () => {
    const nextMonthDate = new Date(currentMonth);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    setCurrentMonth(nextMonthDate);
  };

  const prevMonth = () => {
    const prevMonthDate = new Date(currentMonth);
    prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
    setCurrentMonth(prevMonthDate);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  return {
    // Original properties
    currentMonth,
    setCurrentMonth,
    selectedDate, 
    setSelectedDate,
    appointments,
    setAppointments,
    
    // New properties required by Calendar
    isAddAppointmentOpen,
    setIsAddAppointmentOpen,
    isBatchModeOpen,
    setIsBatchModeOpen,
    isRecurringModeOpen,
    setIsRecurringModeOpen,
    editAppointmentId,
    setEditAppointmentId,
    emails,
    setEmails,
    nextMonth,
    prevMonth,
    handleDateSelect
  };
};
