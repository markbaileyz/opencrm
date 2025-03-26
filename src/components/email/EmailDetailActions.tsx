
import React from "react";
import { Reply, Forward } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface EmailDetailActionsProps {
  onReply: () => void;
  onForward: () => void;
}

const EmailDetailActions: React.FC<EmailDetailActionsProps> = ({
  onReply,
  onForward
}) => {
  return (
    <div className="p-3 border-t">
      <div className="flex gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1" 
                onClick={onReply}
              >
                <Reply className="h-4 w-4" />
                Reply
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              Reply (r)
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1" 
                onClick={onForward}
              >
                <Forward className="h-4 w-4" />
                Forward
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              Forward (f)
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default EmailDetailActions;
