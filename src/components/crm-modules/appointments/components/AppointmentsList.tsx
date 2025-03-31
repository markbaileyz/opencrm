
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, Plus, CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Appointment } from "../types/appointmentTypes";

interface AppointmentsListProps {
  appointments: Appointment[];
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({ appointments }) => {
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

  return (
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
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
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
  );
};

export default AppointmentsList;
