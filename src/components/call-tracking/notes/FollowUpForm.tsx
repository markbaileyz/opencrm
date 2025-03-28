
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface FollowUpFormProps {
  initialDate?: string;
  initialNotes?: string;
  onSave: (date: string, notes: string) => void;
  onCancel: () => void;
}

const FollowUpForm: React.FC<FollowUpFormProps> = ({ 
  initialDate = "", 
  initialNotes = "", 
  onSave, 
  onCancel 
}) => {
  const { toast } = useToast();
  const [followUpDate, setFollowUpDate] = useState(initialDate);
  const [followUpNotes, setFollowUpNotes] = useState(initialNotes);

  const handleSubmit = () => {
    if (!followUpDate) {
      toast({
        title: "Date required",
        description: "Please select a follow-up date.",
        variant: "destructive"
      });
      return;
    }
    
    onSave(followUpDate, followUpNotes);
  };

  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor="followUpDate">Follow-up Date</Label>
        <Input
          id="followUpDate"
          type="date"
          value={followUpDate}
          onChange={(e) => setFollowUpDate(e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="followUpNotes">Follow-up Notes (Optional)</Label>
        <Textarea
          id="followUpNotes"
          value={followUpNotes}
          onChange={(e) => setFollowUpNotes(e.target.value)}
          placeholder="Add notes for the follow-up..."
          className="mt-1"
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={handleSubmit}>
          Schedule Follow-up
        </Button>
        <Button 
          variant="ghost" 
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default FollowUpForm;
