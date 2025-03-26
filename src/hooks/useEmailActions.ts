
import { useState, useEffect, useRef } from "react";
import type { Email } from "@/types/email";
import { useToast } from "@/hooks/use-toast";

export function useEmailActions() {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSavedDraft, setLastSavedDraft] = useState<string | null>(null);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [draftSaveCount, setDraftSaveCount] = useState(0);

  // Auto-save interval reference
  const autoSaveIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up auto-save on unmount
  useEffect(() => {
    return () => {
      if (autoSaveIntervalRef.current) {
        clearInterval(autoSaveIntervalRef.current);
      }
    };
  }, []);

  const handleReplyEmail = (email: Email, setIsComposeOpen: (value: boolean) => void) => {
    // Pre-fill reply data
    const replyData = {
      to: email.senderEmail,
      subject: `Re: ${email.subject}`,
      message: `\n\n\n-------- Original Message --------\nFrom: ${email.senderName} <${email.senderEmail}>\nDate: ${new Date(email.date).toLocaleString()}\nSubject: ${email.subject}\n\n${email.body}`,
      isReply: true,
      originalEmail: email
    };
    
    // Store in sessionStorage to persist during compose modal opening
    sessionStorage.setItem('emailCompose', JSON.stringify(replyData));
    setIsComposeOpen(true);
    
    toast({
      title: "Reply started",
      description: `Replying to: ${email.senderName}`,
      variant: "default",
    });
  };

  const handleForwardEmail = (email: Email, setIsComposeOpen: (value: boolean) => void) => {
    // Pre-fill forward data
    const forwardData = {
      to: '',
      subject: `Fwd: ${email.subject}`,
      message: `\n\n\n-------- Forwarded Message --------\nFrom: ${email.senderName} <${email.senderEmail}>\nDate: ${new Date(email.date).toLocaleString()}\nSubject: ${email.subject}\n\n${email.body}`,
      isForward: true,
      originalEmail: email
    };
    
    // Store in sessionStorage to persist during compose modal opening
    sessionStorage.setItem('emailCompose', JSON.stringify(forwardData));
    setIsComposeOpen(true);
    
    toast({
      title: "Forward started",
      description: `Forwarding email from: ${email.senderName}`,
      variant: "default",
    });
  };

  const saveDraft = (draftData: any) => {
    // Store draft in localStorage to persist between sessions
    const drafts = JSON.parse(localStorage.getItem('emailDrafts') || '[]');
    
    // Check if we're updating an existing draft
    const draftId = draftData.id || `draft-${Date.now()}`;
    const existingDraftIndex = drafts.findIndex((draft: any) => draft.id === draftId);
    
    const updatedDraft = {
      ...draftData,
      id: draftId,
      lastSaved: new Date().toISOString()
    };
    
    if (existingDraftIndex !== -1) {
      // Update existing draft
      drafts[existingDraftIndex] = updatedDraft;
    } else {
      // Add new draft
      drafts.push(updatedDraft);
    }
    
    localStorage.setItem('emailDrafts', JSON.stringify(drafts));
    setLastSavedDraft(draftId);
    setDraftSaveCount(prev => prev + 1);
    
    // Only show toast if not auto-saving or if it's the first auto-save
    if (!isAutoSaving || draftSaveCount === 0) {
      toast({
        title: "Draft saved",
        description: "Your email draft has been saved",
        variant: "default",
      });
    }
    
    return draftId;
  };

  const getDrafts = () => {
    return JSON.parse(localStorage.getItem('emailDrafts') || '[]');
  };

  const getDraft = (id: string) => {
    const drafts = getDrafts();
    return drafts.find((draft: any) => draft.id === id);
  };

  const deleteDraft = (id: string) => {
    const drafts = getDrafts();
    const updatedDrafts = drafts.filter((draft: any) => draft.id !== id);
    localStorage.setItem('emailDrafts', JSON.stringify(updatedDrafts));
    
    if (lastSavedDraft === id) {
      setLastSavedDraft(null);
    }
    
    toast({
      title: "Draft deleted",
      description: "Your email draft has been deleted",
      variant: "default",
    });
  };

  const refreshEmails = () => {
    setIsRefreshing(true);
    
    toast({
      title: "Refreshing emails",
      description: "Checking for new emails...",
      variant: "default",
    });
    
    // In a real application, this would fetch new emails from the server
    // For now, we'll simulate a network request with a timeout
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        toast({
          title: "Emails refreshed",
          description: "Your inbox is up to date",
          variant: "success",
        });
        setIsRefreshing(false);
        resolve();
      }, 1500);
    });
  };

  const stopAutoSave = () => {
    if (autoSaveIntervalRef.current) {
      clearInterval(autoSaveIntervalRef.current);
      autoSaveIntervalRef.current = null;
      setIsAutoSaving(false);
      setDraftSaveCount(0);
    }
  };

  const autoSaveDraft = (draftData: any, intervalMs = 30000) => {
    // Clear any existing interval
    stopAutoSave();
    
    if (!draftData || Object.keys(draftData).length === 0) {
      return;
    }
    
    // Save immediately
    saveDraft(draftData);
    setIsAutoSaving(true);
    
    // Setup auto-save at specified interval
    const intervalId = setInterval(() => {
      if (draftData && Object.keys(draftData).length > 0) {
        saveDraft(draftData);
      }
    }, intervalMs);
    
    autoSaveIntervalRef.current = intervalId;
    
    // Return function to clear the interval
    return stopAutoSave;
  };
  
  return {
    handleReplyEmail,
    handleForwardEmail,
    saveDraft,
    getDrafts,
    getDraft,
    deleteDraft,
    refreshEmails,
    autoSaveDraft,
    stopAutoSave,
    isRefreshing,
    isAutoSaving,
    lastSavedDraft,
    draftSaveCount
  };
}
