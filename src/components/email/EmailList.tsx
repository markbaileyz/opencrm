
import React, { useState, useEffect } from "react";
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
  const emailsPerPage = 15; // Display 15 emails per page

  // Reset to page 1 when email list changes (e.g., due to filtering or sorting)
  useEffect(() => {
    setCurrentPage(1);
  }, [emails.length, folder, sortOption]);

  // Handle keyboard shortcuts for pagination
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input fields
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Page navigation
      if (e.key === '[' || e.key === ',') {
        // Previous page
        if (currentPage > 1) {
          setCurrentPage(prev => prev - 1);
          scrollToTop();
        }
        e.preventDefault();
      } else if (e.key === ']' || e.key === '.') {
        // Next page
        if (currentPage < Math.ceil(emails.length / emailsPerPage)) {
          setCurrentPage(prev => prev + 1);
          scrollToTop();
        }
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, emails.length, emailsPerPage]);

  const {
    selectedEmails,
    isBulkMode,
    handleSelectEmail: handleSelect,
    handleSelectAll,
    handleClearSelection,
    toggleBulkMode,
    handleBulkAction,
    isAllSelected,
    isIndeterminate
  } = useEmailSelection(emails);
  
  const handleRowClick = (email: Email) => {
    if (isBulkMode) {
      handleSelect(email.id);
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
    scrollToTop();
  };

  const scrollToTop = () => {
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
      
      <div role="region" aria-label={`${folder} emails, page ${currentPage}`}>
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
                onSelect={handleSelect}
                onStarClick={handleStarClick}
                onClick={handleRowClick}
                onMouseEnter={() => setHoveredEmail(email.id)}
                onMouseLeave={() => setHoveredEmail(null)}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      
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
