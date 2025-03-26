
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface EmailPaginationProps {
  currentPage: number;
  totalEmails: number;
  emailsPerPage: number;
  onPageChange: (page: number) => void;
}

const EmailPagination: React.FC<EmailPaginationProps> = ({
  currentPage,
  totalEmails,
  emailsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalEmails / emailsPerPage);
  
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pageNumbers = [] as (number | "ellipsis")[];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all page numbers
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);
      
      // Dynamic middle pages
      if (currentPage <= 3) {
        // Near start
        pageNumbers.push(2, 3);
        pageNumbers.push("ellipsis");
      } else if (currentPage >= totalPages - 2) {
        // Near end
        pageNumbers.push("ellipsis");
        pageNumbers.push(totalPages - 2, totalPages - 1);
      } else {
        // Middle
        pageNumbers.push("ellipsis");
        pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
        pageNumbers.push("ellipsis");
      }
      
      // Always show last page
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  // Calculate the range of emails being displayed
  const startEmail = Math.min((currentPage - 1) * emailsPerPage + 1, totalEmails);
  const endEmail = Math.min(currentPage * emailsPerPage, totalEmails);
  
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, newPage: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onPageChange(newPage);
    }
  };
  
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full">
      <div className="text-sm text-muted-foreground">
        Showing <span className="font-medium">{startEmail}</span> to{" "}
        <span className="font-medium">{endEmail}</span> of{" "}
        <span className="font-medium">{totalEmails}</span> emails
      </div>
      
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={goToPreviousPage}
              onKeyDown={(e) => handleKeyDown(e, currentPage - 1)}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              aria-disabled={currentPage === 1}
              tabIndex={currentPage === 1 ? -1 : 0}
            />
          </PaginationItem>
          
          {pageNumbers.map((page, index) => (
            <PaginationItem key={`page-${index}`}>
              {page === "ellipsis" ? (
                <span className="px-2 py-2 text-muted-foreground" aria-hidden="true">...</span>
              ) : (
                <PaginationLink
                  isActive={currentPage === page}
                  onClick={() => onPageChange(page as number)}
                  onKeyDown={(e) => handleKeyDown(e, page as number)}
                  className={`cursor-pointer ${
                    currentPage === page ? "bg-primary text-primary-foreground" : ""
                  }`}
                  aria-current={currentPage === page ? "page" : undefined}
                  aria-label={`Page ${page}`}
                  tabIndex={0}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          
          <PaginationItem>
            <PaginationNext
              onClick={goToNextPage}
              onKeyDown={(e) => handleKeyDown(e, currentPage + 1)}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              aria-disabled={currentPage === totalPages}
              tabIndex={currentPage === totalPages ? -1 : 0}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default EmailPagination;
