
import { useState, useEffect } from "react";
import type { Email } from "@/types/email";
import { useEmailActions } from "@/hooks/useEmailActions";

export function useEmailDraftManager(initialEmails: Email[]) {
  const [emails, setEmails] = useState<Email[]>(initialEmails);
  const { getDrafts } = useEmailActions();

  // Sync drafts with the email list
  const syncDraftsWithEmails = () => {
    const localDrafts = getDrafts();
    
    if (localDrafts.length === 0) return;
    
    // Convert drafts to Email objects
    const draftEmails = localDrafts.map((draft: any) => ({
      id: draft.id,
      senderName: "You",
      senderEmail: "you@example.com",
      recipient: draft.to || "No recipient",
      subject: draft.subject || "No subject",
      preview: (draft.message || "").substring(0, 50),
      body: draft.message || "",
      date: draft.lastSaved,
      read: true,
      starred: false,
      folder: 'drafts' as const,
      hasAttachments: false,
      labels: []
    }));
    
    // Remove any existing drafts from email list
    const nonDraftEmails = emails.filter(email => email.folder !== 'drafts');
    
    // Combine non-drafts with the draft emails
    setEmails([...nonDraftEmails, ...draftEmails]);
  };

  // Load drafts from localStorage on mount
  useEffect(() => {
    syncDraftsWithEmails();
  }, []);

  const handleEditDraft = (draftId: string) => {
    const draft = emails.find(email => email.id === draftId);
    return draft || null;
  };

  const refreshDrafts = () => {
    syncDraftsWithEmails();
  };

  return {
    emails,
    setEmails,
    handleEditDraft,
    refreshDrafts,
    syncDraftsWithEmails
  };
}
