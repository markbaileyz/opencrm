
import React, { useState } from "react";
import { Contact } from "@/types/contact";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactsListProps {
  contacts: Contact[];
  selectedContactId?: string;
  onSelectContact: (contact: Contact) => void;
}

const ContactsList = ({ contacts, selectedContactId, onSelectContact }: ContactsListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search contacts..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="space-y-2 mt-2 max-h-[calc(100vh-16rem)] overflow-y-auto pr-2">
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className={cn(
                  "p-3 rounded-md cursor-pointer transition-colors",
                  selectedContactId === contact.id
                    ? "bg-primary/10 hover:bg-primary/15"
                    : "hover:bg-muted"
                )}
                onClick={() => onSelectContact(contact)}
              >
                <div className="flex items-center space-x-3">
                  {contact.profileImage ? (
                    <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src={contact.profileImage} 
                        alt={contact.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{contact.name}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {contact.company}
                    </p>
                  </div>
                  <div 
                    className={cn(
                      "text-xs px-2 py-0.5 rounded font-medium",
                      contact.status === "lead" && "bg-yellow-100 text-yellow-800",
                      contact.status === "prospect" && "bg-blue-100 text-blue-800",
                      contact.status === "customer" && "bg-green-100 text-green-800",
                      contact.status === "inactive" && "bg-gray-100 text-gray-800"
                    )}
                  >
                    {contact.status}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No contacts found
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactsList;
