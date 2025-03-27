
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, isToday, startOfDay, endOfDay, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from "date-fns";
import type { Appointment } from "@/types/appointment";

interface CalendarViewProps {
  currentMonth: Date;
  selectedDate: Date;
  appointments: Appointment[];
  onDateSelect: (date: Date | undefined) => void;
  onMonthChange: (date: Date) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  currentView: 'day' | 'week' | 'month';
}

const CalendarView = ({
  currentMonth,
  selectedDate,
  appointments,
  onDateSelect,
  onMonthChange,
  onPrevMonth,
  onNextMonth,
  currentView
}: CalendarViewProps) => {
  
  const dateHasAppointment = (date: Date) => {
    return appointments.some(
      (appointment) => {
        const appointmentDate = new Date(appointment.date);
        return isSameDay(appointmentDate, date);
      }
    );
  };

  const renderDayView = () => {
    const dayAppointments = appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      return isSameDay(appointmentDate, selectedDate);
    }).sort((a, b) => a.time.localeCompare(b.time));

    return (
      <div className="space-y-4">
        <div className="text-center py-2 font-semibold">
          {format(selectedDate, 'EEEE, MMMM d, yyyy')}
        </div>
        
        <div className="space-y-2">
          {dayAppointments.length > 0 ? (
            dayAppointments.map((appointment, index) => (
              <div 
                key={appointment.id}
                className="p-2 rounded bg-accent border flex justify-between items-center"
              >
                <div>
                  <span className="font-medium">{appointment.time}</span> - {appointment.title}
                </div>
                <span className="text-sm">{appointment.name}</span>
              </div>
            ))
          ) : (
            <div className="text-center text-muted-foreground py-8">
              No appointments scheduled for this day
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const startDate = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const endDate = endOfWeek(selectedDate, { weekStartsOn: 1 });
    const daysOfWeek = eachDayOfInterval({ start: startDate, end: endDate });

    return (
      <div className="space-y-4">
        <div className="text-center py-2 font-semibold">
          Week of {format(startDate, 'MMMM d')} - {format(endDate, 'MMMM d, yyyy')}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {daysOfWeek.map((day) => (
            <div 
              key={day.toString()} 
              className="text-center font-medium text-sm"
              onClick={() => onDateSelect(day)}
            >
              {format(day, 'EEEEEE')}
            </div>
          ))}
          
          {daysOfWeek.map((day) => {
            const dayAppointments = appointments.filter(appointment => {
              const appointmentDate = new Date(appointment.date);
              return isSameDay(appointmentDate, day);
            });
            
            return (
              <div 
                key={day.toString() + '-content'}
                className={`border rounded min-h-[100px] p-1 text-xs overflow-hidden ${
                  isSameDay(day, selectedDate) ? 'bg-primary/10 border-primary' : ''
                } ${isToday(day) ? 'font-bold' : ''}`}
                onClick={() => onDateSelect(day)}
              >
                <div className="text-right p-1">{format(day, 'd')}</div>
                {dayAppointments.slice(0, 3).map((app, i) => (
                  <div key={app.id} className="bg-accent rounded-sm p-1 mb-1 truncate">
                    {app.time} - {app.title}
                  </div>
                ))}
                {dayAppointments.length > 3 && (
                  <div className="text-muted-foreground text-center">
                    +{dayAppointments.length - 3} more
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    return (
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
        {currentView === 'day' && renderDayView()}
        {currentView === 'week' && renderWeekView()}
        {currentView === 'month' && renderMonthView()}
      </CardContent>
    </Card>
  );
};

export default CalendarView;
