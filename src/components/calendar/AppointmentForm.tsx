
import React from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Clock } from "lucide-react";
import type { Appointment } from "@/types/appointment";
import type { Email } from "@/types/email";

interface AppointmentFormProps {
  selectedDate: Date;
  editAppointmentId: string | null;
  appointments: Appointment[];
  emails: Email[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AppointmentForm = ({
  selectedDate,
  editAppointmentId,
  appointments,
  emails,
  onSubmit
}: AppointmentFormProps) => {
  const appointmentToEdit = editAppointmentId 
    ? appointments.find(a => a.id === editAppointmentId)
    : null;

  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-right">
            Title
          </Label>
          <Input 
            id="title" 
            name="title" 
            className="col-span-3" 
            required 
            defaultValue={appointmentToEdit?.title || ""}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Client Name
          </Label>
          <Input 
            id="name" 
            name="name" 
            className="col-span-3" 
            required 
            defaultValue={appointmentToEdit?.name || ""}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="time" className="text-right">
            Time
          </Label>
          <Input 
            id="time" 
            name="time" 
            type="time" 
            className="col-span-3" 
            required 
            defaultValue={appointmentToEdit?.time || ""}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="duration" className="text-right flex items-center">
            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
            Duration
          </Label>
          <Select 
            name="duration" 
            defaultValue={appointmentToEdit?.duration?.toString() || "60"}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15 minutes</SelectItem>
              <SelectItem value="30">30 minutes</SelectItem>
              <SelectItem value="45">45 minutes</SelectItem>
              <SelectItem value="60">1 hour</SelectItem>
              <SelectItem value="90">1.5 hours</SelectItem>
              <SelectItem value="120">2 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="location" className="text-right flex items-center">
            <MapPin className="h-4 w-4 mr-1 text-muted-foreground" /> 
            Location
          </Label>
          <Input 
            id="location" 
            name="location" 
            className="col-span-3" 
            placeholder="Office, virtual, client site, etc."
            defaultValue={appointmentToEdit?.location || ""}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="type" className="text-right">
            Type
          </Label>
          <Select 
            name="type" 
            defaultValue={appointmentToEdit?.type || "consultation"}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="consultation">Consultation</SelectItem>
              <SelectItem value="follow-up">Follow-up</SelectItem>
              <SelectItem value="check-in">Check-in</SelectItem>
              <SelectItem value="review">Review</SelectItem>
              <SelectItem value="new-client">New Client</SelectItem>
              <SelectItem value="email-follow-up">Email Follow-up</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="notes" className="text-right">
            Notes
          </Label>
          <Textarea 
            id="notes" 
            name="notes" 
            className="col-span-3" 
            defaultValue={appointmentToEdit?.notes || ""}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="emailThread" className="text-right">
            Email Thread
          </Label>
          <Select 
            name="emailThread" 
            defaultValue={appointmentToEdit?.emailThreadId || "none"}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Related email (optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {emails.slice(0, 5).map(email => (
                <SelectItem key={email.id} value={email.id}>
                  {email.subject.substring(0, 30)}...
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit">
          {editAppointmentId ? "Update Appointment" : "Save Appointment"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default AppointmentForm;
