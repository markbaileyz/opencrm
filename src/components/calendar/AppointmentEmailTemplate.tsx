
import React from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useTemplateSelection } from "@/hooks/useTemplateSelection";
import TemplateSelectionContent from "@/components/contacts/templates/TemplateSelectionContent";
import type { Appointment } from "@/types/appointment";

interface AppointmentEmailTemplateProps {
  appointment: Appointment;
  onSelectTemplate: (subject: string, body: string) => void;
}

const AppointmentEmailTemplate = ({ 
  appointment, 
  onSelectTemplate 
}: AppointmentEmailTemplateProps) => {
  // Create a contact-like object from appointment data for template placeholders
  const contactLike = {
    id: appointment.id,
    name: appointment.name,
    company: appointment.title || "Your Appointment",
  };

  const {
    selectedTemplateId,
    setSelectedTemplateId,
    open,
    setOpen,
    templates,
    handleSelectTemplate
  } = useTemplateSelection(contactLike, onSelectTemplate);
  
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
        recipientName={appointment.name}
      />
    </Dialog>
  );
};

export default AppointmentEmailTemplate;
