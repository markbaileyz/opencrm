
import React, { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarPlus } from "lucide-react";
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
import type { Appointment } from "@/types/appointment";

interface QuickAddAppointmentProps {
  selectedDate: Date;
  onQuickAdd: (appointment: Partial<Appointment>) => void;
}

const QuickAddAppointment = ({ selectedDate, onQuickAdd }: QuickAddAppointmentProps) => {
  const [name, setName] = useState("");
  const [time, setTime] = useState("09:00");
  const [type, setType] = useState("consultation");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAppointment: Partial<Appointment> = {
      title: `Meeting with ${name}`,
      date: selectedDate,
      time: format(new Date(`2000-01-01T${time}`), 'h:mm a'),
      type,
      name,
      status: "upcoming"
    };
    
    onQuickAdd(newAppointment);
    setName("");
    setTime("09:00");
    setType("consultation");
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="secondary" 
          size="sm" 
          className="w-full"
        >
          <CalendarPlus className="h-4 w-4 mr-2" />
          Quick Add
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Quick Add Appointment</h3>
            <p className="text-sm text-muted-foreground">
              {format(selectedDate, 'PPP')}
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Client Name</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter client name" 
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
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
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="follow-up">Follow-up</SelectItem>
                  <SelectItem value="check-in">Check-in</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="new-client">New Client</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
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
