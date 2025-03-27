
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Mail } from "lucide-react";
import { Contact } from "@/types/contact";
import { useTemplateSelection } from "@/hooks/useTemplateSelection";
import TemplateSelectionContent from "./templates/TemplateSelectionContent";

interface ContactEmailTemplatesProps {
  contact: Contact;
  onSelectTemplate: (subject: string, body: string) => void;
}

const ContactEmailTemplates = ({ contact, onSelectTemplate }: ContactEmailTemplatesProps) => {
  const {
    selectedTemplateId,
    setSelectedTemplateId,
    open,
    setOpen,
    templates,
    handleSelectTemplate
  } = useTemplateSelection(contact, onSelectTemplate);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Mail className="h-4 w-4 mr-2" />
          Use Template
        </Button>
      </DialogTrigger>
      
      <TemplateSelectionContent
        templates={templates}
        selectedTemplateId={selectedTemplateId}
        setSelectedTemplateId={setSelectedTemplateId}
        onSelectTemplate={handleSelectTemplate}
        recipientName={contact.name}
      />
    </Dialog>
  );
};

export default ContactEmailTemplates;
