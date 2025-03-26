
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pageNumbers = [] as number[];
  const maxVisiblePages = 5;
  
  if (totalPages <= maxVisiblePages) {
    // Show all page numbers
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    // Show a subset of page numbers with ellipsis
    if (currentPage <= 3) {
      // Near start
      for (let i = 1; i <= 4; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push(-1); // Ellipsis
      pageNumbers.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      // Near end
      pageNumbers.push(1);
      pageNumbers.push(-1); // Ellipsis
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Middle
      pageNumbers.push(1);
      pageNumbers.push(-1); // Ellipsis
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push(-1); // Ellipsis
      pageNumbers.push(totalPages);
    }
  }

  return (
    <div className="flex justify-between items-center mt-4 text-sm">
      <div className="text-muted-foreground">
        Showing {Math.min((currentPage - 1) * emailsPerPage + 1, totalEmails)} - {Math.min(currentPage * emailsPerPage, totalEmails)} of {totalEmails}
      </div>
      
      <div className="flex items-center space-x-1">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        {pageNumbers.map((page, index) => (
          page === -1 ? (
            <span key={`ellipsis-${index}`} className="px-2">...</span>
          ) : (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
              className="h-8 w-8"
            >
              {page}
            </Button>
          )
        ))}
        
        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="h-8 w-8"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default EmailPagination;
