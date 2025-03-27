
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Paperclip, Send } from "lucide-react";
import { useToast } from "@/components/ui/toast";

interface MobileEmailComposerProps {
  onClose: () => void;
  onSend: () => void;
  replyToEmail?: {
    id: string;
    subject: string;
    from: {
      email: string;
      name: string;
    };
  };
}

const MobileEmailComposer: React.FC<MobileEmailComposerProps> = ({
  onClose,
  onSend,
  replyToEmail
}) => {
  const { toast } = useToast();
  const [to, setTo] = useState(replyToEmail?.from.email || "");
  const [subject, setSubject] = useState(replyToEmail ? `Re: ${replyToEmail.subject}` : "");
  const [content, setContent] = useState("");
  
  const handleSend = () => {
    if (!to) {
      toast({
        title: "Missing recipient",
        description: "Please specify at least one recipient",
        variant: "destructive"
      });
      return;
    }
    
    if (!subject) {
      toast({
        title: "Missing subject",
        description: "Please add a subject to your email",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, we would send the email here
    console.log("Sending email:", { to, subject, content });
    toast({
      title: "Email sent",
      description: "Your email has been sent successfully"
    });
    onSend();
  };
  
  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] h-[80vh] flex flex-col p-0">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle>New Email</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="To"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="border-0 border-b rounded-none focus-visible:ring-0 px-0"
            />
          </div>
          
          <div className="space-y-2">
            <Input
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="border-0 border-b rounded-none focus-visible:ring-0 px-0"
            />
          </div>
          
          <Textarea
            placeholder="Compose your email..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="resize-none flex-1 min-h-[200px] border-0 focus-visible:ring-0 px-0"
          />
        </div>

        <DialogFooter className="border-t p-4">
          <div className="flex justify-between w-full">
            <Button variant="outline" size="icon">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button onClick={handleSend} className="gap-2">
              <Send className="h-4 w-4" />
              Send
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MobileEmailComposer;
