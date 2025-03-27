
import { useState, useEffect } from "react";
import type { Email } from "@/types/email";
import { useEmailSelection } from "@/hooks/useEmailSelection";
import { useEmailLabels } from "@/hooks/useEmailLabels";
import { useEmailStatus } from "@/hooks/useEmailStatus";
import { useEmailFolders } from "@/hooks/useEmailFolders";
import { useEmailDraftManager } from "@/hooks/useEmailDraftManager";
import { useEmailSend } from "@/hooks/useEmailSend";
import { useEmailContext } from "@/context/EmailContext";

export function useEmailManager(activeFolder: string) {
  const { emails: contextEmails, loading, error } = useEmailContext();
  
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
  } = useEmailSelection(contextEmails);
  
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
      const updatedEmails = markEmailAsRead(contextEmails, email.id);
      // In a real application, we would update the emails state here
    }
    setSelectedEmail(email);
  };

  const handleStarEmail = (id: string) => {
    const updatedEmails = starEmail(contextEmails, id);
    // In a real application, we would update the emails state here
    console.log("Starred email:", id);
  };

  const handleDeleteEmail = (id: string) => {
    const { emails: updatedEmails, shouldDeselectEmail } = deleteEmail(contextEmails, id, selectedEmail?.id);
    // In a real application, we would update the emails state here
    if (shouldDeselectEmail) {
      setSelectedEmail(null);
    }
  };

  const handleArchiveEmail = (id: string) => {
    const { emails: updatedEmails, shouldDeselectEmail } = archiveEmail(contextEmails, id, selectedEmail?.id);
    // In a real application, we would update the emails state here
    if (shouldDeselectEmail) {
      setSelectedEmail(null);
    }
  };

  const handleAddLabel = (id: string, label: string) => {
    const updatedEmails = addLabel(contextEmails, id, label);
    // In a real application, we would update the emails state here
  };

  const handleRemoveLabel = (id: string, label: string) => {
    const updatedEmails = removeLabel(contextEmails, id, label);
    // In a real application, we would update the emails state here
  };

  const handleMarkAsUnread = (id: string) => {
    const updatedEmails = markEmailAsUnread(contextEmails, id);
    // In a real application, we would update the emails state here
  };

  const handleMarkAllAsRead = () => {
    const updatedEmails = markAllAsRead(contextEmails);
    // In a real application, we would update the emails state here
  };

  const handleSendEmail = (data: any) => {
    const updatedEmails = sendEmail(contextEmails, data);
    // In a real application, we would update the emails state here
    return true;
  };

  return {
    emails: contextEmails,
    loading,
    error,
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
    handleSelectAll,
    handleClearSelection,
    toggleBulkMode,
    handleBulkAction,
    isAllSelected,
    isIndeterminate
  };
}
