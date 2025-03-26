
import React from "react";
import type { Email } from "@/types/email";
import EmailList from "@/components/email/EmailList";
import EmailDetail from "@/components/email/EmailDetail";

interface EmailContentProps {
  activeTab: string;
  selectedEmail: Email | null;
  filteredEmails: Email[];
  onSelectEmail: (email: Email) => void;
  onBackToList: () => void;
  onStarEmail: (id: string) => void;
  onDeleteEmail: (id: string) => void;
  onArchiveEmail: (id: string) => void;
  onReplyEmail: (email: Email) => void;
  onForwardEmail: (email: Email) => void;
  keyboardShortcuts?: { key: string; action: string }[];
}

const EmailContent: React.FC<EmailContentProps> = ({
  activeTab,
  selectedEmail,
  filteredEmails,
  onSelectEmail,
  onBackToList,
  onStarEmail,
  onDeleteEmail,
  onArchiveEmail,
  onReplyEmail,
  onForwardEmail,
  keyboardShortcuts = [],
}) => {
  if (selectedEmail) {
    return (
      <div className="mt-0">
        <EmailDetail 
          email={selectedEmail}
          onBack={onBackToList}
          onStar={onStarEmail}
          onDelete={onDeleteEmail}
          onArchive={onArchiveEmail}
          onReply={onReplyEmail}
          onForward={onForwardEmail}
          keyboardShortcuts={keyboardShortcuts}
        />
      </div>
    );
  }

  return (
    <div className="mt-0">
      <EmailList 
        emails={filteredEmails}
        folder={activeTab}
        onSelectEmail={onSelectEmail}
        onStarEmail={onStarEmail}
        onDeleteEmail={onDeleteEmail}
        onArchiveEmail={onArchiveEmail}
      />
    </div>
  );
};

export default EmailContent;
