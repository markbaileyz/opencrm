
import React from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import EmailSort from "./EmailSort";
import { SortOption } from "@/utils/emailUtils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EmailListHeaderProps {
  selectedEmails: string[];
  emails: { id: string }[];
  onSelectAll: () => void;
  onArchiveSelected?: (ids: string[]) => void;
  onDeleteSelected?: (ids: string[]) => void;
  onStarSelected?: (ids: string[]) => void;
  onClearSelection: () => void;
  toggleBulkMode: () => void;
  isBulkMode: boolean;
  sortOption: SortOption;
  onSortChange?: (option: SortOption) => void;
}

const EmailListHeader: React.FC<EmailListHeaderProps> = ({
  selectedEmails,
  emails,
  onSelectAll,
  onArchiveSelected,
  onDeleteSelected,
  onStarSelected,
  onClearSelection,
  toggleBulkMode,
  isBulkMode,
  sortOption,
  onSortChange,
}) => {
  return (
    <div className="p-2 border-b flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Checkbox 
          checked={emails.length > 0 && selectedEmails.length === emails.length} 
          onCheckedChange={onSelectAll}
          onClick={() => !isBulkMode && toggleBulkMode()}
        />
        {selectedEmails.length > 0 && (
          <div className="flex items-center space-x-1">
            {onArchiveSelected && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  onArchiveSelected(selectedEmails);
                  onClearSelection();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="m21 8-5-5H8L3 8" />
                  <rect width="18" height="12" x="3" y="8" rx="2" />
                  <path d="M9 15h6" />
                </svg>
                <span className="ml-1 hidden sm:inline">Archive</span>
              </Button>
            )}
            {onDeleteSelected && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  onDeleteSelected(selectedEmails);
                  onClearSelection();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
                <span className="ml-1 hidden sm:inline">Delete</span>
              </Button>
            )}
            {onStarSelected && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  onStarSelected(selectedEmails);
                  onClearSelection();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span className="ml-1 hidden sm:inline">Star</span>
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClearSelection}
            >
              <span>Cancel ({selectedEmails.length})</span>
            </Button>
          </div>
        )}
        {selectedEmails.length === 0 && (
          <Button
            variant={isBulkMode ? "secondary" : "ghost"}
            size="sm"
            onClick={toggleBulkMode}
          >
            {isBulkMode ? "Exit selection" : "Select"}
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {onSortChange && (
          <EmailSort 
            value={sortOption} 
            onChange={(value) => onSortChange(value)} 
          />
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={toggleBulkMode}>
              {isBulkMode ? "Exit selection mode" : "Select multiple"}
            </DropdownMenuItem>
            <DropdownMenuItem>Mark all as read</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default EmailListHeader;
