
import { useMemo } from "react";
import { Appointment } from "../types/appointmentTypes";

export const useAppointmentFiltering = (
  appointments: Appointment[],
  currentDate: Date,
  view: "day" | "week" | "month"
) => {
  // Filter appointments based on the current date and view
  const filteredAppointments = useMemo(() => {
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      
      if (view === "day") {
        return appointmentDate.toDateString() === currentDate.toDateString();
      } else if (view === "week") {
        // Get the start of the week (Sunday) for both dates
        const startOfWeek = (date: Date) => {
          const d = new Date(date);
          const day = d.getDay();
          d.setDate(d.getDate() - day);
          return d;
        };
        
        return startOfWeek(appointmentDate).toDateString() === startOfWeek(currentDate).toDateString();
      } else {
        // Monthly view
        return (
          appointmentDate.getMonth() === currentDate.getMonth() &&
          appointmentDate.getFullYear() === currentDate.getFullYear()
        );
      }
    });
  }, [appointments, currentDate, view]);

  return { filteredAppointments };
};
