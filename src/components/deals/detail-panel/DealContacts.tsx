
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Mail } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  position: string;
}

interface DealContactsProps {
  contacts?: Contact[];
}

const DealContacts: React.FC<DealContactsProps> = ({ contacts }) => {
  return (
    <div className="space-y-4">
      {contacts && contacts.length > 0 ? (
        contacts.map((contact) => (
          <div key={contact.id} className="flex items-center gap-3 p-3 border rounded-md">
            <Avatar>
              <div className="bg-primary text-white h-full w-full flex items-center justify-center font-medium">
                {contact.name.charAt(0)}
              </div>
            </Avatar>
            <div className="flex-1">
              <div className="font-medium">{contact.name}</div>
              <div className="text-sm text-muted-foreground">{contact.position}</div>
              <div className="flex gap-4 mt-1">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Mail className="h-3 w-3 mr-1" />
                  <span>{contact.email}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-6 text-muted-foreground">
          <p>No contacts associated with this deal</p>
        </div>
      )}
    </div>
  );
};

export default DealContacts;
