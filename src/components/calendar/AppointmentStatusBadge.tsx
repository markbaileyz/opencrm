
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Check, Clock, X } from "lucide-react";

interface AppointmentStatusBadgeProps {
  status: "upcoming" | "completed" | "canceled";
  className?: string;
  size?: 'sm' | 'default' | 'lg';
}

const AppointmentStatusBadge = ({ 
  status, 
  className,
  size = 'default'
}: AppointmentStatusBadgeProps) => {
  const statusInfo = {
    upcoming: {
      label: "Upcoming",
      color: "bg-blue-100 text-blue-800 border-blue-300",
      icon: <Clock className="h-3 w-3" />
    },
    completed: {
      label: "Completed",
      color: "bg-green-100 text-green-800 border-green-300",
      icon: <Check className="h-3 w-3" />
    },
    canceled: {
      label: "Canceled",
      color: "bg-red-100 text-red-800 border-red-300",
      icon: <X className="h-3 w-3" />
    }
  };
  
  const info = statusInfo[status];
  
  const sizeClasses = {
    sm: "text-xs px-1.5 py-0",
    default: "px-2 py-0.5",
    lg: "text-sm px-2.5 py-1"
  };
  
  return (
    <Badge 
      variant="outline" 
      className={cn(
        sizeClasses[size],
        info.color,
        "flex items-center gap-1",
        className
      )}
    >
      {info.icon}
      <span>{info.label}</span>
    </Badge>
  );
};

export default AppointmentStatusBadge;
