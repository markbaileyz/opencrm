
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";

interface ContactFollowUpIndicatorProps {
  overdueCount: number;
  dueTodayCount: number;
}

const ContactFollowUpIndicator = ({ 
  overdueCount, 
  dueTodayCount 
}: ContactFollowUpIndicatorProps) => {
  return (
    <div className="flex space-x-2">
      {overdueCount > 0 && (
        <Tooltip content={`${overdueCount} overdue follow-ups`}>
          <Badge variant="destructive" className="flex items-center gap-1 ml-2">
            <Calendar className="h-3 w-3" />
            <span>{overdueCount}</span>
          </Badge>
        </Tooltip>
      )}
      
      {dueTodayCount > 0 && (
        <Tooltip content={`${dueTodayCount} follow-ups due today`}>
          <Badge variant="warning" className="flex items-center gap-1 ml-2">
            <Calendar className="h-3 w-3" />
            <span>{dueTodayCount}</span>
          </Badge>
        </Tooltip>
      )}
    </div>
  );
};

export default ContactFollowUpIndicator;
