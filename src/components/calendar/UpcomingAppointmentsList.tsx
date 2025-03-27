
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, CalendarClock, Edit, Trash2, Bell, MoreHorizontal, Check, Ban, CalendarRange } from "lucide-react";
import { format, isToday, isTomorrow, isFuture, isPast } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import type { Appointment } from "@/types/appointment";
import { cn } from "@/lib/utils";

interface UpcomingAppointmentsListProps {
  appointments: Appointment[];
  onEditAppointment: (id: string) => void;
  onDeleteAppointment: (id: string) => void;
  onReminderSent: (appointmentId: string) => void;
  onAppointmentSelect: (id: string) => void;
  onStatusChange?: (id: string, status: "upcoming" | "completed" | "canceled") => void;
  showOnlyUpcoming?: boolean;
}

const UpcomingAppointmentsList: React.FC<UpcomingAppointmentsListProps> = ({
  appointments,
  onEditAppointment,
  onDeleteAppointment,
  onReminderSent,
  onAppointmentSelect,
  onStatusChange,
  showOnlyUpcoming = false
}) => {
  // Sort appointments by date and time
  const sortedAppointments = [...appointments].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (dateA.getTime() !== dateB.getTime()) {
      return dateA.getTime() - dateB.getTime();
    }
    return a.time.localeCompare(b.time);
  });
  
  // Filter for upcoming appointments if requested
  const filteredAppointments = showOnlyUpcoming 
    ? sortedAppointments.filter(app => app.status === "upcoming") 
    : sortedAppointments;
  
  // Group appointments by date
  const appointmentsByDate: Record<string, Appointment[]> = {};
  
  filteredAppointments.forEach(appointment => {
    const dateStr = format(new Date(appointment.date), 'yyyy-MM-dd');
    if (!appointmentsByDate[dateStr]) {
      appointmentsByDate[dateStr] = [];
    }
    appointmentsByDate[dateStr].push(appointment);
  });
  
  // Get dates in chronological order
  const sortedDates = Object.keys(appointmentsByDate).sort();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {showOnlyUpcoming ? "Upcoming Appointments" : "All Appointments"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sortedDates.length > 0 ? (
          <div className="space-y-6">
            {sortedDates.map(dateStr => {
              const date = new Date(dateStr);
              const isDateToday = isToday(date);
              const isDateTomorrow = isTomorrow(date);
              const isDateFuture = isFuture(date);
              const isDatePast = isPast(date);
              
              return (
                <div key={dateStr} className="space-y-2">
                  <div className="flex items-center">
                    <h3 className="text-lg font-semibold">
                      {isDateToday ? "Today" : isDateTomorrow ? "Tomorrow" : format(date, 'PPPP')}
                    </h3>
                    <Badge 
                      variant={isDateToday ? "default" : isDateFuture ? "secondary" : "outline"}
                      className="ml-2"
                    >
                      {format(date, 'EEEE')}
                    </Badge>
                  </div>
                  <Separator />
                  <div className="space-y-3 mt-2">
                    {appointmentsByDate[dateStr].map(appointment => (
                      <div 
                        key={appointment.id} 
                        className={cn(
                          "border rounded-md p-4 hover:bg-accent cursor-pointer transition-colors",
                          appointment.status === "completed" ? "opacity-75" : "",
                          appointment.status === "canceled" ? "opacity-60" : ""
                        )}
                        onClick={() => onAppointmentSelect(appointment.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{appointment.title}</h4>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{appointment.time}</span>
                              <span className="mx-2">•</span>
                              <span>{appointment.name}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge 
                                variant={
                                  appointment.status === "completed" 
                                    ? "outline" 
                                    : "secondary"
                                }
                              >
                                {appointment.type}
                              </Badge>
                              <Badge 
                                variant="outline"
                                className={
                                  appointment.status === "upcoming" ? "bg-blue-100 text-blue-800" :
                                  appointment.status === "completed" ? "bg-green-100 text-green-800" :
                                  "bg-red-100 text-red-800"
                                }
                              >
                                {appointment.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            {onStatusChange && (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onStatusChange(appointment.id, "upcoming");
                                    }}
                                    disabled={appointment.status === "upcoming"}
                                  >
                                    <CalendarRange className="h-4 w-4 mr-2" />
                                    Mark as Upcoming
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onStatusChange(appointment.id, "completed");
                                    }}
                                    disabled={appointment.status === "completed"}
                                  >
                                    <Check className="h-4 w-4 mr-2" />
                                    Mark as Completed
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onStatusChange(appointment.id, "canceled");
                                    }}
                                    disabled={appointment.status === "canceled"}
                                  >
                                    <Ban className="h-4 w-4 mr-2" />
                                    Mark as Canceled
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                onEditAppointment(appointment.id);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            {appointment.status !== "completed" && (
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onReminderSent(appointment.id);
                                }}
                                disabled={appointment.reminderSent}
                              >
                                <Bell className="h-4 w-4" />
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteAppointment(appointment.id);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CalendarClock className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No appointments found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingAppointmentsList;
