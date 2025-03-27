
import { useEffect } from "react";
import type { Email } from "@/types/email";
import { useEmailReplyForward } from "@/hooks/useEmailReplyForward";
import { useEmailDrafts } from "@/hooks/useEmailDrafts";
import { useEmailRefresh } from "@/hooks/useEmailRefresh";
import { useEmailSignatureActions } from "@/hooks/useEmailSignatureActions";

export function useEmailActions() {
  const { handleReplyEmail, handleForwardEmail } = useEmailReplyForward();
  const { 
    saveDraft, 
    getDrafts, 
    getDraft, 
    deleteDraft, 
    autoSaveDraft, 
    stopAutoSave,
    isAutoSaving,
    lastSavedDraft,
    draftSaveCount
  } = useEmailDrafts();
  const { refreshEmails, isRefreshing } = useEmailRefresh();
  const { appendSignature } = useEmailSignatureActions();

  // Clean up auto-save on unmount
  useEffect(() => {
    return () => {
      stopAutoSave();
    };
  }, []);

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
    appendSignature,
    isRefreshing,
    isAutoSaving,
    lastSavedDraft,
    draftSaveCount
  };
}
