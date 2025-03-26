
import React from "react";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

// Appointment Item Component
interface AppointmentItemProps {
  name: string;
  time: string;
  type: string;
  status: "completed" | "upcoming" | "canceled";
}

const AppointmentItem = ({ name, time, type, status }: AppointmentItemProps) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors">
      <div className="flex items-center">
        <div className="mr-3">
          {status === "completed" ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : status === "upcoming" ? (
            <Clock className="h-5 w-5 text-primary" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-500" />
          )}
        </div>
        <div>
          <p className="font-medium text-sm">{name}</p>
          <p className="text-xs text-muted-foreground">{type}</p>
        </div>
      </div>
      <div className="text-sm">{time}</div>
    </div>
  );
};

export default AppointmentItem;
