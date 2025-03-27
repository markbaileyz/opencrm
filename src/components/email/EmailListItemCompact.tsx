
import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Star, Paperclip } from "lucide-react";
import type { Email } from "@/types/email";

interface EmailListItemCompactProps {
  email: Email;
  isSelected: boolean;
  onClick: () => void;
  onStar: () => void;
}

const EmailListItemCompact: React.FC<EmailListItemCompactProps> = ({
  email,
  isSelected,
  onClick,
  onStar
}) => {
  // Convert date string to formatted date
  const formattedDate = new Date(email.date).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric'
  });
  
  // Get sender name (handling both formats - object and string)
  const senderName = email.senderName || (email as any).from?.name || 'Unknown';
  
  return (
    <div
      className={cn(
        "flex flex-col p-3 border-b cursor-pointer hover:bg-muted/50 transition-colors",
        isSelected && "bg-muted",
        !email.read && "font-medium"
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center space-x-2">
          <button 
            className="text-muted-foreground hover:text-yellow-400 focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              onStar();
            }}
          >
            <Star className={cn("h-4 w-4", email.starred && "fill-yellow-400 text-yellow-400")} />
          </button>
          <span className={cn("text-sm", !email.read && "font-medium")}>
            {senderName}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">{formattedDate}</span>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-xs truncate max-w-[180px]">{email.subject}</span>
        {email.hasAttachments && (
          <Paperclip className="h-3 w-3 text-muted-foreground" />
        )}
      </div>
    </div>
  );
};

export default EmailListItemCompact;
