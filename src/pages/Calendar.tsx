
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import CalendarView from "@/components/calendar/CalendarView";
import { format } from "date-fns";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Sample appointments - in a real app these would come from an API or context
  const appointments = [
    {
      id: '1',
      title: 'Dr. Smith with Patient Johnson',
      start: new Date(2023, 9, 15, 10, 0),
      end: new Date(2023, 9, 15, 10, 30),
      patientId: 'p123',
      patientName: 'Sarah Johnson',
      type: 'follow-up',
      status: 'confirmed',
    },
    {
      id: '2',
      title: 'Dr. Garcia with Patient Thompson',
      start: new Date(2023, 9, 15, 11, 0),
      end: new Date(2023, 9, 15, 11, 45),
      patientId: 'p456',
      patientName: 'Michael Thompson',
      type: 'new-patient',
      status: 'confirmed',
    },
  ];
  
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };
  
  const handleMonthChange = (date: Date) => {
    setCurrentMonth(date);
  };
  
  const handleAppointmentSelect = (appointmentId: string) => {
    console.log(`Appointment selected: ${appointmentId}`);
  };
  
  const handleCreateAppointment = (date: Date) => {
    console.log(`Create appointment for: ${format(date, 'PPP')}`);
  };
  
  const handleViewChange = (view: string) => {
    console.log(`View changed to: ${view}`);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold mb-6">Calendar</h1>
        <CalendarView 
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          appointments={appointments}
          onDateSelect={handleDateSelect}
          onMonthChange={handleMonthChange}
          onAppointmentSelect={handleAppointmentSelect}
          onCreateAppointment={handleCreateAppointment}
          onViewChange={handleViewChange}
        />
      </div>
    </DashboardLayout>
  );
};

export default Calendar;
