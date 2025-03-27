
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Star, 
  Trash, 
  Archive, 
  Reply, 
  ReplyAll, 
  Forward, 
  MoreVertical,
  Download,
  Send
} from "lucide-react";
import { Email } from "@/types/email";
import { formatDistanceToNow } from "date-fns";
import EmailDetailHeader from "./EmailDetailHeader";
import EmailDetailSender from "./EmailDetailSender";
import EmailDetailBody from "./EmailDetailBody";
import EmailDetailAttachments from "./EmailDetailAttachments";
import { Textarea } from "@/components/ui/textarea";
import { useEmailReplyForward } from "@/hooks/useEmailReplyForward";
import { useEmailSignature } from "@/hooks/useEmailSignature";
import { useToast } from "@/hooks/use-toast";

interface EmailDetailProps {
  email: Email;
  onBackToList: () => void;
  onDelete: () => void;
  onArchive: () => void;
  onStar: () => void;
  onReply?: () => void;
  onReplyAll?: () => void;
  onForward?: () => void;
  onShowImages?: () => void;
}

const EmailDetail: React.FC<EmailDetailProps> = ({
  email,
  onBackToList,
  onDelete,
  onArchive,
  onStar,
  onReply,
  onReplyAll,
  onForward,
  onShowImages
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const { getDefaultSignature } = useEmailSignature();
  const { toast } = useToast();

  const handleStartReply = () => {
    setIsReplying(true);
    
    // Add signature to reply if one exists
    const defaultSignature = getDefaultSignature();
    if (defaultSignature) {
      setReplyMessage(`\n\n${defaultSignature.content}`);
    }
  };

  const handleSendReply = () => {
    // In a real app, we would send the email here
    toast({
      title: "Reply sent",
      description: "Your reply has been sent successfully.",
      variant: "success",
    });
    
    setIsReplying(false);
    setReplyMessage("");
    
    // Call the onReply prop if provided
    if (onReply) {
      onReply();
    }
  };

  const handleCancelReply = () => {
    setIsReplying(false);
    setReplyMessage("");
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={onBackToList}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <div className="ml-2 flex items-center space-x-1">
          <Button variant="ghost" size="icon" onClick={onStar}>
            <Star className={`h-5 w-5 ${email.starred ? "text-yellow-400 fill-yellow-400" : ""}`} />
          </Button>
          
          <Button variant="ghost" size="icon" onClick={onDelete}>
            <Trash className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" onClick={onArchive}>
            <Archive className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" onClick={handleStartReply}>
            <Reply className="h-5 w-5" />
          </Button>
          
          {onReplyAll && (
            <Button variant="ghost" size="icon" onClick={onReplyAll}>
              <ReplyAll className="h-5 w-5" />
            </Button>
          )}
          
          {onForward && (
            <Button variant="ghost" size="icon" onClick={onForward}>
              <Forward className="h-5 w-5" />
            </Button>
          )}
          
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        <EmailDetailHeader 
          subject={email.subject}
          isStarred={email.starred}
          onBack={onBackToList}
          onStar={onStar}
          onDelete={onDelete}
          onArchive={onArchive}
        />
        
        <EmailDetailSender 
          senderName={email.senderName}
          senderEmail={email.senderEmail}
          recipient={email.recipient}
          date={email.date}
          hasAttachments={email.hasAttachments}
        />
        
        <div className="mt-4">
          <EmailDetailBody 
            body={email.body}
            labels={email.labels || []}
            allLabels={[]}
            onAddLabel={() => {}}
            onRemoveLabel={() => {}}
            showLabels={true}
          />
        </div>
        
        {email.hasAttachments && (
          <EmailDetailAttachments hasAttachments={true} />
        )}
      </div>
      
      {isReplying && (
        <div className="p-4 border-t">
          <div className="mb-2">
            <div className="font-medium text-sm mb-1">Reply to {email.senderName}</div>
            <div className="text-xs text-muted-foreground">
              Subject: Re: {email.subject}
            </div>
          </div>
          <Textarea 
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            placeholder="Write your reply here..."
            className="min-h-[150px] mb-3"
          />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleCancelReply}>
              Cancel
            </Button>
            <Button onClick={handleSendReply}>
              <Send className="h-4 w-4 mr-2" />
              Send Reply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailDetail;
