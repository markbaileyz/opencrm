
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Contact, ContactStatus, ContactPriority, FollowUp } from "@/types/contact";
import { v4 as uuidv4 } from "uuid";
import ContactFormFields from "./ContactFormFields";
import FollowUpFormFields from "./FollowUpFormFields";

interface CreateContactButtonProps {
  onCreateContact: (contact: Omit<Contact, "id">) => void;
  variant?: "default" | "outline" | "secondary";
  className?: string;
}

interface FormDataType {
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  lastContact: string;
  status: ContactStatus;
  priority: ContactPriority;
  notes: string;
  profileImage?: string;
  tags?: string[];
}

const CreateContactButton = ({ 
  onCreateContact, 
  variant = "default",
  className 
}: CreateContactButtonProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    lastContact: new Date().toISOString().split("T")[0],
    status: "lead",
    priority: "medium",
    notes: "",
    tags: []
  });
  
  const [includeFollowUp, setIncludeFollowUp] = useState(false);
  const [followUpData, setFollowUpData] = useState({
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
    description: "",
    priority: "medium" as ContactPriority
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleStatusChange = (value: ContactStatus) => {
    setFormData((prev) => ({
      ...prev,
      status: value,
    }));
  };

  const handlePriorityChange = (value: ContactPriority) => {
    setFormData((prev) => ({
      ...prev,
      priority: value,
    }));
  };
  
  const handleAddTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: [...(prev.tags || []), tag]
    }));
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: (prev.tags || []).filter(tag => tag !== tagToRemove)
    }));
  };

  const handleFollowUpChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFollowUpData({
      ...followUpData,
      [name]: value,
    });
  };

  const handleFollowUpPriorityChange = (value: ContactPriority) => {
    setFollowUpData({
      ...followUpData,
      priority: value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create final contact object, including follow-up if selected
    const contactToCreate: Omit<Contact, "id"> = {
      ...formData
    };
    
    if (includeFollowUp && followUpData.description) {
      const followUp: FollowUp = {
        id: uuidv4(),
        contactId: "", // Will be set after contact is created
        dueDate: followUpData.dueDate,
        description: followUpData.description,
        status: "pending",
        priority: followUpData.priority
      };
      
      contactToCreate.followUp = followUp;
    }
    
    onCreateContact(contactToCreate);
    setOpen(false);
    resetForm();
  };
  
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      position: "",
      lastContact: new Date().toISOString().split("T")[0],
      status: "lead",
      priority: "medium",
      notes: "",
      tags: []
    });
    setIncludeFollowUp(false);
    setFollowUpData({
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: "",
      priority: "medium"
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) {
        resetForm();
      }
    }}>
      <DialogTrigger asChild>
        <Button variant={variant} className={className}>
          <Plus className="mr-2 h-4 w-4" />
          Add Contact
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Contact</DialogTitle>
          <DialogDescription>
            Add a new contact to your network.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <ContactFormFields 
              formData={formData}
              handleChange={handleChange}
              handleStatusChange={handleStatusChange}
              handlePriorityChange={handlePriorityChange}
              handleAddTag={handleAddTag}
              handleRemoveTag={handleRemoveTag}
            />
            
            <FollowUpFormFields 
              includeFollowUp={includeFollowUp}
              setIncludeFollowUp={setIncludeFollowUp}
              followUpData={followUpData}
              handleFollowUpChange={handleFollowUpChange}
              handleFollowUpPriorityChange={handleFollowUpPriorityChange}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Create Contact</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateContactButton;
