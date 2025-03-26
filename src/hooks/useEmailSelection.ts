
import { useState } from "react";

interface EmailSelectionHook {
  selectedEmails: string[];
  isBulkMode: boolean;
  handleSelectEmail: (id: string) => void;
  handleSelectAll: () => void;
  handleClearSelection: () => void;
  toggleBulkMode: () => void;
  handleBulkAction: (ids: string[], action: (id: string) => void, callback?: () => void) => void;
}

export function useEmailSelection(emails: { id: string }[]): EmailSelectionHook {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
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
    if (action) {
      ids.forEach(id => action(id));
    }
    if (callback) {
      callback();
    }
  };
  
  return {
    selectedEmails,
    isBulkMode,
    handleSelectEmail,
    handleSelectAll,
    handleClearSelection,
    toggleBulkMode,
    handleBulkAction
  };
}
