
import React from "react";
import { Download, File } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <div className="bg-muted/50 p-2 rounded flex items-center gap-2">
          <File className="h-4 w-4" />
          <span className="text-sm">document.pdf</span>
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailDetailAttachments;
