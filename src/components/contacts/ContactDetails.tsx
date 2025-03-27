
import React, { useState, useEffect } from "react";
import { Contact, ContactStatus, ContactPriority, ContactActivity, FollowUp } from "@/types/contact";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Edit, 
  Trash, 
  Save, 
  X, 
  Mail, 
  Calendar, 
  FileText,
} from "lucide-react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import ContactEditForm from "./ContactEditForm";
import ContactInfo from "./ContactInfo";
import ContactActivityLog from "./ContactActivityLog";
import ContactFollowUpSection from "./ContactFollowUpSection";
import ContactActivityDialog from "./ContactActivityDialog";
import { Label } from "@/components/ui/label";

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
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Contact>(contact);
  const [activityDialogOpen, setActivityDialogOpen] = useState(false);
  const [activityType, setActivityType] = useState<ContactActivity["type"]>("note");
  const [activityDescription, setActivityDescription] = useState("");
  
  // Initialize form data when contact changes
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
  
  const handleStatusChange = (status: ContactStatus) => {
    setFormData({
      ...formData,
      status,
    });
  };
  
  const handlePriorityChange = (priority: ContactPriority) => {
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

  const handleActivityDialogOpen = (type: ContactActivity["type"]) => {
    setActivityType(type);
    setActivityDescription("");
    setActivityDialogOpen(true);
  };

  const handleAddActivitySubmit = () => {
    if (onAddActivity && activityDescription.trim()) {
      onAddActivity(activityType, activityDescription.trim());
      setActivityDialogOpen(false);
      setActivityDescription("");
    }
  };

  const handleUpdateFollowUp = (followUp: FollowUp) => {
    const updatedContact = {
      ...contact,
      followUp: followUp
    };

    onUpdateContact(updatedContact);
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl">
          {isEditing ? "Edit Contact" : contact.name}
        </CardTitle>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSubmit}>
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Contact</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete {contact.name}? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDeleteContact(contact.id)}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {isEditing ? (
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
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3 space-y-4">
                <ContactInfo contact={contact} />
                <ContactFollowUpSection 
                  contact={contact} 
                  onUpdateFollowUp={handleUpdateFollowUp} 
                />
              </div>
            </div>
            
            <div className="border-t pt-6 mt-6">
              <ContactActivityLog 
                activities={contact.activities || []}
                onAddActivity={onAddActivity ? handleActivityDialogOpen : undefined}
              />
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => handleActivityDialogOpen("meeting")}>
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Meeting
              </Button>
              <Button onClick={() => handleActivityDialogOpen("email")}>
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Button>
            </div>
          </div>
        )}
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
