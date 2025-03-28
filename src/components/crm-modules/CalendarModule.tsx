
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CalendarModule: React.FC = () => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-1">Calendar & Scheduling</h2>
        <p className="text-muted-foreground">Manage your appointments and schedule</p>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-muted-foreground">
              Calendar functionality is being implemented. You'll be able to manage your appointments and schedule here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarModule;
