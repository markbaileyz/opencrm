
import React from "react";
import { Email } from "@/types/email";
import { cn } from "@/lib/utils";
import { Star, Paperclip } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface EmailListItemCompactProps {
  email: Email;
  onClick: () => void;
  selected: boolean;
}

const EmailListItemCompact: React.FC<EmailListItemCompactProps> = ({
  email,
  onClick,
  selected,
}) => {
  const formattedDate = formatDistanceToNow(new Date(email.date), { addSuffix: true });
  
  return (
    <li
      className={cn(
        "py-2 px-4 hover:bg-muted/50 cursor-pointer",
        selected && "bg-muted",
        !email.read && "font-medium"
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-1">
        <span className="text-sm font-medium truncate max-w-[70%]">
          {email.sender.name}
        </span>
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {formattedDate}
        </span>
      </div>
      
      <div className="text-sm font-medium mb-1 truncate">
        {email.subject}
      </div>
      
      <div className="text-xs text-muted-foreground truncate mb-1">
        {email.content.substring(0, 100)}
        {email.content.length > 100 ? "..." : ""}
      </div>
      
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-2">
          {email.attachments && email.attachments.length > 0 && (
            <Paperclip className="h-3 w-3 text-muted-foreground" />
          )}
          {email.labels && email.labels.length > 0 && (
            <div className="flex gap-1">
              {email.labels.map((label) => (
                <div
                  key={label}
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor:
                      label === "work" ? "rgb(59, 130, 246)" :
                      label === "personal" ? "rgb(139, 92, 246)" :
                      label === "important" ? "rgb(249, 115, 22)" :
                      "rgb(107, 114, 128)"
                  }}
                />
              ))}
            </div>
          )}
        </div>
        
        <button
          className="text-muted-foreground hover:text-yellow-400 focus:outline-none"
          onClick={(e) => {
            e.stopPropagation();
            // Toggle star status
          }}
        >
          <Star className={cn("h-4 w-4", email.starred && "fill-yellow-400 text-yellow-400")} />
        </button>
      </div>
    </li>
  );
};

export default EmailListItemCompact;
