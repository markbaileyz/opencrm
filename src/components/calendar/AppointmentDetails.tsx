
import React from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Mail, Clock, FileText, Edit, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import AppointmentReminder from "./AppointmentReminder";
import AppointmentRelatedEmails from "./AppointmentRelatedEmails";
import type { AppointmentWithEmail } from "@/types/appointment";
import type { Email } from "@/types/email";

interface AppointmentDetailsProps {
  appointment: AppointmentWithEmail;
  relatedEmails: Email[];
  onEditAppointment: (appointment: AppointmentWithEmail) => void;
  onDeleteAppointment: (id: string) => void;
  onReminderSent: (appointmentId: string) => void;
  onViewEmail: (emailId: string) => void;
}

const AppointmentDetails = ({
  appointment,
  relatedEmails,
  onEditAppointment,
  onDeleteAppointment,
  onReminderSent,
  onViewEmail,
}: AppointmentDetailsProps) => {
  const statusColors = {
    upcoming: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    canceled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  return (
    <Card className="max-w-3xl mx-auto shadow-md">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">{appointment.title}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <CalendarIcon className="h-4 w-4 mr-1" />
              {format(appointment.date, "PPP")}
              <Clock className="h-4 w-4 ml-4 mr-1" />
              {appointment.time}
            </CardDescription>
          </div>
          <Badge className={statusColors[appointment.status]}>{appointment.status}</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-1">Appointment with</h3>
            <p>{appointment.name}</p>
          </div>
          <div>
            <h3 className="font-medium mb-1">Type</h3>
            <p>{appointment.type}</p>
          </div>
        </div>
        
        {appointment.notes && (
          <div>
            <h3 className="font-medium mb-1 flex items-center">
              <FileText className="h-4 w-4 mr-1" />
              Notes
            </h3>
            <p className="text-sm text-muted-foreground">{appointment.notes}</p>
          </div>
        )}
        
        <Separator />
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              Related Emails
            </h3>
            {appointment.emailThreadId && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewEmail(appointment.emailThreadId!)}
              >
                Open Thread
              </Button>
            )}
          </div>
          
          <AppointmentRelatedEmails 
            emails={relatedEmails} 
            onViewEmail={onViewEmail}
          />
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <div>
          <Button 
            variant="outline" 
            size="sm"
            className="mr-2"
            onClick={() => onEditAppointment(appointment)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => onDeleteAppointment(appointment.id)}
          >
            <Trash className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
        <AppointmentReminder 
          appointment={appointment} 
          onReminderSent={onReminderSent}
        />
      </CardFooter>
    </Card>
  );
};

export default AppointmentDetails;
