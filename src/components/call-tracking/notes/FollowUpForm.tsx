
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface FollowUpFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (date: string, notes: string) => void;
  initialDate?: Date;
  initialNotes?: string;
  onCancel?: () => void; // Added the missing prop
}

const FollowUpForm: React.FC<FollowUpFormProps> = ({
  isOpen,
  onClose,
  onSave,
  initialDate,
  initialNotes = "",
  onCancel, // Include the new prop in the component
}) => {
  const [date, setDate] = useState<Date | undefined>(initialDate);
  const [notes, setNotes] = useState<string>(initialNotes);
  
  const handleSave = () => {
    if (!date) return;
    onSave(format(date, "yyyy-MM-dd"), notes);
  };
  
  const handleCancel = () => {
    // Use onCancel if provided, otherwise use onClose
    if (onCancel) {
      onCancel();
    } else {
      onClose();
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule Follow-up</DialogTitle>
          <DialogDescription>
            Set a date and notes for the follow-up action.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Date</label>
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
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="grid gap-2">
            <label className="text-sm font-medium">Notes</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about the follow-up action..."
              rows={4}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!date}>
            Save Follow-up
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FollowUpForm;
