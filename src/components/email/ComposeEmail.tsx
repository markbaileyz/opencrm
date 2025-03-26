
import React, { useState } from "react";
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
import { Send, X, Paperclip } from "lucide-react";

interface ComposeEmailProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (data: any) => void;
}

const ComposeEmail = ({ isOpen, onClose, onSend }: ComposeEmailProps) => {
  const [to, setTo] = useState("");
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSending, setIsSending] = useState(false);
  
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
      };
      
      onSend(emailData);
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
  };
  
  const handleClose = () => {
    resetForm();
    onClose();
  };
  
  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Compose Email</DialogTitle>
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
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSending || !to || !subject || !message}>
                {isSending ? "Sending..." : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
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
