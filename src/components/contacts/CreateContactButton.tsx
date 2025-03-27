
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Bell } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Contact, ContactStatus, ContactPriority, FollowUp } from "@/types/contact";
import ContactTags from "./ContactTags";
import { Checkbox } from "@/components/ui/checkbox";
import { v4 as uuidv4 } from "uuid";

interface CreateContactButtonProps {
  onCreateContact: (contact: Omit<Contact, "id">) => void;
  variant?: "default" | "outline" | "secondary";
  className?: string;
}

const CreateContactButton = ({ 
  onCreateContact, 
  variant = "default",
  className 
}: CreateContactButtonProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<Contact, "id">>({
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="johndoe@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  placeholder="Acme Inc."
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  name="position"
                  placeholder="CEO"
                  value={formData.position}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleStatusChange(value as ContactStatus)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="prospect">Prospect</SelectItem>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={formData.priority || "medium"}
                  onValueChange={(value) => handlePriorityChange(value as ContactPriority)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastContact">Last Contact Date</Label>
                <Input
                  id="lastContact"
                  name="lastContact"
                  type="date"
                  value={formData.lastContact}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="profileImage">Profile Image URL (Optional)</Label>
              <Input
                id="profileImage"
                name="profileImage"
                placeholder="https://example.com/image.jpg"
                value={formData.profileImage || ""}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label>Tags</Label>
              <ContactTags
                tags={formData.tags || []}
                onAddTag={handleAddTag}
                onRemoveTag={handleRemoveTag}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Additional information about this contact..."
                value={formData.notes}
                onChange={handleChange}
                rows={3}
              />
            </div>

            {/* Follow-up section */}
            <div className="border-t pt-4 mt-2">
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox 
                  id="includeFollowUp"
                  checked={includeFollowUp}
                  onCheckedChange={(checked) => setIncludeFollowUp(checked === true)}
                />
                <Label htmlFor="includeFollowUp" className="flex items-center">
                  <Bell className="h-4 w-4 mr-2" />
                  Set follow-up reminder
                </Label>
              </div>
              
              {includeFollowUp && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-6">
                  <div className="grid gap-2">
                    <Label htmlFor="followUpDueDate">Follow-up Date</Label>
                    <Input
                      id="followUpDueDate"
                      name="dueDate"
                      type="date"
                      value={followUpData.dueDate}
                      onChange={handleFollowUpChange}
                      required={includeFollowUp}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="followUpPriority">Priority</Label>
                    <Select
                      value={followUpData.priority}
                      onValueChange={(value) => handleFollowUpPriorityChange(value as ContactPriority)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low Priority</SelectItem>
                        <SelectItem value="medium">Medium Priority</SelectItem>
                        <SelectItem value="high">High Priority</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2 sm:col-span-2">
                    <Label htmlFor="followUpDescription">Description</Label>
                    <Textarea
                      id="followUpDescription"
                      name="description"
                      placeholder="What needs to be followed up on..."
                      value={followUpData.description}
                      onChange={handleFollowUpChange}
                      rows={2}
                      required={includeFollowUp}
                    />
                  </div>
                </div>
              )}
            </div>
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
