
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

export function useEmailDrafts() {
  const { toast } = useToast();
  const [lastSavedDraft, setLastSavedDraft] = useState<string | null>(null);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [draftSaveCount, setDraftSaveCount] = useState(0);

  // Auto-save interval reference
  const autoSaveIntervalRef = useRef<NodeJS.Timeout | null>(null);

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
    saveDraft,
    getDrafts,
    getDraft,
    deleteDraft,
    autoSaveDraft,
    stopAutoSave,
    isAutoSaving,
    lastSavedDraft,
    draftSaveCount
  };
}
