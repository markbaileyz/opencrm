
import React from "react";
import type { Email } from "@/types/email";
import EmailList from "@/components/email/EmailList";
import EmailDetail from "@/components/email/EmailDetail";
import { SortOption } from "@/utils/emailUtils";

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
  onComposeClick?: () => void;
  onAddLabel?: (id: string, label: string) => void;
  onRemoveLabel?: (id: string, label: string) => void;
  allLabels?: string[];
  keyboardShortcuts?: { key: string; action: string }[];
  sortOption?: SortOption;
  onSortChange?: (option: SortOption) => void;
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
  onComposeClick,
  onAddLabel,
  onRemoveLabel,
  allLabels = [],
  keyboardShortcuts = [],
  sortOption = "newest", 
  onSortChange,
}) => {
  // Pattern background styles
  const patternBackground = {
    backgroundImage: `radial-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px)`,
    backgroundSize: `20px 20px`,
  };

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
          onAddLabel={onAddLabel}
          onRemoveLabel={onRemoveLabel}
          allLabels={allLabels}
          keyboardShortcuts={keyboardShortcuts}
        />
      </div>
    );
  }

  return (
    <div className="mt-0 relative" style={patternBackground}>
      <EmailList 
        emails={filteredEmails}
        folder={activeTab}
        onSelectEmail={onSelectEmail}
        onStarEmail={onStarEmail}
        onDeleteEmail={onDeleteEmail}
        onArchiveEmail={onArchiveEmail}
        onComposeClick={onComposeClick}
        sortOption={sortOption}
        onSortChange={onSortChange}
      />
    </div>
  );
};

export default EmailContent;
