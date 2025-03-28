
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  Clock,
  MapPin,
  User,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Plus
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAppointments } from "@/hooks/useAppointments";

interface PatientAppointmentsProps {
  patientId: string;
}

const PatientAppointments: React.FC<PatientAppointmentsProps> = ({ patientId }) => {
  const { appointments, isLoading, error } = useAppointments(patientId);
  const [filter, setFilter] = useState<"upcoming" | "past" | "all">("upcoming");
  
  if (isLoading) {
    return <div className="flex justify-center p-8">Loading appointments...</div>;
  }
  
  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center p-6">
            <p className="text-destructive">Error loading appointment data</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const filteredAppointments = appointments?.filter(appointment => {
    if (filter === "all") return true;
    const appointmentDate = new Date(appointment.date + " " + appointment.time);
    const now = new Date();
    return filter === "upcoming" ? appointmentDate > now : appointmentDate <= now;
  });
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-primary" />
          Patient Appointments
        </h2>
        
        <div className="flex items-center gap-2">
          <div className="flex border rounded-md overflow-hidden">
            <Button 
              variant={filter === "upcoming" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setFilter("upcoming")}
              className="rounded-none"
            >
              Upcoming
            </Button>
            <Button 
              variant={filter === "past" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setFilter("past")}
              className="rounded-none"
            >
              Past
            </Button>
            <Button 
              variant={filter === "all" ? "default" : "ghost"} 
              size="sm"
              onClick={() => setFilter("all")}
              className="rounded-none"
            >
              All
            </Button>
          </div>
          
          <Button size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            New Appointment
          </Button>
        </div>
      </div>
      
      {filteredAppointments?.length ? (
        <div className="space-y-3">
          {filteredAppointments.map((appointment, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex items-center md:items-start gap-3">
                    <div className={`flex flex-col items-center justify-center w-14 h-14 ${
                      appointment.status === "completed" ? "bg-green-100 text-green-700" : 
                      appointment.status === "cancelled" ? "bg-red-100 text-red-700" : 
                      "bg-blue-100 text-blue-700"
                    } rounded-md p-2`}>
                      <span className="text-sm font-bold">{
                        new Date(appointment.date).toLocaleDateString(undefined, { month: 'short' })
                      }</span>
                      <span className="text-lg font-bold">{
                        new Date(appointment.date).getDate()
                      }</span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <h3 className="font-medium">{appointment.reason}</h3>
                        <Badge variant={
                          appointment.status === "completed" ? "success" : 
                          appointment.status === "cancelled" ? "destructive" : 
                          "default"
                        }>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 text-sm">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Dr. {appointment.provider}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{appointment.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {appointment.status === "scheduled" && (
                    <div className="flex sm:flex-col gap-2 ml-auto">
                      <Button variant="outline" size="sm">Reschedule</Button>
                      <Button variant="destructive" size="sm">Cancel</Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-6 flex flex-col items-center justify-center">
            <Calendar className="h-12 w-12 text-muted-foreground mb-3" />
            <h3 className="text-lg font-medium mb-1">No appointments found</h3>
            <p className="text-muted-foreground text-center mb-4">
              {filter === "upcoming" 
                ? "There are no upcoming appointments scheduled for this patient." 
                : filter === "past" 
                ? "There are no past appointments on record for this patient." 
                : "There are no appointments on record for this patient."}
            </p>
            <Button className="gap-1">
              <Plus className="h-4 w-4" />
              Schedule New Appointment
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PatientAppointments;
