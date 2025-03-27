
import React from 'react';
import { Contact } from "@/types/contact";
import ContactListItem from "./ContactListItem";
import ContactSortableHeader from "./ContactSortableHeader";

interface ContactListContainerProps {
  contacts: Contact[];
  selectedContactId?: string;
  onSelectContact: (contact: Contact) => void;
  sortField: 'name' | 'lastContact' | 'priority' | 'status';
  sortDirection: 'asc' | 'desc';
  handleSort: (field: 'name' | 'lastContact' | 'priority' | 'status') => void;
}

const ContactListContainer: React.FC<ContactListContainerProps> = ({
  contacts,
  selectedContactId,
  onSelectContact,
  sortField,
  sortDirection,
  handleSort
}) => {
  return (
    <div className="border rounded-md mt-2">
      <ContactSortableHeader 
        sortField={sortField}
        sortDirection={sortDirection}
        handleSort={handleSort}
      />
      
      <div className="max-h-[500px] overflow-y-auto">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <ContactListItem 
              key={contact.id}
              contact={contact}
              isSelected={selectedContactId === contact.id}
              onSelect={onSelectContact}
            />
          ))
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            No contacts found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactListContainer;
