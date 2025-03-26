
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
import EmailPagination from "./EmailPagination";
import { useEmailSelection } from "@/hooks/useEmailSelection";

interface EmailListProps {
  emails: Email[];
  folder: string;
  onSelectEmail: (email: Email) => void;
  onStarEmail?: (id: string) => void;
  onDeleteEmail?: (id: string) => void;
  onArchiveEmail?: (id: string) => void;
  onComposeClick?: () => void;
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
  onComposeClick,
  sortOption = "newest",
  onSortChange,
}: EmailListProps) => {
  const [hoveredEmail, setHoveredEmail] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const emailsPerPage = 15; // Increased from 10 to display more emails

  const {
    selectedEmails,
    isBulkMode,
    handleSelectEmail,
    handleSelectAll,
    handleClearSelection,
    toggleBulkMode,
    handleBulkAction,
    isAllSelected,
    isIndeterminate
  } = useEmailSelection(emails);
  
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Reset selection when changing pages
    handleClearSelection();
    // Scroll to top of list when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate paginated emails
  const indexOfLastEmail = currentPage * emailsPerPage;
  const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
  const currentEmails = emails.slice(indexOfFirstEmail, indexOfLastEmail);

  if (emails.length === 0) {
    return <EmailListEmpty folder={folder} onComposeClick={onComposeClick} />;
  }
  
  return (
    <div className="bg-card rounded-md border shadow-sm">
      <EmailListHeader
        selectedEmails={selectedEmails}
        emails={currentEmails}
        onSelectAll={handleSelectAll}
        onArchiveSelected={onArchiveEmail ? 
          (ids) => handleBulkAction(ids, onArchiveEmail, handleClearSelection) : 
          undefined}
        onDeleteSelected={onDeleteEmail ? 
          (ids) => handleBulkAction(ids, onDeleteEmail, handleClearSelection) : 
          undefined}
        onStarSelected={onStarEmail ? 
          (ids) => handleBulkAction(ids, onStarEmail, handleClearSelection) : 
          undefined}
        onClearSelection={handleClearSelection}
        toggleBulkMode={toggleBulkMode}
        isBulkMode={isBulkMode}
        sortOption={sortOption}
        onSortChange={onSortChange}
        isAllSelected={isAllSelected}
        isIndeterminate={isIndeterminate}
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
          {currentEmails.map((email) => (
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
      
      <div className="p-4 border-t border-border">
        <EmailPagination
          currentPage={currentPage}
          totalEmails={emails.length}
          emailsPerPage={emailsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default EmailList;
