
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X, Paperclip } from "lucide-react";

interface EmailAttachmentsProps {
  attachments: File[];
  onAttachmentAdd: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAttachmentRemove: (index: number) => void;
}

const EmailAttachments: React.FC<EmailAttachmentsProps> = ({
  attachments,
  onAttachmentAdd,
  onAttachmentRemove
}) => {
  return (
    <div className="space-y-4">
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
                  onClick={() => onAttachmentRemove(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex items-center">
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
          onChange={onAttachmentAdd}
        />
      </div>
    </div>
  );
};

export default EmailAttachments;
