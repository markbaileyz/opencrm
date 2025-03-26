
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Avatar } from "@/components/ui/avatar";

interface EmailDetailSenderProps {
  senderName: string;
  senderEmail: string;
  recipient: string;
  date: string;
  hasAttachments: boolean;
}

const EmailDetailSender: React.FC<EmailDetailSenderProps> = ({
  senderName,
  senderEmail,
  recipient,
  date,
  hasAttachments
}) => {
  // Extract first letter of sender name for avatar
  const senderInitial = senderName.charAt(0).toUpperCase();

  return (
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-start gap-3">
        <Avatar className="h-10 w-10 bg-primary text-primary-foreground">
          <div>{senderInitial}</div>
        </Avatar>
        <div>
          <div className="font-medium">
            {senderName} <span className="text-muted-foreground font-normal">{`<${senderEmail}>`}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            To: {recipient}
          </div>
          <div className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(date), { addSuffix: true })}
          </div>
        </div>
      </div>
      
      {hasAttachments && (
        <div className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
          Has attachments
        </div>
      )}
    </div>
  );
};

export default EmailDetailSender;
