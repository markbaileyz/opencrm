
import React, { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarPlus, Clock, MapPin } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import type { Appointment } from "@/types/appointment";

interface QuickAddAppointmentProps {
  selectedDate: Date;
  onQuickAdd: (appointment: Partial<Appointment>) => void;
}

const QuickAddAppointment = ({ selectedDate, onQuickAdd }: QuickAddAppointmentProps) => {
  const [name, setName] = useState("");
  const [time, setTime] = useState("09:00");
  const [type, setType] = useState("consultation");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [reminder, setReminder] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAppointment: Partial<Appointment> = {
      title: `Meeting with ${name}`,
      date: selectedDate,
      time: format(new Date(`2000-01-01T${time}`), 'h:mm a'),
      type,
      name,
      location,
      status: "upcoming",
      notes: notes,
      reminderSent: reminder
    };
    
    onQuickAdd(newAppointment);
    setName("");
    setTime("09:00");
    setType("consultation");
    setLocation("");
    setNotes("");
    setReminder(false);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="secondary" 
          size="sm" 
          className="w-full flex items-center justify-center"
        >
          <CalendarPlus className="h-4 w-4 mr-2" />
          Quick Add
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Quick Add Appointment</h3>
              <div className="text-sm text-muted-foreground bg-secondary px-2 py-1 rounded-md">
                {format(selectedDate, 'PPP')}
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Client Name</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter client name" 
              className="w-full"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="time" className="flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1 opacity-70" />
                Time
              </Label>
              <Input 
                id="time" 
                type="time" 
                value={time} 
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="type" className="w-full">
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
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center">
              <MapPin className="h-3.5 w-3.5 mr-1 opacity-70" />
              Location (Optional)
            </Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Office, virtual, client site, etc."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes or details about this appointment"
              className="h-20 resize-none"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="reminder"
              checked={reminder}
              onCheckedChange={setReminder}
            />
            <Label htmlFor="reminder" className="cursor-pointer">
              Send appointment reminder
            </Label>
          </div>
          
          <div className="flex justify-end space-x-2 pt-2">
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm">Add</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default QuickAddAppointment;
