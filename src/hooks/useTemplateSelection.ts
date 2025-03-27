
import { useState } from "react";
import { EmailTemplate, getAllTemplates, getTemplateById, applyTemplatePlaceholders } from "@/utils/emailTemplates";
import { Contact } from "@/types/contact";

// Define a type that has the minimal properties we need for template replacement
interface TemplatePlaceholderContext {
  id: string;
  name: string;
  company?: string;
}

export function useTemplateSelection(
  context: TemplatePlaceholderContext, 
  onSelectTemplate: (subject: string, body: string) => void
) {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const [open, setOpen] = useState(false);
  
  const templates = getAllTemplates();
  
  const handleSelectTemplate = () => {
    if (!selectedTemplateId) return;
    
    const template = getTemplateById(selectedTemplateId);
    if (!template) return;
    
    // Apply contact or appointment information to the template
    const placeholderValues = {
      'Recipient': context.name,
      'Your Name': 'Your Name', // This would come from user settings in a real app
      'Date and Time': new Date().toLocaleString(),
      'Location or Platform': 'Zoom/Google Meet',
      'Topic': `Discussion about ${context.company || 'our upcoming meeting'}`,
      'Meeting Topic': `Our collaboration with ${context.company || 'you'}`
    };
    
    const subject = applyTemplatePlaceholders(template.subject, placeholderValues);
    const body = applyTemplatePlaceholders(template.body, placeholderValues);
    
    onSelectTemplate(subject, body);
    setOpen(false);
  };

  return {
    selectedTemplateId,
    setSelectedTemplateId,
    open,
    setOpen,
    templates,
    handleSelectTemplate
  };
}
