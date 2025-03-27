
import React from "react";
import EmailListItem from "./EmailListItem";
import EmailListEmpty from "./EmailListEmpty";
import { Email } from "@/types/email";
import { Loader2 } from "lucide-react";

interface EmailListProps {
  emails: Email[];
  loading?: boolean;
  error?: string | null;
  selectedEmailId?: string;
  onSelectEmail: (email: Email) => void;
  onStarEmail: (id: string) => void;
  onDeleteEmail: (id: string) => void;
  onArchiveEmail: (id: string) => void;
  folder?: string;
  onComposeClick?: () => void;
}

const EmailList: React.FC<EmailListProps> = ({
  emails,
  loading = false,
  error = null,
  selectedEmailId,
  onSelectEmail,
  onStarEmail,
  onDeleteEmail,
  onArchiveEmail,
  folder = "inbox",
  onComposeClick
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <span className="ml-2 text-muted-foreground">Loading emails...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-destructive">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (emails.length === 0) {
    return <EmailListEmpty folder={folder} />;
  }

  return (
    <div className="divide-y">
      {emails.map((email) => (
        <EmailListItem
          key={email.id}
          email={email}
          isSelected={email.id === selectedEmailId}
          onClick={() => onSelectEmail(email)}
          onStarClick={(e) => {
            e.stopPropagation();
            onStarEmail(email.id);
          }}
          onDelete={() => onDeleteEmail(email.id)}
          onArchive={() => onArchiveEmail(email.id)}
        />
      ))}
    </div>
  );
};

export default EmailList;
