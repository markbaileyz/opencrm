
import React from "react";
import { ArrowLeft, Star, StarOff, Trash, Archive, Keyboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Back to list (Esc)
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <h3 className="text-lg font-medium">{subject}</h3>
      </div>
      <div className="flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
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
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {isStarred ? "Unstar (s)" : "Star (s)"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={onArchive}
              >
                <Archive className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Archive (a)
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={onDelete}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Delete (d)
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {keyboardShortcuts.length > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Keyboard className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
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
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
};

export default EmailDetailHeader;
