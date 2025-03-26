
import React from "react";

// Message Item Component
interface MessageItemProps {
  name: string;
  message: string;
  time: string;
  unread?: boolean;
}

const MessageItem = ({ name, message, time, unread }: MessageItemProps) => {
  return (
    <div className={`flex items-start p-3 rounded-lg ${unread ? "bg-primary/5" : "hover:bg-secondary/50"} transition-colors`}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className={`font-medium text-sm ${unread ? "text-primary" : ""}`}>{name}</p>
          <p className="text-xs text-muted-foreground">{time}</p>
        </div>
        <p className="text-xs text-muted-foreground truncate">{message}</p>
      </div>
      {unread && (
        <div className="ml-2 h-2 w-2 rounded-full bg-primary"></div>
      )}
    </div>
  );
};

export default MessageItem;
