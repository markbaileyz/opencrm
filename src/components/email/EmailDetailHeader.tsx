
import React from "react";
import { ArrowLeft, Star, StarOff, Trash, Archive, Keyboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";

interface EmailDetailHeaderProps {
  subject: string;
  isStarred: boolean;
  onBack: () => void;
  onStar: () => void;
  onDelete: () => void;
  onArchive: () => void;
  keyboardShortcuts?: { key: string; action: string }[];
}

const EmailDetailHeader: React.FC<EmailDetailHeaderProps> = ({
  subject,
  isStarred,
  onBack,
  onStar,
  onDelete,
  onArchive,
  keyboardShortcuts = []
}) => {
  return (
    <div className="p-3 border-b flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Tooltip content="Back to list (Esc)">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Tooltip>
        <h3 className="text-lg font-medium">{subject}</h3>
      </div>
      <div className="flex items-center gap-1">
        <Tooltip content={isStarred ? "Unstar (s)" : "Star (s)"}>
          <Button
            variant="ghost"
            size="sm"
            onClick={onStar}
          >
            {isStarred ? (
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            ) : (
              <StarOff className="h-4 w-4" />
            )}
          </Button>
        </Tooltip>
        
        <Tooltip content="Archive (a)">
          <Button
            variant="ghost"
            size="sm"
            onClick={onArchive}
          >
            <Archive className="h-4 w-4" />
          </Button>
        </Tooltip>
        
        <Tooltip content="Delete (d)">
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </Tooltip>
        
        {keyboardShortcuts.length > 0 && (
          <Tooltip content={
            <div className="text-xs">
              <p className="font-semibold mb-1">Keyboard shortcuts:</p>
              <ul className="space-y-1">
                {keyboardShortcuts.map((shortcut, index) => (
                  <li key={index} className="flex justify-between gap-4">
                    <span className="font-mono bg-muted px-1 rounded">{shortcut.key}</span>
                    <span>{shortcut.action}</span>
                  </li>
                ))}
              </ul>
            </div>
          }>
            <Button variant="ghost" size="sm">
              <Keyboard className="h-4 w-4" />
            </Button>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default EmailDetailHeader;
