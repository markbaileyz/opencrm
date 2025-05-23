
import React, { useState } from "react";
import { format, addDays, subDays } from "date-fns";
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, CalendarPlus, ArrowLeft, ArrowRight, Filter } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AppointmentItem from "@/components/dashboard/AppointmentItem";
import AppointmentPopover from "@/components/calendar/AppointmentPopover";
import QuickAddAppointment from "@/components/calendar/QuickAddAppointment";
import type { Appointment } from "@/types/appointment";
import type { Email } from "@/types/email";
import { APPOINTMENT_TYPES, getAppointmentTypeInfo } from "@/types/appointment";

interface DailyAppointmentsProps {
  selectedDate: Date;
  appointments: Appointment[];
  emails: Email[];
  onAddAppointment: () => void;
  onEditAppointment: (id: string) => void;
  onDeleteAppointment: (id: string) => void;
  onReminderSent: (appointmentId: string) => void;
  onViewEmail: (emailId: string) => void;
  onAppointmentSelect: (id: string) => void;
  onStatusChange?: (id: string, status: "upcoming" | "completed" | "canceled") => void;
  findRelatedEmails: (emails: Email[], appointment: Appointment) => Email[];
  onDateChange?: (date: Date) => void;
  onQuickAdd?: (appointment: Partial<Appointment>) => void;
}

const DailyAppointments = ({
  selectedDate,
  appointments,
  emails,
  onAddAppointment,
  onEditAppointment,
  onDeleteAppointment,
  onReminderSent,
  onViewEmail,
  onAppointmentSelect,
  onStatusChange,
  findRelatedEmails,
  onDateChange,
  onQuickAdd
}: DailyAppointmentsProps) => {
  const [statusFilter, setStatusFilter] = useState<"all" | "upcoming" | "completed" | "canceled">("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  
  // Get all unique appointment types
  const uniqueAppointmentTypes = Array.from(
    new Set(appointments.map(app => app.type.toLowerCase()))
  );
  
  const filteredAppointments = appointments.filter(
    (appointment) => {
      const matchesDate = format(new Date(appointment.date), 'PP') === format(selectedDate, 'PP');
      const matchesStatus = statusFilter === "all" || appointment.status === statusFilter;
      const matchesType = typeFilter === "all" || appointment.type.toLowerCase() === typeFilter;
      
      return matchesDate && matchesStatus && matchesType;
    }
  );

  const getAppointmentTypeColor = (type: string) => {
    const typeInfo = getAppointmentTypeInfo(type);
    const colorClass = typeInfo.color.split(' ')[0]; // Extract the bg color part
    return `border-l-4 ${colorClass.replace('bg-', 'border-')}`;
  };
  
  const handlePrevDay = () => {
    if (onDateChange) {
      onDateChange(subDays(selectedDate, 1));
    }
  };
  
  const handleNextDay = () => {
    if (onDateChange) {
      onDateChange(addDays(selectedDate, 1));
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Appointments</CardTitle>
          {onDateChange && (
            <div className="flex space-x-1">
              <Button variant="outline" size="icon" onClick={handlePrevDay} className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleNextDay} className="h-8 w-8">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {format(selectedDate, 'PPPP')}
        </p>
      </CardHeader>
      
      <div className="px-4 py-1 flex justify-between items-center">
        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <Filter className="h-3.5 w-3.5 mr-2" />
                Status: {statusFilter === "all" ? "All" : statusFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
                <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="upcoming">Upcoming</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="completed">Completed</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="canceled">Canceled</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <Filter className="h-3.5 w-3.5 mr-2" />
                Type: {typeFilter === "all" ? "All" : getAppointmentTypeInfo(typeFilter).label}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup value={typeFilter} onValueChange={setTypeFilter}>
                <DropdownMenuRadioItem value="all">
                  All Types
                </DropdownMenuRadioItem>
                {APPOINTMENT_TYPES.map(type => (
                  <DropdownMenuRadioItem key={type.value} value={type.value}>
                    <div className="flex items-center">
                      <Badge variant="outline" className={`mr-2 px-1.5 py-0 text-xs ${type.color}`}>
                        {type.label}
                      </Badge>
                    </div>
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <Button 
          size="sm" 
          variant="outline"
          onClick={onAddAppointment}
          className="h-8"
        >
          <CalendarPlus className="h-3.5 w-3.5 mr-2" />
          New
        </Button>
      </div>
      
      <CardContent className="pt-4">
        {filteredAppointments.length > 0 ? (
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <div 
                key={appointment.id}
                className={`cursor-pointer hover:bg-accent/50 rounded-md transition-colors ${getAppointmentTypeColor(appointment.type)}`}
                onClick={() => onAppointmentSelect(appointment.id)}
              >
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="cursor-pointer pl-2">
                      <AppointmentItem
                        name={appointment.name}
                        time={appointment.time}
                        type={appointment.type}
                        status={appointment.status}
                        location={appointment.location}
                        duration={appointment.duration}
                        showStatusBadge={true}
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <AppointmentPopover
                      appointment={appointment}
                      relatedEmails={findRelatedEmails(emails, appointment)}
                      onEditAppointment={onEditAppointment}
                      onDeleteAppointment={onDeleteAppointment}
                      onReminderSent={onReminderSent}
                      onViewEmail={onViewEmail}
                      onStatusChange={onStatusChange}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CalendarClock className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No appointments for this date</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={onAddAppointment}
            >
              <CalendarPlus className="h-4 w-4 mr-2" />
              Add Appointment
            </Button>
          </div>
        )}
      </CardContent>
      {onQuickAdd && (
        <CardFooter className="pt-2 pb-4">
          <QuickAddAppointment 
            selectedDate={selectedDate} 
            onQuickAdd={onQuickAdd} 
          />
        </CardFooter>
      )}
    </Card>
  );
};

export default DailyAppointments;
