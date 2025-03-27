
import React, { useState } from 'react';
import { Contact } from "@/types/contact";
import ContactListItem from "./ContactListItem";
import ContactSortableHeader from "./ContactSortableHeader";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 10;
  
  // Calculate pagination
  const totalPages = Math.ceil(contacts.length / contactsPerPage);
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="border rounded-md mt-2">
      <ContactSortableHeader 
        sortField={sortField}
        sortDirection={sortDirection}
        handleSort={handleSort}
      />
      
      <div className="max-h-[500px] overflow-y-auto">
        {contacts.length > 0 ? (
          currentContacts.map((contact) => (
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
      
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2 py-2 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ContactListContainer;
