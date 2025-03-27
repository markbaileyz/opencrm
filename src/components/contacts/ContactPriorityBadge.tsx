
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ContactPriority } from "@/types/contact";

interface ContactPriorityBadgeProps {
  priority: ContactPriority;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  withLabel?: boolean;
}

const ContactPriorityBadge = ({ 
  priority, 
  className,
  size = 'default',
  withLabel = true
}: ContactPriorityBadgeProps) => {
  const priorityInfo = {
    low: {
      label: "Low Priority",
      color: "bg-gray-100 text-gray-800 border-gray-300",
    },
    medium: {
      label: "Medium Priority",
      color: "bg-blue-100 text-blue-800 border-blue-300",
    },
    high: {
      label: "High Priority",
      color: "bg-red-100 text-red-800 border-red-300",
    }
  };
  
  const info = priorityInfo[priority];
  
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
      <span>{withLabel ? info.label : priority}</span>
    </Badge>
  );
};

export default ContactPriorityBadge;
