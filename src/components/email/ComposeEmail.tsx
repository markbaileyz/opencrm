
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import EmailRecipientFields from "./EmailRecipientFields";
import EmailComposeActions from "./EmailComposeActions";
import EmailAttachments from "./EmailAttachments";
import EmailTemplateSelector from "./EmailTemplateSelector";
import EmailSignatureManager from "./EmailSignatureManager";
import { EmailTemplate } from "@/utils/emailTemplates";

export interface ComposeEmailProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: () => void;
  replyToEmail?: any;
  draft?: any;
  contactId?: string;
}

const ComposeEmail: React.FC<ComposeEmailProps> = ({
  isOpen,
  onClose,
  onSend,
  replyToEmail,
  draft,
  contactId
}) => {
  const [to, setTo] = useState(replyToEmail?.sender || draft?.to || "");
  const [cc, setCc] = useState(draft?.cc || "");
  const [bcc, setBcc] = useState(draft?.bcc || "");
  const [subject, setSubject] = useState(
    replyToEmail ? `Re: ${replyToEmail.subject}` : draft?.subject || ""
  );
  const [message, setMessage] = useState(draft?.message || "");
  const [showCc, setShowCc] = useState(!!cc);
  const [showBcc, setShowBcc] = useState(!!bcc);
  const [attachments, setAttachments] = useState<File[]>([]);
  
  const handleSend = () => {
    // Here we would normally validate and send the email
    onSend();
  };
  
  const handleDraft = () => {
    // Save as draft logic here
    onClose();
  };
  
  const handleAttachmentAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };
  
  const handleAttachmentRemove = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSelectTemplate = (template: EmailTemplate) => {
    setSubject(template.subject);
    setMessage(template.body);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {replyToEmail ? "Reply to Email" : "New Message"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto py-4">
          <div className="space-y-4">
            <EmailRecipientFields 
              to={to}
              cc={cc}
              bcc={bcc}
              setTo={setTo}
              setCc={setCc}
              setBcc={setBcc}
            />
            
            <div>
              <Input
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            
            <EmailTemplateSelector onSelectTemplate={handleSelectTemplate} />
            
            <div className="flex-1">
              <Textarea
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[300px] resize-none"
              />
            </div>
            
            <EmailAttachments 
              attachments={attachments}
              onAttachmentAdd={handleAttachmentAdd}
              onAttachmentRemove={handleAttachmentRemove}
            />
            
            <EmailSignatureManager />
          </div>
        </div>
        
        <DialogFooter className="border-t pt-4">
          <EmailComposeActions 
            onSend={handleSend}
            onDraft={handleDraft}
            onDiscard={onClose}
            isSending={false}
            isValid={to.trim().length > 0 && subject.trim().length > 0}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ComposeEmail;
