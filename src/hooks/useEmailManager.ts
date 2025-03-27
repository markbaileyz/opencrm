
import { useState } from "react";
import type { Email } from "@/types/email";
import { useEmailSelection } from "@/hooks/useEmailSelection";
import { useEmailLabels } from "@/hooks/useEmailLabels";
import { useEmailStatus } from "@/hooks/useEmailStatus";
import { useEmailFolders } from "@/hooks/useEmailFolders";
import { useEmailDraftManager } from "@/hooks/useEmailDraftManager";
import { useEmailSend } from "@/hooks/useEmailSend";

export function useEmailManager(initialEmails: Email[]) {
  const { 
    emails, 
    setEmails, 
    handleEditDraft, 
    refreshDrafts 
  } = useEmailDraftManager(initialEmails);
  
  const { 
    selectedEmail, 
    setSelectedEmail, 
    handleSelectEmail, 
    handleBackToList,
    selectedEmails,
    isBulkMode,
    handleSelectAll,
    handleClearSelection,
    toggleBulkMode,
    handleBulkAction,
    isAllSelected,
    isIndeterminate
  } = useEmailSelection(emails);
  
  const { 
    handleAddLabel: addLabel, 
    handleRemoveLabel: removeLabel 
  } = useEmailLabels();
  
  const { 
    handleStarEmail: starEmail, 
    markEmailAsRead,
    markEmailAsUnread,
    markAllAsRead
  } = useEmailStatus();
  
  const { 
    handleDeleteEmail: deleteEmail, 
    handleArchiveEmail: archiveEmail 
  } = useEmailFolders();
  
  const { 
    handleSendEmail: sendEmail 
  } = useEmailSend();

  // Wrapper functions to manage state
  const handleSelectEmailWrapper = (email: Email) => {
    const updatedEmail = handleSelectEmail(email);
    if (!email.read) {
      const updatedEmails = markEmailAsRead(emails, email.id);
      setEmails(updatedEmails);
    }
    setSelectedEmail(email);
  };

  const handleStarEmail = (id: string) => {
    const updatedEmails = starEmail(emails, id);
    setEmails(updatedEmails);
  };

  const handleDeleteEmail = (id: string) => {
    const { emails: updatedEmails, shouldDeselectEmail } = deleteEmail(emails, id, selectedEmail?.id);
    setEmails(updatedEmails);
    if (shouldDeselectEmail) {
      setSelectedEmail(null);
    }
  };

  const handleArchiveEmail = (id: string) => {
    const { emails: updatedEmails, shouldDeselectEmail } = archiveEmail(emails, id, selectedEmail?.id);
    setEmails(updatedEmails);
    if (shouldDeselectEmail) {
      setSelectedEmail(null);
    }
  };

  const handleAddLabel = (id: string, label: string) => {
    const updatedEmails = addLabel(emails, id, label);
    setEmails(updatedEmails);
  };

  const handleRemoveLabel = (id: string, label: string) => {
    const updatedEmails = removeLabel(emails, id, label);
    setEmails(updatedEmails);
  };

  const handleMarkAsUnread = (id: string) => {
    const updatedEmails = markEmailAsUnread(emails, id);
    setEmails(updatedEmails);
  };

  const handleMarkAllAsRead = () => {
    const updatedEmails = markAllAsRead(emails);
    setEmails(updatedEmails);
  };

  const handleSendEmail = (data: any) => {
    const updatedEmails = sendEmail(emails, data);
    setEmails(updatedEmails);
    return true;
  };

  return {
    emails,
    selectedEmail,
    selectedEmails,
    isBulkMode,
    handleSelectEmail: handleSelectEmailWrapper,
    handleBackToList,
    handleStarEmail,
    handleDeleteEmail,
    handleArchiveEmail,
    handleSendEmail,
    handleAddLabel,
    handleRemoveLabel,
    handleMarkAsUnread,
    handleMarkAllAsRead,
    handleEditDraft,
    refreshDrafts,
    handleSelectAll,
    handleClearSelection,
    toggleBulkMode,
    handleBulkAction,
    isAllSelected,
    isIndeterminate
  };
}
