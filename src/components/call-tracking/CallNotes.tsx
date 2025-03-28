
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CallRecord } from "@/types/call";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Save, 
  Edit2, 
  Plus, 
  Calendar, 
  CheckCircle2 
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CallNotesProps {
  call: CallRecord;
  onUpdate: (callId: string, updates: Partial<CallRecord>) => void;
  onScheduleFollowUp?: (callId: string, date: string) => void;
}

const CallNotes: React.FC<CallNotesProps> = ({ 
  call, 
  onUpdate,
  onScheduleFollowUp 
}) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(call.notes || "");
  const [isAddingFollowUp, setIsAddingFollowUp] = useState(false);
  const [followUpDate, setFollowUpDate] = useState(
    call.followUp?.date ? new Date(call.followUp.date).toISOString().split('T')[0] : ""
  );
  const [followUpNotes, setFollowUpNotes] = useState(call.followUp?.notes || "");
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleSaveNotes = () => {
    onUpdate(call.id, { notes });
    setIsEditing(false);
    toast({
      title: "Notes saved",
      description: "Call notes have been updated successfully.",
    });
  };

  const handleScheduleFollowUp = () => {
    if (!followUpDate) {
      toast({
        title: "Date required",
        description: "Please select a follow-up date.",
        variant: "destructive"
      });
      return;
    }

    const followUp = {
      date: followUpDate,
      status: 'pending' as const,
      notes: followUpNotes
    };
    
    onUpdate(call.id, { followUp });
    
    if (onScheduleFollowUp) {
      onScheduleFollowUp(call.id, followUpDate);
    }
    
    setIsAddingFollowUp(false);
    toast({
      title: "Follow-up scheduled",
      description: "A follow-up call has been scheduled.",
    });
  };

  const handleFollowUpComplete = () => {
    if (!call.followUp) return;
    
    const updatedFollowUp = {
      ...call.followUp,
      status: 'completed' as const
    };
    
    onUpdate(call.id, { followUp: updatedFollowUp });
    toast({
      title: "Follow-up completed",
      description: "The follow-up has been marked as completed.",
    });
  };

  return (
    <Card className="mt-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Notes & Follow-up</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Notes Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Call Notes</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsEditing(!isEditing)} 
              className="h-8 px-2"
            >
              {isEditing ? (
                <Save className="h-4 w-4" />
              ) : (
                <Edit2 className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          {isEditing ? (
            <div className="space-y-2">
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter notes about this call..."
                className="min-h-[100px]"
              />
              <Button 
                onClick={handleSaveNotes} 
                className="mt-2"
              >
                Save Notes
              </Button>
            </div>
          ) : (
            <div className="p-3 bg-muted/40 rounded-md min-h-[60px]">
              {notes ? notes : (
                <span className="text-muted-foreground italic">No notes added for this call.</span>
              )}
            </div>
          )}
        </div>

        {/* Follow-up Section */}
        <div className="space-y-2 pt-2 border-t">
          <h3 className="font-medium">Follow-up</h3>
          
          {call.followUp ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {new Date(call.followUp.date).toLocaleDateString()} 
                    ({formatDistanceToNow(new Date(call.followUp.date), { addSuffix: true })})
                  </span>
                  <Badge variant={call.followUp.status === 'completed' ? 'outline' : 'default'}>
                    {call.followUp.status === 'completed' ? 'Completed' : 'Pending'}
                  </Badge>
                </div>
                
                {call.followUp.status === 'pending' && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleFollowUpComplete}
                    className="h-8 px-2"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              {call.followUp.notes && (
                <Collapsible
                  open={!isCollapsed}
                  onOpenChange={setIsCollapsed}
                  className="w-full"
                >
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-0 h-auto">
                      <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {isCollapsed ? "Show notes" : "Hide notes"}
                      </span>
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-2">
                    <div className="p-3 bg-muted/40 rounded-md text-sm">
                      {call.followUp.notes}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}
            </div>
          ) : isAddingFollowUp ? (
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
                <Button onClick={handleScheduleFollowUp}>
                  Schedule Follow-up
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => setIsAddingFollowUp(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex">
              <Button 
                variant="outline" 
                onClick={() => setIsAddingFollowUp(true)} 
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Schedule Follow-up
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CallNotes;
