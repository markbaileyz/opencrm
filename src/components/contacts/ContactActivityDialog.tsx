
import React from "react";
import { ContactActivity } from "@/types/contact";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContactActivityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activityType: ContactActivity["type"];
  setActivityType: (type: ContactActivity["type"]) => void;
  activityDescription: string;
  setActivityDescription: (description: string) => void;
  onSubmit: () => void;
}

const ContactActivityDialog = ({
  open,
  onOpenChange,
  activityType,
  setActivityType,
  activityDescription,
  setActivityDescription,
  onSubmit,
}: ContactActivityDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {activityType === "email" && "Log Email"}
            {activityType === "call" && "Log Call"}
            {activityType === "meeting" && "Log Meeting"}
            {activityType === "note" && "Add Note"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="activityType">Type</Label>
            <Select
              value={activityType}
              onValueChange={(value) => setActivityType(value as ContactActivity["type"])}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="call">Phone Call</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="note">Note</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">
              {activityType === "note" ? "Note" : "Description"}
            </Label>
            <Textarea
              id="description"
              value={activityDescription}
              onChange={(e) => setActivityDescription(e.target.value)}
              placeholder={
                activityType === "email" ? "Discussed project timeline and next steps..."
                : activityType === "call" ? "Called about the upcoming proposal..."
                : activityType === "meeting" ? "Met to review requirements and timeline..."
                : "Added information about the contact..."
              }
              rows={4}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button 
            onClick={onSubmit}
            disabled={!activityDescription.trim()}
          >
            {activityType === "note" ? "Add Note" : "Log Activity"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContactActivityDialog;
