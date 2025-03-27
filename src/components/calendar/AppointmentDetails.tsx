
import React from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Mail, Clock, FileText, Edit, Trash, X, Check, Ban, MapPin, Timer } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
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
  onClose?: () => void;
  onStatusChange?: (id: string, status: "upcoming" | "completed" | "canceled") => void;
}

const AppointmentDetails = ({
  appointment,
  relatedEmails,
  onEditAppointment,
  onDeleteAppointment,
  onReminderSent,
  onViewEmail,
  onClose,
  onStatusChange,
}: AppointmentDetailsProps) => {
  const { toast } = useToast();
  const statusColors = {
    upcoming: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    canceled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  const formatDuration = (minutes?: number) => {
    if (!minutes) return "1 hour";
    
    if (minutes < 60) {
      return `${minutes} minutes`;
    } else if (minutes === 60) {
      return "1 hour";
    } else if (minutes === 90) {
      return "1.5 hours";
    } else if (minutes === 120) {
      return "2 hours";
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      
      if (remainingMinutes === 0) {
        return `${hours} hour${hours > 1 ? 's' : ''}`;
      } else {
        return `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} min`;
      }
    }
  };

  const handleStatusChange = (status: "upcoming" | "completed" | "canceled") => {
    if (onStatusChange) {
      onStatusChange(appointment.id, status);
      
      toast({
        title: `Appointment marked as ${status}`,
        description: `${appointment.title} with ${appointment.name} has been updated.`,
      });
    }
  };

  return (
    <Card className="max-w-3xl mx-auto shadow-md">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">{appointment.title}</CardTitle>
            <CardDescription className="flex items-center mt-1 flex-wrap gap-x-4">
              <span className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" />
                {format(appointment.date, "PPP")}
              </span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {appointment.time}
              </span>
              <span className="flex items-center">
                <Timer className="h-4 w-4 mr-1" />
                {formatDuration(appointment.duration)}
              </span>
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={statusColors[appointment.status]}>{appointment.status}</Badge>
            {onClose && (
              <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            )}
          </div>
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
        
        {appointment.location && (
          <div>
            <h3 className="font-medium mb-1 flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              Location
            </h3>
            <p className="text-sm">{appointment.location}</p>
          </div>
        )}
        
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
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onEditAppointment(appointment)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Change Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem 
                onClick={() => handleStatusChange("upcoming")}
                disabled={appointment.status === "upcoming"}
              >
                <Clock className="h-4 w-4 mr-2" />
                Mark as Upcoming
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleStatusChange("completed")}
                disabled={appointment.status === "completed"}
              >
                <Check className="h-4 w-4 mr-2" />
                Mark as Completed
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleStatusChange("canceled")}
                disabled={appointment.status === "canceled"}
              >
                <Ban className="h-4 w-4 mr-2" />
                Mark as Canceled
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
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
