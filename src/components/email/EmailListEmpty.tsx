
import React from "react";
import { Mail, Inbox, Archive, Trash } from "lucide-react";

interface EmailListEmptyProps {
  folder?: string;
}

const EmailListEmpty: React.FC<EmailListEmptyProps> = ({ folder = "inbox" }) => {
  // Determine icon and message based on folder
  const getFolderDetails = () => {
    switch (folder) {
      case "inbox":
        return {
          icon: <Inbox className="h-12 w-12 text-muted-foreground/50" />,
          message: "Your inbox is empty"
        };
      case "sent":
        return {
          icon: <Mail className="h-12 w-12 text-muted-foreground/50" />,
          message: "No sent emails"
        };
      case "trash":
        return {
          icon: <Trash className="h-12 w-12 text-muted-foreground/50" />,
          message: "Trash is empty"
        };
      case "archive":
        return {
          icon: <Archive className="h-12 w-12 text-muted-foreground/50" />,
          message: "No archived emails"
        };
      default:
        return {
          icon: <Mail className="h-12 w-12 text-muted-foreground/50" />,
          message: "No emails in this folder"
        };
    }
  };

  const { icon, message } = getFolderDetails();

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-3 bg-muted/30 rounded-lg border border-dashed border-muted">
      {icon}
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
};

export default EmailListEmpty;
