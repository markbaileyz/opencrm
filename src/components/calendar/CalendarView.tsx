
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, isToday } from "date-fns";
import type { Appointment } from "@/types/appointment";

interface CalendarViewProps {
  currentMonth: Date;
  selectedDate: Date;
  appointments: Appointment[];
  onDateSelect: (date: Date | undefined) => void;
  onMonthChange: (date: Date) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const CalendarView = ({
  currentMonth,
  selectedDate,
  appointments,
  onDateSelect,
  onMonthChange,
  onPrevMonth,
  onNextMonth
}: CalendarViewProps) => {
  
  const dateHasAppointment = (date: Date) => {
    return appointments.some(
      (appointment) => format(appointment.date, 'PP') === format(date, 'PP')
    );
  };

  return (
    <Card className="md:col-span-2">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Calendar</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={onPrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-semibold">
              {format(currentMonth, 'MMMM yyyy')}
            </span>
            <Button variant="outline" size="icon" onClick={onNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateSelect}
            month={currentMonth}
            onMonthChange={onMonthChange}
            className="rounded-md p-3 w-full"
            modifiers={{
              hasAppointment: (date) => dateHasAppointment(date),
              today: (date) => isToday(date),
            }}
            modifiersClassNames={{
              hasAppointment: "bg-primary/20 font-bold text-primary",
              today: "border border-primary ring-2 ring-primary/20"
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarView;
