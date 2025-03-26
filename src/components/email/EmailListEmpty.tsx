
import React from "react";
import { Mail, Inbox, Archive, Trash, AlertCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmailListEmptyProps {
  folder?: string;
  onComposeClick?: () => void;
}

const EmailListEmpty: React.FC<EmailListEmptyProps> = ({ 
  folder = "inbox", 
  onComposeClick 
}) => {
  // Determine icon, message, and action based on folder
  const getFolderDetails = () => {
    switch (folder) {
      case "inbox":
        return {
          icon: <Inbox className="h-16 w-16 text-muted-foreground/50" />,
          message: "Your inbox is empty",
          description: "You don't have any new emails in your inbox",
          action: onComposeClick ? (
            <Button onClick={onComposeClick} className="mt-2">
              Compose a message
            </Button>
          ) : null
        };
      case "sent":
        return {
          icon: <Send className="h-16 w-16 text-muted-foreground/50" />,
          message: "No sent emails",
          description: "You haven't sent any emails yet",
          action: onComposeClick ? (
            <Button onClick={onComposeClick} className="mt-2">
              Compose your first email
            </Button>
          ) : null
        };
      case "trash":
        return {
          icon: <Trash className="h-16 w-16 text-muted-foreground/50" />,
          message: "Trash is empty",
          description: "No emails in trash folder",
          action: null
        };
      case "archive":
        return {
          icon: <Archive className="h-16 w-16 text-muted-foreground/50" />,
          message: "No archived emails",
          description: "You haven't archived any emails yet",
          action: null
        };
      case "drafts":
        return {
          icon: <Mail className="h-16 w-16 text-muted-foreground/50" />,
          message: "No draft emails",
          description: "You don't have any emails saved as drafts",
          action: onComposeClick ? (
            <Button onClick={onComposeClick} className="mt-2">
              Create a draft
            </Button>
          ) : null
        };
      default:
        return {
          icon: <AlertCircle className="h-16 w-16 text-muted-foreground/50" />,
          message: "No emails in this folder",
          description: "This folder is currently empty",
          action: null
        };
    }
  };

  const { icon, message, description, action } = getFolderDetails();

  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-4 bg-muted/30 rounded-lg border border-dashed border-muted">
      {icon}
      <h3 className="text-xl font-medium">{message}</h3>
      <p className="text-muted-foreground text-center max-w-md">{description}</p>
      {action}
    </div>
  );
};

export default EmailListEmpty;
