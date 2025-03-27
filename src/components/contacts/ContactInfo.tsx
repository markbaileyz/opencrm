
import React from "react";
import { Contact } from "@/types/contact";
import { Mail, Phone, Building, Briefcase, Calendar, User } from "lucide-react";
import ContactStatusBadge from "./ContactStatusBadge";
import ContactPriorityBadge from "./ContactPriorityBadge";
import ContactTags from "./ContactTags";
import { Label } from "@/components/ui/label";

interface ContactInfoProps {
  contact: Contact;
}

const ContactInfo = ({ contact }: ContactInfoProps) => {
  return (
    <>
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
    </>
  );
};

export default ContactInfo;
