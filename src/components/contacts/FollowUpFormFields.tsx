
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Bell } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContactPriority } from "@/types/contact";

interface FollowUpFormFieldsProps {
  includeFollowUp: boolean;
  setIncludeFollowUp: (value: boolean) => void;
  followUpData: {
    dueDate: string;
    description: string;
    priority: ContactPriority;
  };
  handleFollowUpChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleFollowUpPriorityChange: (value: ContactPriority) => void;
}

const FollowUpFormFields: React.FC<FollowUpFormFieldsProps> = ({
  includeFollowUp,
  setIncludeFollowUp,
  followUpData,
  handleFollowUpChange,
  handleFollowUpPriorityChange,
}) => {
  return (
    <div className="border-t pt-4 mt-2">
      <div className="flex items-center space-x-2 mb-4">
        <Checkbox 
          id="includeFollowUp"
          checked={includeFollowUp}
          onCheckedChange={(checked) => setIncludeFollowUp(checked === true)}
        />
        <Label htmlFor="includeFollowUp" className="flex items-center">
          <Bell className="h-4 w-4 mr-2" />
          Set follow-up reminder
        </Label>
      </div>
      
      {includeFollowUp && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-6">
          <div className="grid gap-2">
            <Label htmlFor="followUpDueDate">Follow-up Date</Label>
            <Input
              id="followUpDueDate"
              name="dueDate"
              type="date"
              value={followUpData.dueDate}
              onChange={handleFollowUpChange}
              required={includeFollowUp}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="followUpPriority">Priority</Label>
            <Select
              value={followUpData.priority}
              onValueChange={(value) => handleFollowUpPriorityChange(value as ContactPriority)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label htmlFor="followUpDescription">Description</Label>
            <Textarea
              id="followUpDescription"
              name="description"
              placeholder="What needs to be followed up on..."
              value={followUpData.description}
              onChange={handleFollowUpChange}
              rows={2}
              required={includeFollowUp}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FollowUpFormFields;
