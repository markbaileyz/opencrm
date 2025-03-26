
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppointmentItem from "./AppointmentItem";

const AppointmentList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Meetings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <AppointmentItem
            name="Sarah Johnson"
            time="9:00 AM"
            type="Check-in"
            status="completed"
          />
          <AppointmentItem
            name="Robert Chen"
            time="10:30 AM"
            type="Follow-up"
            status="completed"
          />
          <AppointmentItem
            name="Emily Davis"
            time="1:15 PM"
            type="Consultation"
            status="upcoming"
          />
          <AppointmentItem
            name="Michael Williams"
            time="3:00 PM"
            type="New Client"
            status="upcoming"
          />
          <AppointmentItem
            name="Jessica Brown"
            time="4:30 PM"
            type="Review"
            status="upcoming"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentList;
