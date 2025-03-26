
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";

const Calendar = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Calendar</h1>
          <p className="text-muted-foreground">
            Manage appointments and schedule follow-ups
          </p>
        </div>
        
        <div className="flex justify-center items-center h-64 bg-muted/30 rounded-lg border border-dashed border-muted">
          <p className="text-muted-foreground">Calendar functionality coming soon</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Calendar;
