
import React from "react";
import { format, isSameDay } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarClock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppointmentItem from "@/components/dashboard/AppointmentItem";
import type { Appointment } from "@/types/appointment";

interface UpcomingAppointmentsProps {
  appointments: Appointment[];
  maxItems?: number;
  showDate?: boolean;
  className?: string;
}

const UpcomingAppointments = ({
  appointments,
  maxItems = 5,
  showDate = true,
  className
}: UpcomingAppointmentsProps) => {
  const navigate = useNavigate();
  
  // Filter and sort upcoming appointments
  const upcomingAppointments = appointments
    .filter(appointment => appointment.status === "upcoming")
    .sort((a, b) => {
      const dateA = new Date(`${format(a.date, 'yyyy-MM-dd')} ${a.time}`);
      const dateB = new Date(`${format(b.date, 'yyyy-MM-dd')} ${b.time}`);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, maxItems);
  
  const handleGoToCalendar = () => {
    navigate('/calendar');
  };
  
  const handleGoToAppointment = (appointment: Appointment) => {
    navigate(`/calendar?date=${format(appointment.date, 'yyyy-MM-dd')}`);
  };
  
  if (upcomingAppointments.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <CalendarClock className="h-10 w-10 text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No upcoming appointments</p>
            <Button 
              variant="outline" 
              size="sm"
              className="mt-3"
              onClick={handleGoToCalendar}
            >
              View Calendar
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const today = new Date();
  
  // Group appointments by date
  const appointmentsByDate = upcomingAppointments.reduce((acc, appointment) => {
    const dateStr = format(appointment.date, 'yyyy-MM-dd');
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    acc[dateStr].push(appointment);
    return acc;
  }, {} as Record<string, Appointment[]>);
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(appointmentsByDate).map(([dateStr, appointments]) => {
          const date = new Date(dateStr);
          const isToday = isSameDay(date, today);
          
          return (
            <div key={dateStr}>
              {showDate && (
                <div className="flex items-center mb-2">
                  <h3 className="text-sm font-medium">
                    {isToday ? 'Today' : format(date, 'EEEE, MMMM d')}
                  </h3>
                  <div className="h-px flex-1 bg-border ml-2" />
                </div>
              )}
              
              <div className="space-y-2">
                {appointments.map(appointment => (
                  <div 
                    key={appointment.id}
                    className="cursor-pointer"
                    onClick={() => handleGoToAppointment(appointment)}
                  >
                    <AppointmentItem
                      name={appointment.name}
                      time={appointment.time}
                      type={appointment.type}
                      status={appointment.status}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        
        <div className="flex justify-end">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleGoToCalendar}
          >
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingAppointments;
