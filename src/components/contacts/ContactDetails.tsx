
import React from "react";
import { Contact, ContactActivity } from "@/types/contact";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ContactDetailsHeader from "./details/ContactDetailsHeader";
import ContactDetailsContent from "./details/ContactDetailsContent";
import { useContactDetailsState } from "./details/useContactDetailsState";
import ContactActivityDialog from "./ContactActivityDialog";

interface ContactDetailsProps {
  contact: Contact;
  onUpdateContact: (contact: Contact) => void;
  onDeleteContact: (id: string) => void;
  onAddActivity?: (type: ContactActivity["type"], description: string) => void;
}

const ContactDetails = ({ 
  contact, 
  onUpdateContact, 
  onDeleteContact,
  onAddActivity 
}: ContactDetailsProps) => {
  const {
    isEditing,
    setIsEditing,
    formData,
    activityDialogOpen,
    setActivityDialogOpen,
    activityType,
    setActivityType,
    activityDescription,
    setActivityDescription,
    handleChange,
    handleStatusChange,
    handlePriorityChange,
    handleAddTag,
    handleRemoveTag,
    handleSubmit,
    handleCancel,
    handleUpdateFollowUp,
    handleActivityDialogOpen,
    handleEmailTemplateSelect
  } = useContactDetailsState(contact, onUpdateContact);

  const handleAddActivitySubmit = () => {
    if (onAddActivity && activityDescription.trim()) {
      onAddActivity(activityType, activityDescription.trim());
      setActivityDialogOpen(false);
      setActivityDescription("");
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <ContactDetailsHeader 
          contact={contact}
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onCancel={handleCancel}
          onSave={handleSubmit}
          onDelete={onDeleteContact}
        />
      </CardHeader>
      <CardContent className="pt-4">
        <ContactDetailsContent 
          contact={contact}
          isEditing={isEditing}
          formData={formData}
          handleChange={handleChange}
          handleStatusChange={handleStatusChange}
          handlePriorityChange={handlePriorityChange}
          handleAddTag={handleAddTag}
          handleRemoveTag={handleRemoveTag}
          handleSubmit={handleSubmit}
          onUpdateFollowUp={handleUpdateFollowUp}
          onAddActivity={handleActivityDialogOpen}
          handleEmailTemplateSelect={handleEmailTemplateSelect}
        />
      </CardContent>

      <ContactActivityDialog
        open={activityDialogOpen}
        onOpenChange={setActivityDialogOpen}
        activityType={activityType}
        setActivityType={setActivityType}
        activityDescription={activityDescription}
        setActivityDescription={setActivityDescription}
        onSubmit={handleAddActivitySubmit}
      />
    </Card>
  );
};

export default ContactDetails;
