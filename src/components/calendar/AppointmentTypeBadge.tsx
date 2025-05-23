
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getAppointmentTypeInfo } from "@/types/appointment";

interface AppointmentTypeBadgeProps {
  type: string;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  showLabel?: boolean;
  withIcon?: boolean;
}

const AppointmentTypeBadge = ({ 
  type, 
  className,
  size = 'default',
  showLabel = true,
  withIcon = true
}: AppointmentTypeBadgeProps) => {
  const typeInfo = getAppointmentTypeInfo(type);
  
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
        typeInfo.color,
        "flex items-center gap-1",
        className
      )}
    >
      {withIcon && typeInfo.icon && (
        <span>{typeInfo.icon}</span>
      )}
      <span>{showLabel ? typeInfo.label : type}</span>
    </Badge>
  );
};

export default AppointmentTypeBadge;
