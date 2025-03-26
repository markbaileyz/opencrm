
import React, { useState } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Contact, ContactStatus } from "@/types/contact";

interface CreateContactButtonProps extends Omit<ButtonProps, "onClick"> {
  onCreateContact: (contact: Omit<Contact, "id">) => void;
}

const CreateContactButton = ({ onCreateContact, variant = "default", ...props }: CreateContactButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newContact, setNewContact] = useState<Omit<Contact, "id">>({
    name: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    lastContact: new Date().toISOString().split('T')[0],
    status: "lead",
    notes: "",
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewContact({
      ...newContact,
      [name]: value,
    });
  };
  
  const handleStatusChange = (value: string) => {
    setNewContact({
      ...newContact,
      status: value as ContactStatus,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateContact(newContact);
    
    // Reset form and close dialog
    setNewContact({
      name: "",
      email: "",
      phone: "",
      company: "",
      position: "",
      lastContact: new Date().toISOString().split('T')[0],
      status: "lead",
      notes: "",
    });
    setIsOpen(false);
  };
  
  return (
    <>
      <Button 
        variant={variant} 
        onClick={() => setIsOpen(true)}
        {...props}
      >
        <PlusCircle className="h-4 w-4 mr-2" />
        Add Contact
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Contact</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-name">Name*</Label>
                  <Input 
                    id="new-name" 
                    name="name" 
                    value={newContact.name} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-email">Email*</Label>
                  <Input 
                    id="new-email" 
                    name="email" 
                    type="email" 
                    value={newContact.email} 
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-phone">Phone</Label>
                  <Input 
                    id="new-phone" 
                    name="phone" 
                    value={newContact.phone} 
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-company">Company</Label>
                  <Input 
                    id="new-company" 
                    name="company" 
                    value={newContact.company} 
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-position">Position</Label>
                  <Input 
                    id="new-position" 
                    name="position" 
                    value={newContact.position} 
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-status">Status</Label>
                  <Select 
                    value={newContact.status} 
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger id="new-status">
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
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-lastContact">Last Contact Date</Label>
                  <Input 
                    id="new-lastContact" 
                    name="lastContact" 
                    type="date" 
                    value={newContact.lastContact} 
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-profileImage">Profile Image URL</Label>
                  <Input 
                    id="new-profileImage" 
                    name="profileImage" 
                    value={newContact.profileImage || ""} 
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-notes">Notes</Label>
                <Textarea 
                  id="new-notes" 
                  name="notes" 
                  value={newContact.notes} 
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Contact</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateContactButton;
