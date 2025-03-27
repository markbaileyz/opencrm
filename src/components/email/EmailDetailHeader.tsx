
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Trash, Archive } from "lucide-react";

interface EmailDetailHeaderProps {
  subject: string;
  isStarred: boolean;
  onBack: () => void;
  onStar: () => void;
  onDelete: () => void;
  onArchive: () => void;
}

const EmailDetailHeader: React.FC<EmailDetailHeaderProps> = ({
  subject,
  isStarred,
  onBack,
  onStar,
  onDelete,
  onArchive
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-medium">{subject}</h2>
      </div>
      
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" onClick={onStar}>
          <Star className={`h-4 w-4 ${isStarred ? "text-yellow-400 fill-yellow-400" : ""}`} />
        </Button>
        
        <Button variant="ghost" size="sm" onClick={onArchive}>
          <Archive className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="sm" onClick={onDelete}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default EmailDetailHeader;
