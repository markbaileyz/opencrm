
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { X, Paperclip, File, Image, FileText, FileArchive } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmailAttachmentsProps {
  attachments: File[];
  onAttachmentAdd: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAttachmentRemove: (index: number) => void;
  maxSize?: number; // Maximum file size in MB
}

const EmailAttachments: React.FC<EmailAttachmentsProps> = ({
  attachments,
  onAttachmentAdd,
  onAttachmentRemove,
  maxSize = 25 // Default 25MB max size
}) => {
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  // Calculate total size of attachments
  const totalSizeMB = attachments.reduce((acc, file) => acc + file.size / (1024 * 1024), 0);
  const sizePercentage = (totalSizeMB / maxSize) * 100;
  
  const getFileIcon = (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    
    if (file.type.startsWith('image/')) {
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
  
  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Check if adding these files would exceed the size limit
      const newFilesSize = Array.from(e.dataTransfer.files).reduce((acc, file) => acc + file.size, 0) / (1024 * 1024);
      
      if (totalSizeMB + newFilesSize > maxSize) {
        toast({
          title: "Attachment size limit exceeded",
          description: `Maximum total attachment size is ${maxSize}MB`,
          variant: "destructive"
        });
        return;
      }
      
      // Create an event-like object to pass to the handler
      const mockEvent = {
        target: {
          files: e.dataTransfer.files
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      onAttachmentAdd(mockEvent);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Check if adding these files would exceed the size limit
      const newFilesSize = Array.from(e.target.files).reduce((acc, file) => acc + file.size, 0) / (1024 * 1024);
      
      if (totalSizeMB + newFilesSize > maxSize) {
        toast({
          title: "Attachment size limit exceeded",
          description: `Maximum total attachment size is ${maxSize}MB`,
          variant: "destructive"
        });
        return;
      }
      
      onAttachmentAdd(e);
    }
  };
  
  return (
    <div className="space-y-3">
      <div 
        className={`border-2 border-dashed rounded-md p-4 transition-colors ${
          isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/20'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center py-4 text-center">
          <Paperclip className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm font-medium mb-1">Drag and drop files here</p>
          <p className="text-xs text-muted-foreground mb-3">or</p>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={handleBrowseClick}
          >
            Browse Files
          </Button>
          <Input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          <p className="text-xs text-muted-foreground mt-3">
            Max {maxSize}MB total ({formatFileSize(maxSize * 1024 * 1024)})
          </p>
        </div>
      </div>
      
      {attachments.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span>Used {totalSizeMB.toFixed(1)}MB of {maxSize}MB</span>
            <span>{Math.min(100, sizePercentage.toFixed(0))}%</span>
          </div>
          <Progress value={Math.min(100, sizePercentage)} className="h-1" />
          
          <div className="space-y-2 mt-3">
            {attachments.map((file, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-2 border rounded-md bg-muted/20"
              >
                <div className="flex items-center">
                  {getFileIcon(file)}
                  <span className="ml-2 text-sm font-medium truncate max-w-[200px]">
                    {file.name}
                  </span>
                  <span className="ml-2 text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onAttachmentRemove(index)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailAttachments;
