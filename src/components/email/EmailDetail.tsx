
import React from "react";
import { Email } from "@/types/email";
import { ScrollArea } from "@/components/ui/scroll-area";
import EmailDetailHeader from "./EmailDetailHeader";
import EmailDetailSender from "./EmailDetailSender";
import EmailDetailBody from "./EmailDetailBody";
import EmailDetailAttachments from "./EmailDetailAttachments";
import EmailDetailActions from "./EmailDetailActions";

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

  const showLabels = Boolean(onAddLabel && onRemoveLabel);

  return (
    <div className="bg-card rounded-md border shadow-sm flex flex-col h-full">
      <EmailDetailHeader 
        subject={email.subject}
        isStarred={email.starred}
        onBack={onBack}
        onStar={() => onStar(email.id)}
        onDelete={() => onDelete(email.id)}
        onArchive={() => onArchive(email.id)}
        keyboardShortcuts={keyboardShortcuts}
      />

      <ScrollArea className="flex-1">
        <div className="p-4">
          <EmailDetailSender 
            senderName={email.senderName}
            senderEmail={email.senderEmail}
            recipient={email.recipient}
            date={email.date}
            hasAttachments={email.hasAttachments}
          />

          <EmailDetailBody 
            body={email.body}
            labels={email.labels || []}
            allLabels={allLabels}
            onAddLabel={handleAddLabel}
            onRemoveLabel={handleRemoveLabel}
            showLabels={showLabels}
          />
          
          <EmailDetailAttachments 
            hasAttachments={email.hasAttachments} 
          />
        </div>
      </ScrollArea>

      <EmailDetailActions 
        email={email}
        onReply={() => onReply(email)}
        onForward={() => onForward(email)}
        onDelete={onDelete}
        onArchive={onArchive}
        onStar={onStar}
      />
    </div>
  );
};

export default EmailDetail;
