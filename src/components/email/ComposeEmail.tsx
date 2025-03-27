
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEmailActions } from "@/hooks/useEmailActions";
import { useEmailSignature } from "@/hooks/useEmailSignature";
import EmailRecipientFields from "./EmailRecipientFields";
import EmailContentFields from "./EmailContentFields";
import EmailAttachments from "./EmailAttachments";
import EmailComposeActions from "./EmailComposeActions";

interface ComposeEmailProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (data: any) => void;
  draftId?: string;
}

const ComposeEmail = ({ isOpen, onClose, onSend, draftId }: ComposeEmailProps) => {
  const [to, setTo] = useState("");
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [currentDraftId, setCurrentDraftId] = useState<string | undefined>(draftId);
  const [isReply, setIsReply] = useState(false);
  const [isForward, setIsForward] = useState(false);
  
  const { saveDraft, getDraft, deleteDraft, autoSaveDraft, stopAutoSave, appendSignature } = useEmailActions();
  const { getDefaultSignature } = useEmailSignature();
  
  // Load draft if provided
  useEffect(() => {
    if (isOpen) {
      if (draftId) {
        const draft = getDraft(draftId);
        if (draft) {
          setTo(draft.to || "");
          setCc(draft.cc || "");
          setBcc(draft.bcc || "");
          setSubject(draft.subject || "");
          setMessage(draft.message || "");
          setCurrentDraftId(draftId);
        }
      } else {
        // Check if there's a reply/forward in session storage
        const storedEmail = sessionStorage.getItem('emailCompose');
        if (storedEmail) {
          const emailData = JSON.parse(storedEmail);
          setTo(emailData.to || "");
          setSubject(emailData.subject || "");
          setMessage(emailData.message || "");
          setIsReply(!!emailData.isReply);
          setIsForward(!!emailData.isForward);
          
          // Clear the storage after loading
          sessionStorage.removeItem('emailCompose');
        } else {
          // For new messages, append default signature if no draft is loaded
          const defaultSignature = getDefaultSignature();
          if (defaultSignature) {
            setMessage(appendSignature("", defaultSignature));
          }
        }
      }
    }
  }, [isOpen, draftId]);
  
  // Auto-save draft using the useEmailActions hook
  useEffect(() => {
    if (!isOpen) return;
    
    // Create draft data object
    const draftData = {
      id: currentDraftId,
      to,
      cc,
      bcc,
      subject,
      message
    };
    
    // Start auto-save (returns function to stop auto-save)
    const stopAutoSaveFunc = autoSaveDraft(draftData);
    
    // Cleanup on unmount or when component changes
    return () => {
      if (stopAutoSaveFunc) {
        stopAutoSaveFunc();
      }
    };
  }, [isOpen, to, cc, bcc, subject, message, currentDraftId]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!to || !subject || !message) return;
    
    setIsSending(true);
    
    // Simulate sending
    setTimeout(() => {
      const emailData = {
        to,
        cc,
        bcc,
        subject,
        message,
        attachments,
        isReply,
        isForward,
      };
      
      onSend(emailData);
      
      // If this was a draft, delete it
      if (currentDraftId) {
        deleteDraft(currentDraftId);
      }
      
      // Stop auto-saving when sending the email
      stopAutoSave();
      
      resetForm();
      setIsSending(false);
    }, 1000);
  };
  
  const handleAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachments([...attachments, ...newFiles]);
    }
  };
  
  const resetForm = () => {
    setTo("");
    setCc("");
    setBcc("");
    setSubject("");
    setMessage("");
    setAttachments([]);
    setCurrentDraftId(undefined);
    setIsReply(false);
    setIsForward(false);
  };
  
  const handleClose = () => {
    // Automatically save as draft if there's content
    if (to || subject || message) {
      handleSaveDraft();
    }
    
    // Stop auto-saving when closing
    stopAutoSave();
    
    resetForm();
    onClose();
  };
  
  const handleSaveDraft = () => {
    const draftData = {
      id: currentDraftId,
      to,
      cc,
      bcc,
      subject,
      message,
      isReply,
      isForward,
    };
    
    const savedId = saveDraft(draftData);
    setCurrentDraftId(savedId);
  };
  
  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };
  
  const isFormValid = !!to && !!subject && !!message;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {isReply ? "Reply to Email" : isForward ? "Forward Email" : currentDraftId ? "Edit Draft" : "Compose Email"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 flex-1 overflow-y-auto">
          <div className="space-y-4 pr-1">
            <EmailRecipientFields 
              to={to}
              cc={cc}
              bcc={bcc}
              setTo={setTo}
              setCc={setCc}
              setBcc={setBcc}
            />
            
            <EmailContentFields 
              subject={subject}
              message={message}
              setSubject={setSubject}
              setMessage={setMessage}
              appendSignature={appendSignature}
            />
            
            <EmailAttachments 
              attachments={attachments}
              onAttachmentAdd={handleAttachment}
              onAttachmentRemove={removeAttachment}
            />
          </div>
          
          <DialogFooter className="flex-shrink-0">
            <EmailComposeActions 
              onSaveDraft={handleSaveDraft}
              onCancel={handleClose}
              onSubmit={handleSubmit}
              isSending={isSending}
              isValid={isFormValid}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ComposeEmail;
