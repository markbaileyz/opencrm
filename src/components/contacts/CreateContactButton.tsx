
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
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Contact, ContactStatus } from "@/types/contact";
import ContactTags from "./ContactTags";

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
    notes: "",
    tags: []
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateContact(formData);
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
      notes: "",
      tags: []
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
                <Label htmlFor="lastContact">Last Contact Date</Label>
                <Input
                  id="lastContact"
                  name="lastContact"
                  type="date"
                  value={formData.lastContact}
                  onChange={handleChange}
                />
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
