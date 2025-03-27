
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Check, Clock, MessageSquare, FileText, Calendar, User } from "lucide-react";

interface DealTimelineItemProps {
  type: "stage-change" | "note" | "meeting" | "email" | "task" | "contact";
  title: string;
  date: Date;
  user: string;
  description?: string;
  completed?: boolean;
}

const DealTimelineItem: React.FC<DealTimelineItemProps> = ({
  type,
  title,
  date,
  user,
  description,
  completed
}) => {
  const getIcon = () => {
    switch (type) {
      case "stage-change":
        return <Check className="h-4 w-4" />;
      case "note":
        return <FileText className="h-4 w-4" />;
      case "meeting":
        return <Calendar className="h-4 w-4" />;
      case "email":
        return <MessageSquare className="h-4 w-4" />;
      case "task":
        return <Clock className="h-4 w-4" />;
      case "contact":
        return <User className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getIconBackground = () => {
    switch (type) {
      case "stage-change":
        return "bg-green-100 text-green-600";
      case "note":
        return "bg-blue-100 text-blue-600";
      case "meeting":
        return "bg-purple-100 text-purple-600";
      case "email":
        return "bg-yellow-100 text-yellow-600";
      case "task":
        return completed ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600";
      case "contact":
        return "bg-indigo-100 text-indigo-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="flex gap-3 mb-4">
      <div className={`mt-1 h-8 w-8 flex items-center justify-center rounded-full ${getIconBackground()}`}>
        {getIcon()}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h4 className="font-medium text-sm">{title}</h4>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(date, { addSuffix: true })}
          </span>
        </div>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
        <div className="text-xs text-muted-foreground mt-1">
          by {user}
        </div>
      </div>
    </div>
  );
};

export default DealTimelineItem;
