
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CallRecord, CallDirection, CallStatus, CallPriority } from "@/types/callTracking";
import { format } from "date-fns";

interface CallFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (call: Partial<CallRecord>) => void;
  initialData?: CallRecord;
  patientId?: string;
}

const CallForm: React.FC<CallFormProps> = ({
  open,
  onOpenChange,
  onSave,
  initialData,
  patientId,
}) => {
  const [direction, setDirection] = useState<CallDirection>(initialData?.direction || "outbound");
  const [status, setStatus] = useState<CallStatus>(initialData?.status || "completed");
  const [priority, setPriority] = useState<CallPriority>(initialData?.priority || "normal");
  const [timestamp, setTimestamp] = useState(
    initialData?.timestamp || format(new Date(), "yyyy-MM-dd'T'HH:mm")
  );
  const [duration, setDuration] = useState(initialData?.duration?.toString() || "");
  const [notes, setNotes] = useState(initialData?.notes || "");
  const [followUpRequired, setFollowUpRequired] = useState(initialData?.followUpRequired || false);
  const [followUpDate, setFollowUpDate] = useState(
    initialData?.followUpDate || format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), "yyyy-MM-dd")
  );
  const [staffMember, setStaffMember] = useState(initialData?.staffMember || "");
  const [tags, setTags] = useState(initialData?.tags?.join(", ") || "");
  
  const handleSubmit = () => {
    const callData: Partial<CallRecord> = {
      ...(initialData?.id ? { id: initialData.id } : {}),
      patientId: patientId || initialData?.patientId || "",
      direction,
      status,
      priority,
      timestamp,
      duration: duration ? parseInt(duration, 10) : undefined,
      notes: notes || undefined,
      followUpRequired,
      followUpDate: followUpRequired ? followUpDate : undefined,
      staffMember: staffMember || undefined,
      tags: tags ? tags.split(",").map(tag => tag.trim()) : undefined,
    };
    
    onSave(callData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Call Record" : "Log New Call"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Call Type</Label>
              <RadioGroup 
                value={direction} 
                onValueChange={(value) => setDirection(value as CallDirection)}
                className="flex"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inbound" id="inbound" />
                  <Label htmlFor="inbound" className="cursor-pointer">Inbound</Label>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <RadioGroupItem value="outbound" id="outbound" />
                  <Label htmlFor="outbound" className="cursor-pointer">Outbound</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label>Status</Label>
              <RadioGroup 
                value={status} 
                onValueChange={(value) => setStatus(value as CallStatus)}
                className="flex flex-wrap"
              >
                <div className="flex items-center space-x-2 mr-4 mb-2">
                  <RadioGroupItem value="completed" id="completed" />
                  <Label htmlFor="completed" className="cursor-pointer">Completed</Label>
                </div>
                <div className="flex items-center space-x-2 mr-4 mb-2">
                  <RadioGroupItem value="missed" id="missed" />
                  <Label htmlFor="missed" className="cursor-pointer">Missed</Label>
                </div>
                <div className="flex items-center space-x-2 mr-4 mb-2">
                  <RadioGroupItem value="scheduled" id="scheduled" />
                  <Label htmlFor="scheduled" className="cursor-pointer">Scheduled</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cancelled" id="cancelled" />
                  <Label htmlFor="cancelled" className="cursor-pointer">Cancelled</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timestamp">Date & Time</Label>
              <Input
                id="timestamp"
                type="datetime-local"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
              />
            </div>
            
            {status === "completed" && (
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (seconds)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="0"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g., 120 (2 minutes)"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="staffMember">Staff Member</Label>
              <Input
                id="staffMember"
                value={staffMember}
                onChange={(e) => setStaffMember(e.target.value)}
                placeholder="Staff name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <RadioGroup 
                value={priority} 
                onValueChange={(value) => setPriority(value as CallPriority)}
                className="flex"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="normal" id="normal" />
                  <Label htmlFor="normal" className="cursor-pointer">Normal</Label>
                </div>
                <div className="flex items-center space-x-2 mx-4">
                  <RadioGroupItem value="urgent" id="urgent" />
                  <Label htmlFor="urgent" className="cursor-pointer">Urgent</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="follow-up" id="follow-up" />
                  <Label htmlFor="follow-up" className="cursor-pointer">Follow-up</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Call details, discussion points, etc."
              rows={4}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., billing, prescription, follow-up"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="followUpRequired" className="cursor-pointer">Follow-up Required</Label>
              <Switch
                id="followUpRequired"
                checked={followUpRequired}
                onCheckedChange={setFollowUpRequired}
              />
            </div>
            
            {followUpRequired && (
              <div className="mt-2">
                <Label htmlFor="followUpDate">Follow-up Date</Label>
                <Input
                  id="followUpDate"
                  type="date"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Save Call Record</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CallForm;
