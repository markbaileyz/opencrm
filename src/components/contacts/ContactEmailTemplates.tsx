
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Mail } from "lucide-react";
import { EmailTemplate, getAllTemplates, getTemplateById, applyTemplatePlaceholders } from "@/utils/emailTemplates";
import { Contact } from "@/types/contact";

interface ContactEmailTemplatesProps {
  contact: Contact;
  onSelectTemplate: (subject: string, body: string) => void;
}

const ContactEmailTemplates = ({ contact, onSelectTemplate }: ContactEmailTemplatesProps) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const [open, setOpen] = useState(false);
  
  const templates = getAllTemplates();
  
  const handleSelectTemplate = () => {
    if (!selectedTemplateId) return;
    
    const template = getTemplateById(selectedTemplateId);
    if (!template) return;
    
    // Apply contact information to the template
    const placeholderValues = {
      'Recipient': contact.name,
      'Your Name': 'Your Name', // This would come from user settings in a real app
      'Date and Time': new Date().toLocaleString(),
      'Location or Platform': 'Zoom/Google Meet',
      'Topic': `Discussion about ${contact.company}`,
      'Meeting Topic': `Our collaboration with ${contact.company}`
    };
    
    const subject = applyTemplatePlaceholders(template.subject, placeholderValues);
    const body = applyTemplatePlaceholders(template.body, placeholderValues);
    
    onSelectTemplate(subject, body);
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Mail className="h-4 w-4 mr-2" />
          Use Template
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select Email Template</DialogTitle>
          <DialogDescription>
            Choose a template to use for your email to {contact.name}.
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
          <Button type="button" onClick={handleSelectTemplate} disabled={!selectedTemplateId}>
            Use Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContactEmailTemplates;
