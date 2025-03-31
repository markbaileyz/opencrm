
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCalendar } from "@/hooks/useCalendar";

const CalendarModule: React.FC = () => {
  const { 
    currentMonth, 
    selectedDate,
    appointments,
    nextMonth,
    prevMonth,
    handleDateSelect,
    isAddAppointmentOpen,
    setIsAddAppointmentOpen
  } = useCalendar();
  
  // Calculate calendar days
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Get first day of month
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const calendarDays = [];
    
    // Add previous month days
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push({ day: 0, isCurrentMonth: false });
    }
    
    // Add current month days
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push({ day: i, isCurrentMonth: true });
    }
    
    return calendarDays;
  };
  
  const calendarDays = getDaysInMonth(currentMonth);
  const currentMonthName = currentMonth.toLocaleString('default', { month: 'long' });
  const currentYear = currentMonth.getFullYear();
  
  // Get appointments for a specific day
  const getAppointmentsForDay = (day: number) => {
    if (day === 0) return [];
    
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return appointments.filter((appointment: any) => {
      const appointmentDate = new Date(appointment.date);
      return (
        appointmentDate.getDate() === date.getDate() &&
        appointmentDate.getMonth() === date.getMonth() &&
        appointmentDate.getFullYear() === date.getFullYear()
      );
    });
  };
  
  const handleAddAppointment = () => {
    setIsAddAppointmentOpen(true);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-1">Calendar & Scheduling</h2>
        <p className="text-muted-foreground">Manage your appointments and schedule</p>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Button variant="outline" size="sm" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="mx-4 font-medium">
            {currentMonthName} {currentYear}
          </div>
          <Button variant="outline" size="sm" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <Button onClick={handleAddAppointment} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          New Appointment
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-7 bg-muted">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <div 
                key={index} 
                className="p-2 text-center font-medium text-sm border-b"
              >
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7">
            {calendarDays.map((day, index) => {
              const dayAppointments = getAppointmentsForDay(day.day);
              return (
                <div 
                  key={index} 
                  className={`min-h-[100px] p-2 border ${day.isCurrentMonth ? 'bg-background' : 'bg-muted/50 text-muted-foreground'}`}
                  onClick={() => day.isCurrentMonth && handleDateSelect(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day.day))}
                >
                  {day.day > 0 && (
                    <>
                      <div className="font-medium text-sm mb-1">{day.day}</div>
                      <div className="space-y-1">
                        {dayAppointments.slice(0, 2).map((appointment: any, idx: number) => (
                          <div key={idx} className="text-xs p-1 bg-primary/10 rounded truncate">
                            {appointment.time} - {appointment.title}
                          </div>
                        ))}
                        {dayAppointments.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{dayAppointments.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      
      {/* Placeholder for AppointmentDialog component */}
      {isAddAppointmentOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Add Appointment</CardTitle>
              <CardDescription>
                Schedule a new appointment with a patient
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Appointment form will be implemented here
              </p>
            </CardContent>
            <div className="flex justify-end p-6 pt-0">
              <Button variant="outline" className="mr-2" onClick={() => setIsAddAppointmentOpen(false)}>
                Cancel
              </Button>
              <Button>Save Appointment</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CalendarModule;
