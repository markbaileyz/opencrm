
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
  
  return (
    <div className="flex justify-between items-center mt-4 text-sm">
      <div className="text-muted-foreground">
        Showing {Math.min((currentPage - 1) * emailsPerPage + 1, totalEmails)} - {Math.min(currentPage * emailsPerPage, totalEmails)} of {totalEmails}
      </div>
      
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          
          {pageNumbers.map((page, index) => (
            <PaginationItem key={`page-${index}`}>
              {page === "ellipsis" ? (
                <span className="px-2">...</span>
              ) : (
                <PaginationLink
                  isActive={currentPage === page}
                  onClick={() => onPageChange(page as number)}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          
          <PaginationItem>
            <PaginationNext
              onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default EmailPagination;
