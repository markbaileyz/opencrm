
import { useState } from "react";
import { EmailTemplate, getAllTemplates, getTemplateById, applyTemplatePlaceholders } from "@/utils/emailTemplates";
import { Contact } from "@/types/contact";

export function useTemplateSelection(contact: Contact, onSelectTemplate: (subject: string, body: string) => void) {
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

  return {
    selectedTemplateId,
    setSelectedTemplateId,
    open,
    setOpen,
    templates,
    handleSelectTemplate
  };
}
