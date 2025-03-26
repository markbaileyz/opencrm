
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Email } from "@/types/email";
import { SortOption } from "@/utils/emailUtils";
import EmailListHeader from "./EmailListHeader";
import EmailListItem from "./EmailListItem";
import EmailListEmpty from "./EmailListEmpty";

interface EmailListProps {
  emails: Email[];
  folder: string;
  onSelectEmail: (email: Email) => void;
  onStarEmail?: (id: string) => void;
  onDeleteEmail?: (id: string) => void;
  onArchiveEmail?: (id: string) => void;
  sortOption?: SortOption;
  onSortChange?: (option: SortOption) => void;
}

const EmailList = ({ 
  emails, 
  folder, 
  onSelectEmail,
  onStarEmail,
  onDeleteEmail,
  onArchiveEmail,
  sortOption = "newest",
  onSortChange,
}: EmailListProps) => {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [hoveredEmail, setHoveredEmail] = useState<string | null>(null);
  const [isBulkMode, setIsBulkMode] = useState(false);
  
  const handleSelectEmail = (id: string) => {
    if (selectedEmails.includes(id)) {
      setSelectedEmails(selectedEmails.filter(emailId => emailId !== id));
    } else {
      setSelectedEmails([...selectedEmails, id]);
    }
  };
  
  const handleSelectAll = () => {
    if (selectedEmails.length === emails.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(emails.map(email => email.id));
    }
  };
  
  const handleRowClick = (email: Email) => {
    if (isBulkMode) {
      handleSelectEmail(email.id);
    } else {
      onSelectEmail(email);
    }
  };

  const handleStarClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (onStarEmail) {
      onStarEmail(id);
    }
  };

  const handleClearSelection = () => {
    setSelectedEmails([]);
    setIsBulkMode(false);
  };

  const toggleBulkMode = () => {
    setIsBulkMode(!isBulkMode);
    if (!isBulkMode) {
      setSelectedEmails([]);
    }
  };

  const handleArchiveSelected = (ids: string[]) => {
    if (onArchiveEmail) {
      ids.forEach(id => onArchiveEmail(id));
    }
  };

  const handleDeleteSelected = (ids: string[]) => {
    if (onDeleteEmail) {
      ids.forEach(id => onDeleteEmail(id));
    }
  };

  const handleStarSelected = (ids: string[]) => {
    if (onStarEmail) {
      ids.forEach(id => onStarEmail(id));
    }
  };
  
  if (emails.length === 0) {
    return <EmailListEmpty />;
  }
  
  return (
    <div className="bg-card rounded-md border shadow-sm">
      <EmailListHeader
        selectedEmails={selectedEmails}
        emails={emails}
        onSelectAll={handleSelectAll}
        onArchiveSelected={onArchiveEmail ? handleArchiveSelected : undefined}
        onDeleteSelected={onDeleteEmail ? handleDeleteSelected : undefined}
        onStarSelected={onStarEmail ? handleStarSelected : undefined}
        onClearSelection={handleClearSelection}
        toggleBulkMode={toggleBulkMode}
        isBulkMode={isBulkMode}
        sortOption={sortOption}
        onSortChange={onSortChange}
      />
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead className="w-[30px]"></TableHead>
            <TableHead>Sender</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {emails.map((email) => (
            <EmailListItem
              key={email.id}
              email={email}
              isSelected={selectedEmails.includes(email.id)}
              isBulkMode={isBulkMode}
              isHovered={hoveredEmail === email.id}
              onSelect={handleSelectEmail}
              onStarClick={handleStarClick}
              onClick={handleRowClick}
              onMouseEnter={() => setHoveredEmail(email.id)}
              onMouseLeave={() => setHoveredEmail(null)}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmailList;
