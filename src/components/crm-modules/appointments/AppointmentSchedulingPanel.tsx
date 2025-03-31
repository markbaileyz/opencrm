
import React from "react";
import { useCalendarNavigation } from "./hooks/useCalendarNavigation";
import { useAppointmentFiltering } from "./hooks/useAppointmentFiltering";
import CalendarNavigation from "./components/CalendarNavigation";
import AppointmentsList from "./components/AppointmentsList";
import QuickActionsPanel from "./components/QuickActionsPanel";
import { Appointment } from "./types/appointmentTypes";

// Demo data
const appointmentsData: Appointment[] = [
  {
    id: 1,
    patientName: "Sarah Johnson",
    date: "2024-05-15",
    time: "9:00 AM",
    duration: 30,
    type: "Follow-up",
    status: "confirmed",
    provider: "Dr. Michael Lee"
  },
  {
    id: 2,
    patientName: "Robert Williams",
    date: "2024-05-15",
    time: "10:00 AM",
    duration: 45,
    type: "New Patient",
    status: "confirmed",
    provider: "Dr. Emily Chen"
  },
  {
    id: 3,
    patientName: "Emily Davis",
    date: "2024-05-15",
    time: "11:15 AM",
    duration: 30,
    type: "Follow-up",
    status: "pending",
    provider: "Dr. Michael Lee"
  },
  {
    id: 4,
    patientName: "James Wilson",
    date: "2024-05-16",
    time: "9:30 AM",
    duration: 60,
    type: "Consultation",
    status: "confirmed",
    provider: "Dr. Emily Chen"
  },
  {
    id: 5,
    patientName: "Maria Garcia",
    date: "2024-05-16",
    time: "2:00 PM",
    duration: 30,
    type: "Follow-up",
    status: "cancelled",
    provider: "Dr. Michael Lee"
  }
];

const AppointmentSchedulingPanel: React.FC = () => {
  const { 
    currentDate, 
    view, 
    formatDate, 
    navigateDate, 
    handleViewChange 
  } = useCalendarNavigation();
  
  const { filteredAppointments } = useAppointmentFiltering(
    appointmentsData, 
    currentDate, 
    view
  );

  return (
    <div className="space-y-4">
      <CalendarNavigation
        currentDate={currentDate}
        view={view}
        onViewChange={handleViewChange}
        onNavigate={navigateDate}
        formatDate={formatDate}
      />

      <div className="flex space-x-4">
        <div className="flex-1">
          <AppointmentsList appointments={filteredAppointments} />
        </div>
        <div className="w-80">
          <QuickActionsPanel />
        </div>
      </div>
    </div>
  );
};

export default AppointmentSchedulingPanel;
