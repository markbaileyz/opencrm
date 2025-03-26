
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { 
  ArrowLeft, 
  Star, 
  StarOff, 
  Trash, 
  Archive, 
  Reply, 
  Forward,
  Keyboard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Email } from "@/types/email";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import EmailLabels from "./EmailLabels";

interface EmailDetailProps {
  email: Email;
  onBack: () => void;
  onStar: (id: string) => void;
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
  onReply: (email: Email) => void;
  onForward: (email: Email) => void;
  onAddLabel?: (id: string, label: string) => void;
  onRemoveLabel?: (id: string, label: string) => void;
  allLabels?: string[];
  keyboardShortcuts?: { key: string; action: string }[];
}

const EmailDetail = ({
  email,
  onBack,
  onStar,
  onDelete,
  onArchive,
  onReply,
  onForward,
  onAddLabel,
  onRemoveLabel,
  allLabels = [],
  keyboardShortcuts = [],
}: EmailDetailProps) => {
  if (!email) return null;

  // Extract first letter of sender name for avatar
  const senderInitial = email.senderName.charAt(0).toUpperCase();

  const handleAddLabel = (label: string) => {
    if (onAddLabel) {
      onAddLabel(email.id, label);
    }
  };

  const handleRemoveLabel = (label: string) => {
    if (onRemoveLabel) {
      onRemoveLabel(email.id, label);
    }
  };

  return (
    <div className="bg-card rounded-md border shadow-sm flex flex-col h-full">
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
          <h3 className="text-lg font-medium">{email.subject}</h3>
        </div>
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onStar(email.id)}
                >
                  {email.starred ? (
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ) : (
                    <StarOff className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {email.starred ? "Unstar (s)" : "Star (s)"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onArchive(email.id)}
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
                  onClick={() => onDelete(email.id)}
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

      <ScrollArea className="flex-1">
        <div className="p-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10 bg-primary text-primary-foreground">
                <div>{senderInitial}</div>
              </Avatar>
              <div>
                <div className="font-medium">
                  {email.senderName} <span className="text-muted-foreground font-normal">{`<${email.senderEmail}>`}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  To: {email.recipient}
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(email.date), { addSuffix: true })}
                </div>
              </div>
            </div>
            
            {email.hasAttachments && (
              <div className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                Has attachments
              </div>
            )}
          </div>

          {onAddLabel && onRemoveLabel && (
            <div className="mb-4">
              <EmailLabels 
                labels={email.labels || []}
                allLabels={allLabels}
                onAddLabel={handleAddLabel}
                onRemoveLabel={handleRemoveLabel}
              />
            </div>
          )}

          <Separator className="my-4" />
          
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <div dangerouslySetInnerHTML={{ __html: email.body }} />
          </div>
          
          {email.hasAttachments && (
            <div className="mt-6 border rounded-md p-3">
              <h4 className="text-sm font-medium mb-2">Attachments</h4>
              <div className="flex gap-2">
                <div className="bg-muted/50 p-2 rounded text-xs flex items-center gap-1 cursor-pointer hover:bg-muted">
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <line x1="10" y1="9" x2="8" y2="9" />
                  </svg>
                  document.pdf
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-3 border-t">
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-1" 
                  onClick={() => onReply(email)}
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
                  onClick={() => onForward(email)}
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
    </div>
  );
};

export default EmailDetail;
