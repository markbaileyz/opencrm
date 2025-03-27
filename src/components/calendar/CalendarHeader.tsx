
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarPlus, Mail, CalendarRange, CalendarClock } from "lucide-react";
import AppointmentForm from "@/components/calendar/AppointmentForm";
import BatchAppointmentCreator from "@/components/calendar/BatchAppointmentCreator";
import RecurringAppointmentSetup from "@/components/calendar/RecurringAppointmentSetup";
import type { Appointment } from "@/types/appointment";
import type { Email } from "@/types/email";

interface CalendarHeaderProps {
  selectedDate: Date;
  editAppointmentId: string | null;
  appointments: Appointment[];
  emails: Email[];
  isAddAppointmentOpen: boolean;
  setIsAddAppointmentOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isBatchModeOpen: boolean;
  setIsBatchModeOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isRecurringModeOpen: boolean;
  setIsRecurringModeOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAddAppointment: (e: React.FormEvent<HTMLFormElement>) => void;
  onBatchAppointmentsCreated: (newAppointments: Appointment[]) => void;
  onGoToEmail: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  selectedDate,
  editAppointmentId,
  appointments,
  emails,
  isAddAppointmentOpen,
  setIsAddAppointmentOpen,
  isBatchModeOpen,
  setIsBatchModeOpen,
  isRecurringModeOpen,
  setIsRecurringModeOpen,
  onAddAppointment,
  onBatchAppointmentsCreated,
  onGoToEmail
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold mb-2">Calendar</h1>
        <p className="text-muted-foreground">
          Manage appointments and schedule follow-ups
        </p>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" onClick={onGoToEmail}>
          <Mail className="h-4 w-4 mr-2" />
          Go to Email
        </Button>
        
        {/* Batch Appointment Dialog */}
        <Dialog open={isBatchModeOpen} onOpenChange={setIsBatchModeOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <CalendarRange className="h-4 w-4 mr-2" />
              Batch Create
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Multiple Appointments</DialogTitle>
              <DialogDescription>
                Schedule multiple appointments for the same day
              </DialogDescription>
            </DialogHeader>
            <BatchAppointmentCreator 
              onAppointmentsCreated={onBatchAppointmentsCreated}
              onClose={() => setIsBatchModeOpen(false)}
            />
          </DialogContent>
        </Dialog>
        
        {/* Recurring Appointment Dialog */}
        <Dialog open={isRecurringModeOpen} onOpenChange={setIsRecurringModeOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <CalendarClock className="h-4 w-4 mr-2" />
              Recurring
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Recurring Appointments</DialogTitle>
              <DialogDescription>
                Schedule a series of appointments with regular intervals
              </DialogDescription>
            </DialogHeader>
            <RecurringAppointmentSetup 
              onAppointmentsCreated={onBatchAppointmentsCreated}
              onClose={() => setIsRecurringModeOpen(false)}
            />
          </DialogContent>
        </Dialog>
        
        {/* Regular Appointment Dialog */}
        <Dialog open={isAddAppointmentOpen} onOpenChange={setIsAddAppointmentOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsAddAppointmentOpen(true)}>
              <CalendarPlus className="h-4 w-4 mr-2" />
              New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editAppointmentId ? "Edit Appointment" : "Add New Appointment"}
              </DialogTitle>
              <DialogDescription>
                {editAppointmentId 
                  ? "Update the appointment details" 
                  : `Create a new appointment for ${selectedDate.toLocaleDateString()}`}
              </DialogDescription>
            </DialogHeader>
            <AppointmentForm
              selectedDate={selectedDate}
              editAppointmentId={editAppointmentId}
              appointments={appointments}
              emails={emails}
              onSubmit={onAddAppointment}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CalendarHeader;
