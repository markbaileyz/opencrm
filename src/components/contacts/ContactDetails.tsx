
import React, { useState } from "react";
import { Contact, ContactStatus } from "@/types/contact";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Edit, Trash2, Mail, Phone, Building, Calendar, User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";

interface ContactDetailsProps {
  contact: Contact;
  onUpdateContact: (updatedContact: Contact) => void;
  onDeleteContact: (contactId: string) => void;
}

const ContactDetails = ({ contact, onUpdateContact, onDeleteContact }: ContactDetailsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [editedContact, setEditedContact] = useState<Contact>(contact);
  
  // Format the last contact date
  const formattedDate = (() => {
    try {
      return format(new Date(contact.lastContact), 'PPP');
    } catch (e) {
      return contact.lastContact;
    }
  })();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedContact({
      ...editedContact,
      [name]: value,
    });
  };
  
  const handleStatusChange = (value: string) => {
    setEditedContact({
      ...editedContact,
      status: value as ContactStatus,
    });
  };
  
  const handleSave = () => {
    onUpdateContact(editedContact);
    setIsEditing(false);
  };
  
  const handleDelete = () => {
    onDeleteContact(contact.id);
    setIsConfirmingDelete(false);
  };
  
  const handleCancel = () => {
    setEditedContact(contact);
    setIsEditing(false);
  };
  
  const getStatusBadgeStyle = (status: ContactStatus) => {
    switch (status) {
      case "lead":
        return "bg-yellow-100 hover:bg-yellow-200 text-yellow-800";
      case "prospect":
        return "bg-blue-100 hover:bg-blue-200 text-blue-800";
      case "customer":
        return "bg-green-100 hover:bg-green-200 text-green-800";
      case "inactive":
        return "bg-gray-100 hover:bg-gray-200 text-gray-800";
      default:
        return "";
    }
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-xl">{contact.name}</CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className={getStatusBadgeStyle(contact.status)}>
                {contact.status}
              </Badge>
              <span className="text-sm text-muted-foreground">{contact.position} at {contact.company}</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Dialog open={isConfirmingDelete} onOpenChange={setIsConfirmingDelete}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Contact</DialogTitle>
                </DialogHeader>
                <p>Are you sure you want to delete this contact? This action cannot be undone.</p>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsConfirmingDelete(false)}>Cancel</Button>
                  <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      
      <Separator />
      
      <CardContent className="pt-6">
        {isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={editedContact.name} 
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={editedContact.email} 
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  value={editedContact.phone} 
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input 
                  id="company" 
                  name="company" 
                  value={editedContact.company} 
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input 
                  id="position" 
                  name="position" 
                  value={editedContact.position} 
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={editedContact.status} 
                  onValueChange={handleStatusChange}
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
              <div className="space-y-2">
                <Label htmlFor="lastContact">Last Contact Date</Label>
                <Input 
                  id="lastContact" 
                  name="lastContact" 
                  type="date" 
                  value={editedContact.lastContact} 
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profileImage">Profile Image URL</Label>
                <Input 
                  id="profileImage" 
                  name="profileImage" 
                  value={editedContact.profileImage || ""} 
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea 
                id="notes" 
                name="notes" 
                value={editedContact.notes} 
                onChange={handleInputChange}
                rows={4}
              />
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={handleCancel}>Cancel</Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
              {contact.profileImage ? (
                <div className="h-24 w-24 rounded-lg overflow-hidden mb-4 sm:mb-0">
                  <img 
                    src={contact.profileImage} 
                    alt={contact.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-24 w-24 rounded-lg bg-muted flex items-center justify-center mb-4 sm:mb-0">
                  <User className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
              
              <div className="space-y-3 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${contact.email}`} className="text-sm hover:underline">
                      {contact.email}
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href={`tel:${contact.phone}`} className="text-sm hover:underline">
                      {contact.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{contact.company}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Last contacted: {formattedDate}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Notes</h3>
              <div className="bg-muted/30 p-3 rounded-md text-sm">
                {contact.notes || "No notes available"}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Recent Activity</h3>
              <div className="bg-muted/30 p-3 rounded-md text-sm text-center text-muted-foreground">
                Activity tracking coming soon
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactDetails;
