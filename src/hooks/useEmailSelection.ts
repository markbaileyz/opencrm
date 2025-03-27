
import { useState } from "react";
import type { Email } from "@/types/email";

export function useEmailSelection(emails: Email[] = []) {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [isBulkMode, setIsBulkMode] = useState(false);

  const handleSelectEmail = (emailOrId: Email | string) => {
    if (typeof emailOrId === 'string') {
      // Toggle selection of email by ID
      setSelectedEmails(prev => 
        prev.includes(emailOrId) 
          ? prev.filter(id => id !== emailOrId)
          : [...prev, emailOrId]
      );
      return emailOrId;
    } else {
      // Single email selection
      const email = emailOrId;
      // Mark email as read if it wasn't
      if (!email.read) {
        return { ...email, read: true };
      }
      setSelectedEmail(email);
      return email;
    }
  };

  const handleBackToList = () => {
    setSelectedEmail(null);
  };

  const handleSelectAll = () => {
    if (isAllSelected || isIndeterminate) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(emails.map(email => email.id));
    }
  };

  const handleClearSelection = () => {
    setSelectedEmails([]);
    if (isBulkMode) {
      setIsBulkMode(false);
    }
  };

  const toggleBulkMode = () => {
    setIsBulkMode(prev => !prev);
    if (!isBulkMode) {
      setSelectedEmails([]);
    }
  };

  const handleBulkAction = (ids: string[], action: (id: string) => void, callback?: () => void) => {
    ids.forEach(id => action(id));
    if (callback) {
      callback();
    }
  };

  const isAllSelected = emails.length > 0 && selectedEmails.length === emails.length;
  const isIndeterminate = selectedEmails.length > 0 && selectedEmails.length < emails.length;

  return {
    selectedEmail,
    setSelectedEmail,
    selectedEmails,
    isBulkMode,
    handleSelectEmail,
    handleBackToList,
    handleSelectAll,
    handleClearSelection,
    toggleBulkMode,
    handleBulkAction,
    isAllSelected,
    isIndeterminate
  };
}
