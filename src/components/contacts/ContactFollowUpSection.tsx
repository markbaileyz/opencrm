
import React, { useState } from "react";
import { FollowUp, FollowUpStatus, ContactPriority } from "@/types/contact";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import FollowUpReminder from "./FollowUpReminder";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { v4 as uuidv4 } from "uuid";

interface ContactFollowUpSectionProps {
  contact: { id: string; followUp?: FollowUp };
  onUpdateFollowUp: (followUp: FollowUp) => void;
}

const ContactFollowUpSection = ({ contact, onUpdateFollowUp }: ContactFollowUpSectionProps) => {
  const [followUpDialogOpen, setFollowUpDialogOpen] = useState(false);
  const [followUpData, setFollowUpData] = useState<Omit<FollowUp, "id" | "contactId">>({
    dueDate: "",
    description: "",
    status: "pending",
    priority: "medium"
  });

  const handleFollowUpChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFollowUpData({
      ...followUpData,
      [name]: value,
    });
  };

  const handleFollowUpPriorityChange = (priority: ContactPriority) => {
    setFollowUpData({
      ...followUpData,
      priority,
    });
  };

  const handleAddFollowUp = () => {
    if (followUpData.dueDate && followUpData.description) {
      const newFollowUp: FollowUp = {
        id: uuidv4(),
        contactId: contact.id,
        ...followUpData
      };

      onUpdateFollowUp(newFollowUp);
      setFollowUpDialogOpen(false);
      resetFollowUpForm();
    }
  };

  const handleCompleteFollowUp = (followUpId: string) => {
    if (contact.followUp && contact.followUp.id === followUpId) {
      const updatedFollowUp: FollowUp = {
        ...contact.followUp,
        status: "completed"
      };

      onUpdateFollowUp(updatedFollowUp);
    }
  };

  const handleRescheduleFollowUp = (followUpId: string) => {
    if (contact.followUp && contact.followUp.id === followUpId) {
      setFollowUpData({
        dueDate: contact.followUp.dueDate,
        description: contact.followUp.description,
        status: "pending",
        priority: contact.followUp.priority
      });
      setFollowUpDialogOpen(true);
    }
  };

  const resetFollowUpForm = () => {
    setFollowUpData({
      dueDate: "",
      description: "",
      status: "pending",
      priority: "medium"
    });
  };

  return (
    <>
      {contact.followUp ? (
        <FollowUpReminder 
          followUp={contact.followUp}
          onComplete={handleCompleteFollowUp}
          onReschedule={handleRescheduleFollowUp}
          className="mt-4"
        />
      ) : (
        <Button 
          variant="outline" 
          className="w-full mt-4" 
          onClick={() => setFollowUpDialogOpen(true)}
        >
          <Bell className="h-4 w-4 mr-2" />
          Add Follow-up Reminder
        </Button>
      )}

      {/* Follow-up Dialog */}
      <Dialog open={followUpDialogOpen} onOpenChange={(open) => {
        setFollowUpDialogOpen(open);
        if (!open) resetFollowUpForm();
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {contact.followUp ? "Update Follow-up Reminder" : "Add Follow-up Reminder"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                name="dueDate"
                type="date"
                value={followUpData.dueDate}
                onChange={handleFollowUpChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={followUpData.priority}
                onValueChange={value => handleFollowUpPriorityChange(value as ContactPriority)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={followUpData.description}
                onChange={handleFollowUpChange}
                placeholder="Follow up about the proposal..."
                rows={3}
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setFollowUpDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddFollowUp}
              disabled={!followUpData.dueDate || !followUpData.description}
            >
              {contact.followUp ? "Update Reminder" : "Add Reminder"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactFollowUpSection;
