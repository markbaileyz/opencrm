
import React, { useState } from "react";
import { Contact, ContactStatus, ContactPriority, ContactActivity, FollowUp, FollowUpStatus } from "@/types/contact";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Edit, 
  Trash, 
  Save, 
  X, 
  Mail, 
  Phone, 
  Calendar, 
  Building, 
  Briefcase,
  User,
  FileText,
  Bell
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import ContactStatusBadge from "./ContactStatusBadge";
import ContactPriorityBadge from "./ContactPriorityBadge";
import ContactTags from "./ContactTags";
import ContactActivityLog from "./ContactActivityLog";
import FollowUpReminder from "./FollowUpReminder";
import { v4 as uuidv4 } from "uuid";

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
  const [followUpDialogOpen, setFollowUpDialogOpen] = useState(false);
  const [followUpData, setFollowUpData] = useState<Omit<FollowUp, "id" | "contactId">>({
    dueDate: "",
    description: "",
    status: "pending",
    priority: "medium"
  });
  
  // Initialize tags if they don't exist
  React.useEffect(() => {
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

  const handleFollowUpChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFollowUpData({
      ...followUpData,
      [name]: value,
    });
  };

  const handleFollowUpPriorityChange = (priority: ContactPriority) => {
    setFollowUpData({
      ...followUpData,
      priority,
    });
  };

  const handleAddFollowUp = () => {
    if (followUpData.dueDate && followUpData.description) {
      const newFollowUp: FollowUp = {
        id: uuidv4(),
        contactId: contact.id,
        ...followUpData
      };

      const updatedContact = {
        ...contact,
        followUp: newFollowUp
      };

      onUpdateContact(updatedContact);
      setFollowUpDialogOpen(false);
      resetFollowUpForm();
    }
  };

  const handleCompleteFollowUp = (followUpId: string) => {
    if (contact.followUp && contact.followUp.id === followUpId) {
      const updatedFollowUp: FollowUp = {
        ...contact.followUp,
        status: "completed"
      };

      const updatedContact = {
        ...contact,
        followUp: updatedFollowUp
      };

      onUpdateContact(updatedContact);
    }
  };

  const handleRescheduleFollowUp = (followUpId: string) => {
    if (contact.followUp && contact.followUp.id === followUpId) {
      setFollowUpData({
        dueDate: contact.followUp.dueDate,
        description: contact.followUp.description,
        status: "pending",
        priority: contact.followUp.priority
      });
      setFollowUpDialogOpen(true);
    }
  };

  const resetFollowUpForm = () => {
    setFollowUpData({
      dueDate: "",
      description: "",
      status: "pending",
      priority: "medium"
    });
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
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex-1">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
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
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="space-y-4">
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
                  
                  <div className="grid gap-2">
                    <Label htmlFor="profileImage">Profile Image URL</Label>
                    <Input
                      id="profileImage"
                      name="profileImage"
                      value={formData.profileImage || ""}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
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
                      value={formData.notes}
                      onChange={handleChange}
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3 space-y-4">
                {contact.profileImage ? (
                  <div className="rounded-lg overflow-hidden h-40 w-40 mx-auto">
                    <img
                      src={contact.profileImage}
                      alt={contact.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="rounded-lg bg-muted h-40 w-40 mx-auto flex items-center justify-center">
                    <User className="h-20 w-20 text-muted-foreground/50" />
                  </div>
                )}
                
                <div className="flex flex-col items-center gap-2">
                  <ContactStatusBadge status={contact.status} size="lg" />
                  {contact.priority && (
                    <ContactPriorityBadge priority={contact.priority} size="lg" />
                  )}
                </div>
                
                {(contact.tags && contact.tags.length > 0) && (
                  <div className="pt-2">
                    <Label className="text-sm text-muted-foreground mb-2 block">Tags</Label>
                    <ContactTags
                      tags={contact.tags}
                      onAddTag={() => {}}
                      onRemoveTag={() => {}}
                      readOnly
                    />
                  </div>
                )}

                {/* Follow-up reminder section */}
                {contact.followUp ? (
                  <FollowUpReminder 
                    followUp={contact.followUp}
                    onComplete={handleCompleteFollowUp}
                    onReschedule={handleRescheduleFollowUp}
                    className="mt-4"
                  />
                ) : (
                  <Button 
                    variant="outline" 
                    className="w-full mt-4" 
                    onClick={() => setFollowUpDialogOpen(true)}
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Add Follow-up Reminder
                  </Button>
                )}
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="grid gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Email:</span>
                    <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                      {contact.email}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Phone:</span>
                    <a href={`tel:${contact.phone}`} className="hover:underline">
                      {contact.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Company:</span>
                    <span>{contact.company}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Position:</span>
                    <span>{contact.position}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Last Contact:</span>
                    <span>{new Date(contact.lastContact).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h3 className="text-sm font-medium mb-2">Notes</h3>
                  <div className="bg-muted/30 p-3 rounded-md whitespace-pre-line">
                    {contact.notes || "No notes added yet."}
                  </div>
                </div>
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

      {/* Activity Dialog */}
      <Dialog open={activityDialogOpen} onOpenChange={setActivityDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {activityType === "email" && "Log Email"}
              {activityType === "call" && "Log Call"}
              {activityType === "meeting" && "Log Meeting"}
              {activityType === "note" && "Add Note"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="activityType">Type</Label>
              <Select
                value={activityType}
                onValueChange={(value) => setActivityType(value as ContactActivity["type"])}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="call">Phone Call</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="note">Note</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">
                {activityType === "note" ? "Note" : "Description"}
              </Label>
              <Textarea
                id="description"
                value={activityDescription}
                onChange={(e) => setActivityDescription(e.target.value)}
                placeholder={
                  activityType === "email" ? "Discussed project timeline and next steps..."
                  : activityType === "call" ? "Called about the upcoming proposal..."
                  : activityType === "meeting" ? "Met to review requirements and timeline..."
                  : "Added information about the contact..."
                }
                rows={4}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setActivityDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddActivitySubmit}
              disabled={!activityDescription.trim()}
            >
              {activityType === "note" ? "Add Note" : "Log Activity"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Follow-up Dialog */}
      <Dialog open={followUpDialogOpen} onOpenChange={(open) => {
        setFollowUpDialogOpen(open);
        if (!open) resetFollowUpForm();
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {contact.followUp ? "Update Follow-up Reminder" : "Add Follow-up Reminder"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                name="dueDate"
                type="date"
                value={followUpData.dueDate}
                onChange={handleFollowUpChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={followUpData.priority}
                onValueChange={value => handleFollowUpPriorityChange(value as ContactPriority)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={followUpData.description}
                onChange={handleFollowUpChange}
                placeholder="Follow up about the proposal..."
                rows={3}
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setFollowUpDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddFollowUp}
              disabled={!followUpData.dueDate || !followUpData.description}
            >
              {contact.followUp ? "Update Reminder" : "Add Reminder"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ContactDetails;
