
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { StaffMember } from "@/types/office";

interface AddEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  staffMembers: StaffMember[];
  onAddEvent: (event: any) => void;
}

const AddEventDialog: React.FC<AddEventDialogProps> = ({
  isOpen,
  onClose,
  staffMembers,
  onAddEvent
}) => {
  const [date, setDate] = useState<Date>(new Date());
  const [title, setTitle] = useState("");
  const [staffId, setStaffId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [status, setStatus] = useState<"confirmed" | "tentative" | "cancelled">("confirmed");
  const [notes, setNotes] = useState("");
  
  const handleSubmit = () => {
    if (!title || !staffId || !startTime || !endTime) {
      return; // Form validation
    }
    
    onAddEvent({
      title,
      staffId,
      date,
      startTime,
      endTime,
      status,
      notes
    });
    
    // Reset form
    setTitle("");
    setStaffId("");
    setStartTime("");
    setEndTime("");
    setStatus("confirmed");
    setNotes("");
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Schedule Event</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="event-title">Event Title</Label>
            <Input 
              id="event-title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title" 
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="event-staff">Assigned Staff</Label>
            <Select 
              value={staffId}
              onValueChange={setStaffId}
            >
              <SelectTrigger id="event-staff">
                <SelectValue placeholder="Select staff member" />
              </SelectTrigger>
              <SelectContent>
                {staffMembers.map((staff) => (
                  <SelectItem key={staff.id} value={staff.id}>{staff.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label>Event Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="start-time">Start Time</Label>
              <Input 
                id="start-time" 
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="end-time">End Time</Label>
              <Input 
                id="end-time" 
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="event-status">Status</Label>
            <Select 
              value={status}
              onValueChange={(value) => setStatus(value as "confirmed" | "tentative" | "cancelled")}
            >
              <SelectTrigger id="event-status">
                <SelectValue placeholder="Select event status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="tentative">Tentative</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="event-notes">Notes</Label>
            <Textarea 
              id="event-notes" 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes about this event"
              rows={3}
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Event</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventDialog;
