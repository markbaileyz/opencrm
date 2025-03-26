
import React from "react";

interface EmailDetailAttachmentsProps {
  hasAttachments: boolean;
}

const EmailDetailAttachments: React.FC<EmailDetailAttachmentsProps> = ({
  hasAttachments
}) => {
  if (!hasAttachments) return null;
  
  return (
    <div className="mt-6 border rounded-md p-3">
      <h4 className="text-sm font-medium mb-2">Attachments</h4>
      <div className="flex gap-2">
        <div className="bg-muted/50 p-2 rounded text-xs flex items-center gap-1 cursor-pointer hover:bg-muted">
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <line x1="10" y1="9" x2="8" y2="9" />
          </svg>
          document.pdf
        </div>
      </div>
    </div>
  );
};

export default EmailDetailAttachments;
