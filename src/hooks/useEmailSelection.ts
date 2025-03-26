
import { useState } from "react";

interface EmailSelectionHook {
  selectedEmails: string[];
  isBulkMode: boolean;
  handleSelectEmail: (id: string) => void;
  handleSelectAll: () => void;
  handleClearSelection: () => void;
  toggleBulkMode: () => void;
  handleBulkAction: (ids: string[], action: (id: string) => void, callback?: () => void) => void;
  isAllSelected: boolean;
  isIndeterminate: boolean;
}

export function useEmailSelection(emails: { id: string }[]): EmailSelectionHook {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [isBulkMode, setIsBulkMode] = useState(false);
  
  const isAllSelected = emails.length > 0 && selectedEmails.length === emails.length;
  const isIndeterminate = selectedEmails.length > 0 && selectedEmails.length < emails.length;
  
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

  const handleBulkAction = (ids: string[], action: (id: string) => void, callback?: () => void) => {
    if (ids.length === 0) return;
    
    // Apply the action to each selected email ID
    ids.forEach(id => {
      if (action) {
        action(id);
      }
    });
    
    // Execute callback function if provided
    if (callback) {
      callback();
    }
    
    // Clear selection after bulk action is complete
    handleClearSelection();
  };
  
  return {
    selectedEmails,
    isBulkMode,
    handleSelectEmail,
    handleSelectAll,
    handleClearSelection,
    toggleBulkMode,
    handleBulkAction,
    isAllSelected,
    isIndeterminate
  };
}
