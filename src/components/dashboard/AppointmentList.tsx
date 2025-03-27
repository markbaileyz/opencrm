
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { format, isToday, isTomorrow, isPast, addDays, startOfDay } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CalendarClock, ArrowRight, User, Calendar, Clock, Check, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const SAMPLE_APPOINTMENTS = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "Initial Consultation",
    date: new Date(),
    time: "9:00 AM",
    status: "completed",
    type: "Check-in"
  },
  {
    id: "2",
    name: "Robert Chen",
    title: "Follow-up Meeting",
    date: new Date(),
    time: "10:30 AM",
    status: "completed",
    type: "Follow-up"
  },
  {
    id: "3",
    name: "Emily Davis",
    title: "New Client Consultation",
    date: new Date(),
    time: "1:15 PM",
    status: "upcoming",
    type: "Consultation"
  },
  {
    id: "4",
    name: "Michael Williams",
    title: "Project Discussion",
    date: addDays(new Date(), 1),
    time: "10:00 AM",
    status: "upcoming",
    type: "New Client"
  },
  {
    id: "5",
    name: "Jessica Brown",
    title: "Quarterly Review",
    date: addDays(new Date(), 1),
    time: "2:30 PM",
    status: "upcoming",
    type: "Review"
  },
  {
    id: "6",
    name: "David Martinez",
    title: "Strategy Meeting",
    date: addDays(new Date(), 2),
    time: "11:00 AM",
    status: "upcoming",
    type: "Consultation"
  },
  {
    id: "7",
    name: "Lisa Wilson",
    title: "Contract Discussion",
    date: addDays(new Date(), 3),
    time: "3:00 PM",
    status: "upcoming",
    type: "Follow-up"
  }
];

const AppointmentList = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const navigate = useNavigate();
  
  const getFilteredAppointments = () => {
    const today = startOfDay(new Date());
    
    switch (activeTab) {
      case "today":
        return SAMPLE_APPOINTMENTS.filter(appointment => 
          isToday(appointment.date) && appointment.status === "upcoming"
        );
      case "tomorrow":
        return SAMPLE_APPOINTMENTS.filter(appointment => 
          isTomorrow(appointment.date) && appointment.status === "upcoming"
        );
      case "completed":
        return SAMPLE_APPOINTMENTS.filter(appointment => 
          appointment.status === "completed"
        );
      case "upcoming":
      default:
        return SAMPLE_APPOINTMENTS.filter(appointment => 
          !isPast(appointment.date) && appointment.status === "upcoming"
        );
    }
  };
  
  const handleGoToCalendar = () => {
    navigate('/calendar');
  };
  
  const handleViewAppointment = (appointment: any) => {
    navigate(`/calendar?date=${format(appointment.date, 'yyyy-MM-dd')}`);
  };
  
  const getAppointmentIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "check-in":
        return <Check className="h-4 w-4 text-green-500" />;
      case "follow-up":
        return <ArrowRight className="h-4 w-4 text-blue-500" />;
      case "consultation":
        return <User className="h-4 w-4 text-purple-500" />;
      case "new client":
        return <User className="h-4 w-4 text-yellow-500" />;
      case "review":
        return <Check className="h-4 w-4 text-orange-500" />;
      default:
        return <CalendarClock className="h-4 w-4 text-primary" />;
    }
  };
  
  const filteredAppointments = getFilteredAppointments();
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>All Appointments</CardTitle>
            <CardDescription>View and manage all your scheduled appointments</CardDescription>
          </div>
          <Button onClick={handleGoToCalendar}>
            View Calendar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-0">
            {filteredAppointments.length > 0 ? (
              <div className="divide-y">
                {filteredAppointments.map((appointment) => {
                  const dateDisplay = isToday(appointment.date)
                    ? "Today"
                    : isTomorrow(appointment.date)
                    ? "Tomorrow"
                    : format(appointment.date, "EEE, MMM d");
                    
                  return (
                    <div 
                      key={appointment.id}
                      className="py-3 group cursor-pointer"
                      onClick={() => handleViewAppointment(appointment)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-10 w-10 mt-1">
                            <div className="bg-muted flex items-center justify-center h-full">
                              {appointment.name.charAt(0)}
                            </div>
                          </Avatar>
                          
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium mr-2 group-hover:text-primary">
                                {appointment.title}
                              </h3>
                              <Badge 
                                className={cn(
                                  "text-xs",
                                  appointment.status === "completed" 
                                    ? "bg-green-100 text-green-800" 
                                    : "bg-blue-100 text-blue-800"
                                )}
                              >
                                {appointment.status}
                              </Badge>
                            </div>
                            
                            <p className="text-sm text-muted-foreground">
                              {appointment.name}
                            </p>
                            
                            <div className="flex items-center mt-1 space-x-3 text-xs text-muted-foreground">
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {dateDisplay}
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {appointment.time}
                              </div>
                              <div className="flex items-center">
                                {getAppointmentIcon(appointment.type)}
                                <span className="ml-1">{appointment.type}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CalendarClock className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-1">No appointments found</h3>
                <p className="text-muted-foreground mb-4">
                  {activeTab === "upcoming" 
                    ? "You don't have any upcoming appointments" 
                    : activeTab === "today"
                    ? "You don't have any appointments today"
                    : activeTab === "tomorrow"
                    ? "You don't have any appointments tomorrow"
                    : "You don't have any completed appointments"}
                </p>
                <Button onClick={handleGoToCalendar}>
                  Go to Calendar
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AppointmentList;
