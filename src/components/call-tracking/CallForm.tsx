
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { CalendarIcon, Clock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CallRecord } from "@/types/call";

interface CallFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (call: Partial<CallRecord>) => void;
  initialData?: Partial<CallRecord>;
  title?: string;
}

const CallForm: React.FC<CallFormProps> = ({
  open,
  onOpenChange,
  onSave,
  initialData,
  title = "Log Call"
}) => {
  const [callData, setCallData] = useState<Partial<CallRecord>>(
    initialData || {
      type: "outgoing",
      timestamp: new Date().toISOString(),
      duration: 0
    }
  );
  
  const [date, setDate] = useState<Date | undefined>(
    initialData?.timestamp ? new Date(initialData.timestamp) : new Date()
  );
  
  const [timeHours, setTimeHours] = useState<string>(
    initialData?.timestamp 
      ? format(new Date(initialData.timestamp), 'HH') 
      : format(new Date(), 'HH')
  );
  
  const [timeMinutes, setTimeMinutes] = useState<string>(
    initialData?.timestamp 
      ? format(new Date(initialData.timestamp), 'mm') 
      : format(new Date(), 'mm')
  );
  
  const handleChange = (field: string, value: any) => {
    setCallData({
      ...callData,
      [field]: value
    });
  };
  
  const handleTimeChange = () => {
    if (date && timeHours && timeMinutes) {
      const newDate = new Date(date);
      newDate.setHours(parseInt(timeHours, 10), parseInt(timeMinutes, 10));
      setCallData({
        ...callData,
        timestamp: newDate.toISOString()
      });
    }
  };
  
  const handleSave = () => {
    if (date && timeHours && timeMinutes) {
      const newDate = new Date(date);
      newDate.setHours(parseInt(timeHours, 10), parseInt(timeMinutes, 10));
      onSave({
        ...callData,
        timestamp: newDate.toISOString()
      });
    } else {
      onSave(callData);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Record details about the call for tracking and follow-up.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="callType" className="text-right">
              Type
            </Label>
            <Select
              value={callData.type}
              onValueChange={(value) => handleChange("type", value)}
            >
              <SelectTrigger id="callType" className="col-span-3">
                <SelectValue placeholder="Select call type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="incoming">Incoming</SelectItem>
                <SelectItem value="outgoing">Outgoing</SelectItem>
                <SelectItem value="missed">Missed</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="contactName" className="text-right">
              Contact Name
            </Label>
            <Input
              id="contactName"
              value={callData.contactName || ""}
              onChange={(e) => handleChange("contactName", e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phoneNumber" className="text-right">
              Phone Number
            </Label>
            <Input
              id="phoneNumber"
              value={callData.phoneNumber || ""}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <div className="col-span-3">
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
                    onSelect={(newDate) => {
                      setDate(newDate);
                      if (newDate) {
                        handleTimeChange();
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right">
              Time
            </Label>
            <div className="col-span-3 flex gap-2 items-center">
              <Input
                id="timeHours"
                value={timeHours}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || /^[0-9]{1,2}$/.test(value)) {
                    const numValue = parseInt(value || "0", 10);
                    if (numValue >= 0 && numValue <= 23) {
                      setTimeHours(value.padStart(2, "0"));
                      handleTimeChange();
                    }
                  }
                }}
                className="w-16 text-center"
                placeholder="HH"
                maxLength={2}
              />
              <span>:</span>
              <Input
                id="timeMinutes"
                value={timeMinutes}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || /^[0-9]{1,2}$/.test(value)) {
                    const numValue = parseInt(value || "0", 10);
                    if (numValue >= 0 && numValue <= 59) {
                      setTimeMinutes(value.padStart(2, "0"));
                      handleTimeChange();
                    }
                  }
                }}
                className="w-16 text-center"
                placeholder="MM"
                maxLength={2}
              />
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duration" className="text-right">
              Duration (sec)
            </Label>
            <Input
              id="duration"
              type="number"
              value={callData.duration || 0}
              onChange={(e) => handleChange("duration", parseInt(e.target.value, 10) || 0)}
              className="col-span-3"
              min="0"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="purpose" className="text-right">
              Purpose
            </Label>
            <Input
              id="purpose"
              value={callData.purpose || ""}
              onChange={(e) => handleChange("purpose", e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="patientName" className="text-right">
              Patient Name
            </Label>
            <Input
              id="patientName"
              value={callData.patientName || ""}
              onChange={(e) => handleChange("patientName", e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="notes" className="text-right pt-2">
              Notes
            </Label>
            <Textarea
              id="notes"
              value={callData.notes || ""}
              onChange={(e) => handleChange("notes", e.target.value)}
              className="col-span-3"
              rows={4}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Call</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CallForm;
