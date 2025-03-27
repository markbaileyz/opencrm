
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Contact } from "@/types/contact";

interface ContactStatusBadgeProps {
  status: Contact['status'];
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  withLabel?: boolean;
}

const ContactStatusBadge = ({ 
  status, 
  className,
  size = 'default',
  withLabel = true
}: ContactStatusBadgeProps) => {
  const statusInfo = {
    lead: {
      label: "Lead",
      color: "bg-yellow-100 text-yellow-800 border-yellow-300",
    },
    prospect: {
      label: "Prospect",
      color: "bg-blue-100 text-blue-800 border-blue-300",
    },
    customer: {
      label: "Customer",
      color: "bg-green-100 text-green-800 border-green-300",
    },
    inactive: {
      label: "Inactive",
      color: "bg-gray-100 text-gray-800 border-gray-300",
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
      <span>{withLabel ? info.label : status}</span>
    </Badge>
  );
};

export default ContactStatusBadge;
