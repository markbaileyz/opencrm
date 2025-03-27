
import { useState, useEffect } from "react";
import { Contact, FollowUp } from "@/types/contact";

export const useContactDetailsState = (
  contact: Contact,
  onUpdateContact: (contact: Contact) => void
) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Contact>(contact);
  const [activityDialogOpen, setActivityDialogOpen] = useState(false);
  const [activityType, setActivityType] = useState<"email" | "call" | "meeting" | "note">("note");
  const [activityDescription, setActivityDescription] = useState("");
  
  useEffect(() => {
    setFormData({
      ...contact,
      tags: contact.tags || [],
      activities: contact.activities || []
    });
  }, [contact]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleStatusChange = (status: Contact["status"]) => {
    setFormData({
      ...formData,
      status,
    });
  };
  
  const handlePriorityChange = (priority: Contact["priority"]) => {
    setFormData({
      ...formData,
      priority,
    });
  };
  
  const handleAddTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: [...(formData.tags || []), tag]
    });
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: (formData.tags || []).filter(tag => tag !== tagToRemove)
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateContact(formData);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setFormData(contact);
    setIsEditing(false);
  };

  const handleUpdateFollowUp = (followUp: FollowUp) => {
    const updatedContact = {
      ...contact,
      followUp: followUp
    };

    onUpdateContact(updatedContact);
  };

  const handleActivityDialogOpen = (type: "email" | "call" | "meeting" | "note") => {
    setActivityType(type);
    setActivityDescription("");
    setActivityDialogOpen(true);
  };

  const handleEmailTemplateSelect = (subject: string, body: string) => {
    setActivityType("email");
    setActivityDescription(`Subject: ${subject}\n\n${body}`);
    setActivityDialogOpen(true);
  };

  return {
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
  };
};
