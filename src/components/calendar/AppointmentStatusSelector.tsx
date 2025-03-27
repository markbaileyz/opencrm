
import React from 'react';
import { Check, Clock, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import AppointmentStatusBadge from './AppointmentStatusBadge';

interface AppointmentStatusSelectorProps {
  status: "upcoming" | "completed" | "canceled";
  onStatusChange: (status: "upcoming" | "completed" | "canceled") => void;
  disabled?: boolean;
}

const AppointmentStatusSelector = ({
  status,
  onStatusChange,
  disabled = false
}: AppointmentStatusSelectorProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={disabled}>
        <Button variant="outline" className="w-full flex justify-between items-center gap-2">
          <span>Status:</span>
          <AppointmentStatusBadge status={status} />
          <span className="sr-only">Change status</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuItem 
          onClick={() => onStatusChange("upcoming")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Clock className="h-4 w-4 text-blue-600" />
          <span>Upcoming</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onStatusChange("completed")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Check className="h-4 w-4 text-green-600" />
          <span>Completed</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onStatusChange("canceled")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <X className="h-4 w-4 text-red-600" />
          <span>Canceled</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AppointmentStatusSelector;
