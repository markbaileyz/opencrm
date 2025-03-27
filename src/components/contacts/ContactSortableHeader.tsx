
import React from 'react';
import { ArrowUp, ArrowDown } from "lucide-react";

type SortField = 'name' | 'lastContact' | 'priority' | 'status';
type SortDirection = 'asc' | 'desc';

interface ContactSortableHeaderProps {
  sortField: SortField;
  sortDirection: SortDirection;
  handleSort: (field: SortField) => void;
}

const ContactSortableHeader = ({
  sortField,
  sortDirection,
  handleSort
}: ContactSortableHeaderProps) => {
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ArrowUp className="h-3 w-3 ml-1" /> : 
      <ArrowDown className="h-3 w-3 ml-1" />;
  };

  return (
    <div className="flex justify-between border-b bg-muted/50 p-2 text-xs font-medium">
      <button 
        className="flex items-center hover:text-primary" 
        onClick={() => handleSort('name')}
        aria-label="Sort by name"
      >
        Name {getSortIcon('name')}
      </button>
      <div className="flex space-x-2">
        <button 
          className="flex items-center hover:text-primary" 
          onClick={() => handleSort('status')}
          aria-label="Sort by status"
        >
          Status {getSortIcon('status')}
        </button>
        <button 
          className="flex items-center hover:text-primary" 
          onClick={() => handleSort('priority')}
          aria-label="Sort by priority"
        >
          Priority {getSortIcon('priority')}
        </button>
        <button 
          className="flex items-center hover:text-primary" 
          onClick={() => handleSort('lastContact')}
          aria-label="Sort by last contact"
        >
          Last Contact {getSortIcon('lastContact')}
        </button>
      </div>
    </div>
  );
};

export default ContactSortableHeader;
