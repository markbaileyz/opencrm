
import React from "react";
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
  Download 
} from "lucide-react";
import { Email } from "@/types/email";
import { formatDate } from "@/utils/emailUtils";
import { EmailDetailHeader } from "./EmailDetailHeader";
import { EmailDetailSender } from "./EmailDetailSender";
import { EmailDetailBody } from "./EmailDetailBody";
import { EmailDetailAttachments } from "./EmailDetailAttachments";

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
          
          {onReply && (
            <Button variant="ghost" size="icon" onClick={onReply}>
              <Reply className="h-5 w-5" />
            </Button>
          )}
          
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
        <EmailDetailHeader email={email} />
        <EmailDetailSender email={email} />
        
        <div className="mt-4">
          <EmailDetailBody content={email.body} />
        </div>
        
        {email.attachments && email.attachments.length > 0 && (
          <EmailDetailAttachments attachments={email.attachments} />
        )}
      </div>
    </div>
  );
};

export default EmailDetail;
