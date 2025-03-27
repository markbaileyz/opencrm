
import React from "react";
import { Contact, ContactActivity } from "@/types/contact";
import ContactInfo from "../ContactInfo";
import ContactFollowUpSection from "../ContactFollowUpSection";
import ContactActivityLog from "../ContactActivityLog";
import ContactEmailTemplates from "../ContactEmailTemplates";
import { Button } from "@/components/ui/button";
import { Calendar, Mail } from "lucide-react";
import ContactEditForm from "../ContactEditForm";

interface ContactDetailsContentProps {
  contact: Contact;
  isEditing: boolean;
  formData: Contact;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleStatusChange: (status: Contact["status"]) => void;
  handlePriorityChange: (priority: Contact["priority"]) => void;
  handleAddTag: (tag: string) => void;
  handleRemoveTag: (tagToRemove: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  onUpdateFollowUp: (followUp: Contact["followUp"]) => void;
  onAddActivity: (type: ContactActivity["type"]) => void;
  handleEmailTemplateSelect: (subject: string, body: string) => void;
}

const ContactDetailsContent: React.FC<ContactDetailsContentProps> = ({
  contact,
  isEditing,
  formData,
  handleChange,
  handleStatusChange,
  handlePriorityChange,
  handleAddTag,
  handleRemoveTag,
  handleSubmit,
  onUpdateFollowUp,
  onAddActivity,
  handleEmailTemplateSelect
}) => {
  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <ContactEditForm
          formData={formData}
          handleChange={handleChange}
          handleStatusChange={handleStatusChange}
          handlePriorityChange={handlePriorityChange}
          handleAddTag={handleAddTag}
          handleRemoveTag={handleRemoveTag}
        />
      </form>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3 space-y-4">
          <ContactInfo contact={contact} />
          <ContactFollowUpSection 
            contact={contact} 
            onUpdateFollowUp={onUpdateFollowUp} 
          />
        </div>
      </div>
      
      <div className="border-t pt-6 mt-6">
        <ContactActivityLog 
          activities={contact.activities || []}
          onAddActivity={onAddActivity}
        />
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <ContactEmailTemplates 
          contact={contact}
          onSelectTemplate={handleEmailTemplateSelect}
        />
        <Button variant="outline" onClick={() => onAddActivity("meeting")}>
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Meeting
        </Button>
        <Button onClick={() => onAddActivity("email")}>
          <Mail className="h-4 w-4 mr-2" />
          Send Email
        </Button>
      </div>
    </div>
  );
};

export default ContactDetailsContent;
