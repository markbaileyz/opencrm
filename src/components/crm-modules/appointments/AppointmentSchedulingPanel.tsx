
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, Clock, Plus, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Demo data
const appointmentsData = [
  {
    id: 1,
    patientName: "Sarah Johnson",
    date: "2024-05-15",
    time: "9:00 AM",
    duration: 30,
    type: "Follow-up",
    status: "confirmed",
    provider: "Dr. Michael Lee"
  },
  {
    id: 2,
    patientName: "Robert Williams",
    date: "2024-05-15",
    time: "10:00 AM",
    duration: 45,
    type: "New Patient",
    status: "confirmed",
    provider: "Dr. Emily Chen"
  },
  {
    id: 3,
    patientName: "Emily Davis",
    date: "2024-05-15",
    time: "11:15 AM",
    duration: 30,
    type: "Follow-up",
    status: "pending",
    provider: "Dr. Michael Lee"
  },
  {
    id: 4,
    patientName: "James Wilson",
    date: "2024-05-16",
    time: "9:30 AM",
    duration: 60,
    type: "Consultation",
    status: "confirmed",
    provider: "Dr. Emily Chen"
  },
  {
    id: 5,
    patientName: "Maria Garcia",
    date: "2024-05-16",
    time: "2:00 PM",
    duration: 30,
    type: "Follow-up",
    status: "cancelled",
    provider: "Dr. Michael Lee"
  }
];

const AppointmentSchedulingPanel: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"day" | "week" | "month">("day");

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    
    if (view === "day") {
      newDate.setDate(currentDate.getDate() + (direction === "next" ? 1 : -1));
    } else if (view === "week") {
      newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7));
    } else {
      newDate.setMonth(currentDate.getMonth() + (direction === "next" ? 1 : -1));
    }
    
    setCurrentDate(newDate);
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const filteredAppointments = appointmentsData.filter(appointment => {
    // Filter appointments based on the current date and view
    const appointmentDate = new Date(appointment.date);
    
    if (view === "day") {
      return appointmentDate.toDateString() === currentDate.toDateString();
    } else if (view === "week") {
      // Get the start of the week (Sunday) for both dates
      const startOfWeek = (date: Date) => {
        const d = new Date(date);
        const day = d.getDay();
        d.setDate(d.getDate() - day);
        return d;
      };
      
      return startOfWeek(appointmentDate).toDateString() === startOfWeek(currentDate).toDateString();
    } else {
      // Monthly view
      return (
        appointmentDate.getMonth() === currentDate.getMonth() &&
        appointmentDate.getFullYear() === currentDate.getFullYear()
      );
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => navigateDate("prev")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-lg font-medium">{formatDate(currentDate)}</div>
          <Button variant="outline" size="icon" onClick={() => navigateDate("next")}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Tabs defaultValue="day" onValueChange={(value) => setView(value as "day" | "week" | "month")}>
            <TabsList>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <Card className="h-full">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Appointments</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Appointment
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment) => (
                    <Card key={appointment.id} className="hover:bg-muted/50 cursor-pointer">
                      <CardContent className="p-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{appointment.patientName}</div>
                            <div className="text-sm text-muted-foreground">
                              {appointment.time} ({appointment.duration} min) • {appointment.provider}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className={getStatusColor(appointment.status)}>
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </Badge>
                            <Badge variant="outline" className="bg-blue-100 text-blue-800">
                              {appointment.type}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center p-8 border border-dashed rounded-md">
                    <CalendarIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No appointments for this date</p>
                    <Button variant="outline" className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Appointment
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-80">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Appointment
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Clock className="h-4 w-4 mr-2" />
                  View All Appointments
                </Button>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Filter by Provider</h4>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Providers</SelectItem>
                    <SelectItem value="dr-lee">Dr. Michael Lee</SelectItem>
                    <SelectItem value="dr-chen">Dr. Emily Chen</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Filter by Type</h4>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select appointment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="new-patient">New Patient</SelectItem>
                    <SelectItem value="follow-up">Follow-up</SelectItem>
                    <SelectItem value="consultation">Consultation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSchedulingPanel;
