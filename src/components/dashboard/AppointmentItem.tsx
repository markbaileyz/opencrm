
import React from "react";
import { CheckCircle, Clock, AlertCircle, CalendarX, CalendarClock, MapPin, Timer } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// Appointment Item Component
interface AppointmentItemProps {
  name: string;
  time: string;
  type: string;
  status: "completed" | "upcoming" | "canceled";
  className?: string;
  showStatusBadge?: boolean;
  location?: string;
  duration?: number;
}

const AppointmentItem = ({ 
  name, 
  time, 
  type, 
  status, 
  className,
  showStatusBadge = false,
  location,
  duration
}: AppointmentItemProps) => {
  // Dynamic styling based on appointment status
  const statusClasses = {
    completed: "text-green-500",
    upcoming: "text-primary",
    canceled: "text-red-500",
  };

  // Appointment type color mapping
  const typeColorClasses = {
    "check-in": "text-blue-500",
    "follow-up": "text-purple-500",
    "consultation": "text-green-500",
    "new-client": "text-orange-500",
    "review": "text-yellow-500",
    "email-follow-up": "text-sky-500",
  };

  // Get the appropriate status icon
  const StatusIcon = () => {
    switch (status) {
      case "completed":
        return <CheckCircle className={`h-5 w-5 ${statusClasses.completed}`} />;
      case "upcoming":
        return <CalendarClock className={`h-5 w-5 ${statusClasses.upcoming}`} />;
      case "canceled":
        return <CalendarX className={`h-5 w-5 ${statusClasses.canceled}`} />;
      default:
        return <Clock className="h-5 w-5 text-primary" />;
    }
  };

  // Get status badge
  const getStatusBadge = () => {
    switch(status) {
      case "upcoming":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Upcoming</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Completed</Badge>;
      case "canceled":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Canceled</Badge>;
      default:
        return null;
    }
  };

  // Format duration display
  const formatDuration = (minutes?: number) => {
    if (!minutes) return null;
    
    if (minutes < 60) {
      return `${minutes}m`;
    } else if (minutes === 60) {
      return "1h";
    } else if (minutes % 60 === 0) {
      return `${minutes / 60}h`;
    } else {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours}h ${mins}m`;
    }
  };

  // Get type color
  const getTypeColor = () => {
    const key = type.toLowerCase() as keyof typeof typeColorClasses;
    return typeColorClasses[key] || "text-gray-500";
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
          <div className="flex items-center gap-1 flex-wrap">
            <p className={cn("text-xs", getTypeColor())}>{type}</p>
            {location && (
              <div className="flex items-center text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 ml-1 mr-0.5" />
                <span className="truncate max-w-[100px]">{location}</span>
              </div>
            )}
            {duration && (
              <div className="flex items-center text-xs text-muted-foreground">
                <Timer className="h-3 w-3 ml-1 mr-0.5" />
                <span>{formatDuration(duration)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {showStatusBadge && getStatusBadge()}
        <div className={cn(
          "text-sm",
          statusClasses[status]
        )}>
          {time}
        </div>
      </div>
    </div>
  );
};

export default AppointmentItem;
