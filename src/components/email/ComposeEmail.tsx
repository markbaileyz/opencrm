
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
import { EmailRecipientFields } from "./EmailRecipientFields";
import { EmailComposeActions } from "./EmailComposeActions";
import { EmailAttachments } from "./EmailAttachments";
import { EmailTemplateSelector } from "./EmailTemplateSelector";
import { EmailSignatureManager } from "./EmailSignatureManager";

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
  
  const handleSend = () => {
    // Here we would normally validate and send the email
    onSend();
  };
  
  const handleDraft = () => {
    // Save as draft logic here
    onClose();
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
              showCc={showCc}
              showBcc={showBcc}
              setShowCc={setShowCc}
              setShowBcc={setShowBcc}
            />
            
            <div>
              <Input
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            
            <EmailTemplateSelector onSelect={(template) => setMessage(template)} />
            
            <div className="flex-1">
              <Textarea
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[300px] resize-none"
              />
            </div>
            
            <EmailAttachments />
            
            <EmailSignatureManager />
          </div>
        </div>
        
        <DialogFooter className="border-t pt-4">
          <EmailComposeActions 
            onSend={handleSend}
            onDraft={handleDraft}
            onDiscard={onClose}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ComposeEmail;
