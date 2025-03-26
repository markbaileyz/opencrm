
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, X, Paperclip, Save } from "lucide-react";
import { useEmailActions } from "@/hooks/useEmailActions";

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
  
  const { saveDraft, getDraft, deleteDraft } = useEmailActions();
  
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
        }
      }
    }
  }, [isOpen, draftId]);
  
  // Auto-save draft every 30 seconds
  useEffect(() => {
    if (!isOpen) return;
    
    const autoSaveInterval = setInterval(() => {
      if (to || subject || message) {
        handleSaveDraft();
      }
    }, 30000);
    
    return () => clearInterval(autoSaveInterval);
  }, [isOpen, to, subject, message]);
  
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
            <div className="grid gap-2">
              <Label htmlFor="to">To</Label>
              <Input
                id="to"
                placeholder="recipient@example.com"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cc">Cc</Label>
              <Input
                id="cc"
                placeholder="cc@example.com"
                value={cc}
                onChange={(e) => setCc(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bcc">Bcc</Label>
              <Input
                id="bcc"
                placeholder="bcc@example.com"
                value={bcc}
                onChange={(e) => setBcc(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Email subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Write your message here..."
                className="min-h-[200px] resize-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            
            {attachments.length > 0 && (
              <div className="border rounded-md p-2">
                <Label>Attachments</Label>
                <div className="mt-2 space-y-2">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-muted/50 rounded p-2">
                      <span className="text-sm truncate max-w-[300px]">{file.name}</span>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeAttachment(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter className="flex-shrink-0">
            <div className="flex items-center gap-2">
              <label htmlFor="file-upload" className="cursor-pointer">
                <Button type="button" variant="outline" size="icon" className="cursor-pointer">
                  <Paperclip className="h-4 w-4" />
                </Button>
              </label>
              <input
                id="file-upload"
                type="file"
                multiple
                className="hidden"
                onChange={handleAttachment}
              />
              
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleSaveDraft}
                className="gap-1"
              >
                <Save className="h-4 w-4" />
                Save Draft
              </Button>
              
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              
              <Button 
                type="submit" 
                disabled={isSending || !to || !subject || !message}
                className="gap-1"
              >
                {isSending ? "Sending..." : (
                  <>
                    <Send className="h-4 w-4" />
                    Send
                  </>
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ComposeEmail;
