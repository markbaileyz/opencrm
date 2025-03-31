
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import CalendarView from "@/components/calendar/CalendarView";

const Calendar = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-2xl font-bold mb-6">Calendar</h1>
        <CalendarView />
      </div>
    </DashboardLayout>
  );
};

export default Calendar;
