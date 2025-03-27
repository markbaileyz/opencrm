import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContactStatus, ContactPriority } from "@/types/contact";
import ContactTags from "./ContactTags";

interface ContactFormFieldsProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    company: string;
    position: string;
    lastContact: string;
    status: ContactStatus;
    priority?: ContactPriority;
    notes: string;
    profileImage?: string;
    tags?: string[];
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleStatusChange: (value: ContactStatus) => void;
  handlePriorityChange: (value: ContactPriority) => void;
  handleAddTag: (tag: string) => void;
  handleRemoveTag: (tagToRemove: string) => void;
}

const ContactFormFields: React.FC<ContactFormFieldsProps> = ({
  formData,
  handleChange,
  handleStatusChange,
  handlePriorityChange,
  handleAddTag,
  handleRemoveTag,
}) => {
  return (
    <>
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
    </>
  );
};

export default ContactFormFields;
