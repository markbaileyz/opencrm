
import React from "react";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Appointment Item Component
interface AppointmentItemProps {
  name: string;
  time: string;
  type: string;
  status: "completed" | "upcoming" | "canceled";
  className?: string;
}

const AppointmentItem = ({ name, time, type, status, className }: AppointmentItemProps) => {
  // Dynamic styling based on appointment status
  const statusClasses = {
    completed: "text-green-500",
    upcoming: "text-primary",
    canceled: "text-red-500",
  };

  // Get the appropriate status icon
  const StatusIcon = () => {
    switch (status) {
      case "completed":
        return <CheckCircle className={`h-5 w-5 ${statusClasses.completed}`} />;
      case "upcoming":
        return <Clock className={`h-5 w-5 ${statusClasses.upcoming}`} />;
      case "canceled":
        return <AlertCircle className={`h-5 w-5 ${statusClasses.canceled}`} />;
      default:
        return <Clock className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <div className={cn(
      "flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors",
      status === "canceled" && "opacity-70",
      className
    )}>
      <div className="flex items-center">
        <div className="mr-3">
          <StatusIcon />
        </div>
        <div>
          <p className={cn(
            "font-medium text-sm",
            status === "canceled" && "line-through"
          )}>
            {name}
          </p>
          <p className="text-xs text-muted-foreground">{type}</p>
        </div>
      </div>
      <div className={cn(
        "text-sm",
        statusClasses[status]
      )}>
        {time}
      </div>
    </div>
  );
};

export default AppointmentItem;
