
import React from "react";
import { Button } from "@/components/ui/button";
import { Mail, Trash, Archive, Star, Reply, Forward, CalendarPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import type { Email } from "@/types/email";

interface EmailDetailActionsProps {
  email: Email;
  onReply: (email: Email) => void;
  onForward: (email: Email) => void;
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
  onStar: (id: string) => void;
}

const EmailDetailActions = ({
  email,
  onReply,
  onForward,
  onDelete,
  onArchive,
  onStar,
}: EmailDetailActionsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCreateAppointment = () => {
    // Navigate to calendar with email ID as parameter
    navigate(`/calendar?emailId=${email.id}`);
    
    toast({
      title: "Creating appointment",
      description: "Navigating to calendar to create an appointment from this email",
      variant: "default"
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="ghost" size="sm" onClick={() => onReply(email)}>
        <Reply className="h-4 w-4 mr-2" />
        Reply
      </Button>
      <Button variant="ghost" size="sm" onClick={() => onForward(email)}>
        <Forward className="h-4 w-4 mr-2" />
        Forward
      </Button>
      <Button variant="ghost" size="sm" onClick={handleCreateAppointment}>
        <CalendarPlus className="h-4 w-4 mr-2" />
        Schedule Meeting
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onStar(email.id)}
        className={email.starred ? "text-yellow-500" : ""}
      >
        <Star className={`h-4 w-4 mr-2 ${email.starred ? "fill-yellow-500" : ""}`} />
        {email.starred ? "Unstar" : "Star"}
      </Button>
      <Button variant="ghost" size="sm" onClick={() => onArchive(email.id)}>
        <Archive className="h-4 w-4 mr-2" />
        Archive
      </Button>
      <Button variant="ghost" size="sm" onClick={() => onDelete(email.id)}>
        <Trash className="h-4 w-4 mr-2" />
        Delete
      </Button>
    </div>
  );
};

export default EmailDetailActions;
