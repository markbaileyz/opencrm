
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CalendarView from "@/components/calendar/CalendarView";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import { useCalendar } from "@/hooks/useCalendar";

const CalendarModule: React.FC = () => {
  const calendar = useCalendar();
  
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-1">Calendar & Scheduling</h2>
        <p className="text-muted-foreground">Manage your appointments and schedule</p>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>
            <CalendarHeader />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CalendarView />
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarModule;
