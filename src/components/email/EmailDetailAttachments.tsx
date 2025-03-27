
import React, { useState } from "react";
import { Download, File, Image, FileText, FileArchive, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

interface EmailDetailAttachmentsProps {
  hasAttachments: boolean;
  attachments?: Attachment[];
}

const EmailDetailAttachments: React.FC<EmailDetailAttachmentsProps> = ({
  hasAttachments,
  attachments = [
    // Default sample attachment if none provided
    {
      id: "1",
      name: "document.pdf",
      size: 2500000, // 2.5MB
      type: "application/pdf",
      url: "#"
    }
  ]
}) => {
  const { toast } = useToast();
  const [previewAttachment, setPreviewAttachment] = useState<Attachment | null>(null);
  
  if (!hasAttachments) return null;
  
  const getFileIcon = (type: string, name: string) => {
    const extension = name.split('.').pop()?.toLowerCase();
    
    if (type.startsWith('image/')) {
      return <Image className="h-4 w-4 text-blue-500" />;
    } else if (['pdf', 'doc', 'docx', 'txt'].includes(extension || '')) {
      return <FileText className="h-4 w-4 text-orange-500" />;
    } else if (['zip', 'rar', '7z', 'tar', 'gz'].includes(extension || '')) {
      return <FileArchive className="h-4 w-4 text-purple-500" />;
    } else {
      return <File className="h-4 w-4 text-gray-500" />;
    }
  };
  
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) {
      return bytes + ' B';
    } else if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(1) + ' KB';
    } else {
      return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }
  };
  
  const handleDownload = (attachment: Attachment) => {
    // In a real app, this would trigger a file download
    toast({
      title: "Download started",
      description: `Downloading ${attachment.name}...`,
      variant: "default"
    });
  };
  
  const handlePreview = (attachment: Attachment) => {
    // Only allow preview for certain file types
    const extension = attachment.name.split('.').pop()?.toLowerCase();
    const previewableTypes = ['pdf', 'jpg', 'jpeg', 'png', 'gif'];
    
    if (attachment.type.startsWith('image/') || previewableTypes.includes(extension || '')) {
      setPreviewAttachment(attachment);
    } else {
      toast({
        title: "Preview not available",
        description: "This file type cannot be previewed in the browser",
        variant: "default"
      });
    }
  };

  return (
    <div className="mt-6 border rounded-md p-4">
      <h4 className="text-sm font-medium mb-3">Attachments ({attachments.length})</h4>
      <div className="grid gap-2">
        {attachments.map((attachment) => (
          <div 
            key={attachment.id}
            className="bg-muted/30 rounded-lg p-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              {getFileIcon(attachment.type, attachment.name)}
              <div>
                <div className="text-sm font-medium">{attachment.name}</div>
                <div className="text-xs text-muted-foreground">
                  {formatFileSize(attachment.size)}
                </div>
              </div>
            </div>
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => handlePreview(attachment)}
              >
                <Eye className="h-4 w-4" />
                <span className="sr-only">Preview</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => handleDownload(attachment)}
              >
                <Download className="h-4 w-4" />
                <span className="sr-only">Download</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <Dialog open={!!previewAttachment} onOpenChange={() => setPreviewAttachment(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{previewAttachment?.name}</DialogTitle>
          </DialogHeader>
          <div className="h-[60vh] flex items-center justify-center p-4 overflow-auto">
            {previewAttachment?.type.startsWith('image/') ? (
              <img 
                src={previewAttachment.url} 
                alt={previewAttachment.name}
                className="max-h-full object-contain"
              />
            ) : (
              <div className="border p-8 rounded-lg flex flex-col items-center justify-center">
                <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">{previewAttachment?.name}</p>
                <p className="text-sm text-muted-foreground mb-4">
                  {formatFileSize(previewAttachment?.size || 0)}
                </p>
                <Button onClick={() => handleDownload(previewAttachment!)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmailDetailAttachments;
