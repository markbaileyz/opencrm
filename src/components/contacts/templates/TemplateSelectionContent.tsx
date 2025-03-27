
import React from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { EmailTemplate, getTemplateById } from "@/utils/emailTemplates";

interface TemplateSelectionContentProps {
  templates: EmailTemplate[];
  selectedTemplateId: string;
  setSelectedTemplateId: (id: string) => void;
  onSelectTemplate: () => void;
  recipientName: string;
}

const TemplateSelectionContent: React.FC<TemplateSelectionContentProps> = ({
  templates,
  selectedTemplateId,
  setSelectedTemplateId,
  onSelectTemplate,
  recipientName
}) => {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Select Email Template</DialogTitle>
        <DialogDescription>
          Choose a template to use for your email to {recipientName}.
        </DialogDescription>
      </DialogHeader>
      
      <div className="py-4">
        <Select value={selectedTemplateId} onValueChange={setSelectedTemplateId}>
          <SelectTrigger>
            <SelectValue placeholder="Select a template" />
          </SelectTrigger>
          <SelectContent>
            {templates.map((template) => (
              <SelectItem key={template.id} value={template.id}>
                {template.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {selectedTemplateId && (
          <div className="mt-4 p-3 bg-muted/30 rounded-md">
            <p className="text-sm font-medium">{getTemplateById(selectedTemplateId)?.description}</p>
          </div>
        )}
      </div>
      
      <DialogFooter>
        <Button type="button" onClick={onSelectTemplate} disabled={!selectedTemplateId}>
          Use Template
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default TemplateSelectionContent;
