
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MessageSquare, FileText } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import EmailTemplateSelector from "./EmailTemplateSelector";
import EmailSignatureManager from "./EmailSignatureManager";
import type { EmailTemplate } from "@/utils/emailTemplates";
import type { EmailSignature } from "@/hooks/useEmailSignature";

interface EmailContentFieldsProps {
  subject: string;
  message: string;
  setSubject: (value: string) => void;
  setMessage: (value: string) => void;
  appendSignature: (message: string, signature?: EmailSignature) => string;
}

const EmailContentFields: React.FC<EmailContentFieldsProps> = ({
  subject,
  message,
  setSubject,
  setMessage,
  appendSignature
}) => {
  const [isSignatureOpen, setIsSignatureOpen] = useState(false);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  
  const handleApplyTemplate = (template: EmailTemplate) => {
    // Only overwrite subject and message if they are empty or user confirms
    const shouldApply = 
      (!subject && !message) || 
      window.confirm("Applying this template will replace your current subject and message. Continue?");
    
    if (shouldApply) {
      setSubject(template.subject);
      setMessage(template.body);
      setIsTemplateOpen(false);
    }
  };
  
  const handleSelectSignature = (signature: EmailSignature) => {
    // Add the signature to the message
    setMessage(appendSignature(message, signature));
    setIsSignatureOpen(false);
  };
  
  return (
    <div className="space-y-4">
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
        <div className="flex justify-between items-center">
          <Label htmlFor="message">Message</Label>
          <div className="flex items-center gap-2">
            <Popover open={isSignatureOpen} onOpenChange={setIsSignatureOpen}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="gap-1"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Signature</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[450px] p-4" align="end">
                <div className="space-y-2">
                  <h4 className="font-medium">Email Signatures</h4>
                  <p className="text-sm text-muted-foreground">
                    Choose a signature to append to your email
                  </p>
                  <EmailSignatureManager 
                    onSelectSignature={handleSelectSignature} 
                  />
                </div>
              </PopoverContent>
            </Popover>
            
            <Popover open={isTemplateOpen} onOpenChange={setIsTemplateOpen}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="gap-1"
                >
                  <FileText className="h-4 w-4" />
                  <span>Templates</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[450px] p-4" align="end">
                <div className="space-y-2">
                  <h4 className="font-medium">Email Templates</h4>
                  <p className="text-sm text-muted-foreground">
                    Choose a template to quickly compose your email
                  </p>
                  <EmailTemplateSelector 
                    onSelectTemplate={handleApplyTemplate} 
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <Textarea
          id="message"
          placeholder="Write your message here..."
          className="min-h-[200px] resize-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
    </div>
  );
};

export default EmailContentFields;
