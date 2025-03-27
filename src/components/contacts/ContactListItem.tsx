
import React from 'react';
import { Contact } from "@/types/contact";
import { UserPlus, CircleDot } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ContactStatusBadge from "./ContactStatusBadge";
import ContactPriorityBadge from "./ContactPriorityBadge";

interface ContactListItemProps {
  contact: Contact;
  isSelected: boolean;
  onSelect: (contact: Contact) => void;
}

const ContactListItem = ({ contact, isSelected, onSelect }: ContactListItemProps) => {
  // Function to check if a date is today
  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  return (
    <button
      onClick={() => onSelect(contact)}
      className={`w-full flex items-center justify-between p-2 hover:bg-muted/50 text-left border-b last:border-b-0 ${
        isSelected ? 'bg-primary/10' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
          {contact.profileImage ? (
            <img src={contact.profileImage} alt={contact.name} className="h-full w-full object-cover" />
          ) : (
            <UserPlus className="h-5 w-5 text-muted-foreground/70" />
          )}
        </div>
        <div className="flex flex-col">
          <span className="font-medium">{contact.name}</span>
          <span className="text-xs text-muted-foreground">{contact.company}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <ContactStatusBadge status={contact.status} size="sm" withLabel={false} />
        
        {contact.priority && (
          <ContactPriorityBadge priority={contact.priority} size="sm" withLabel={false} />
        )}
        
        {contact.followUp && contact.followUp.status === 'pending' && (
          <Badge 
            variant={
              new Date(contact.followUp.dueDate) < new Date() && !isToday(new Date(contact.followUp.dueDate))
                ? "destructive" 
                : isToday(new Date(contact.followUp.dueDate)) 
                  ? "warning" 
                  : "outline"
            }
            className="text-xs h-5 w-5 p-0 flex items-center justify-center"
          >
            <CircleDot className="h-3 w-3" />
          </Badge>
        )}
      </div>
    </button>
  );
};

export default ContactListItem;
