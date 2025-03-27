
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarPlus } from "lucide-react";
import { format } from "date-fns";
import { useCalendarEmailIntegration } from "@/hooks/useCalendarEmailIntegration";
import type { Email } from "@/types/email";

interface EmailAppointmentCreatorProps {
  email: Email;
  onAppointmentCreated: (appointmentData: any) => void;
}

const EmailAppointmentCreator = ({ email, onAppointmentCreated }: EmailAppointmentCreatorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [time, setTime] = useState("09:00");
  const [isProcessing, setIsProcessing] = useState(false);
  const { createAppointmentFromEmail } = useCalendarEmailIntegration();

  const handleCreateAppointment = () => {
    setIsProcessing(true);
    const newAppointment = createAppointmentFromEmail(email, selectedDate, formatTime(time));
    onAppointmentCreated(newAppointment);
    setIsProcessing(false);
    setIsOpen(false);
  };

  const formatTime = (time24: string): string => {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => setIsOpen(true)}>
        <CalendarPlus className="h-4 w-4 mr-2" />
        Schedule Meeting
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Meeting from Email</DialogTitle>
            <DialogDescription>
              Create a calendar appointment based on this email from {email.senderName}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Email Subject</Label>
              <p className="text-sm font-medium">{email.subject}</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Select Date</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time">Select Time</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateAppointment} disabled={isProcessing}>
              Create Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmailAppointmentCreator;
