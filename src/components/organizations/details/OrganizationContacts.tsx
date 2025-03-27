
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  User, Mail, Phone, Search, Plus, 
  ArrowDownUp, AlertCircle, UserCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Contact {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  isPrimary: boolean;
  lastActivity?: string;
}

interface OrganizationContactsProps {
  organizationId: string;
}

const OrganizationContacts: React.FC<OrganizationContactsProps> = ({ organizationId }) => {
  // Mock contacts data - in a real app this would come from an API
  const contacts: Contact[] = [
    {
      id: "1",
      name: "John Smith",
      title: "Chief Technology Officer",
      email: "john.smith@example.com",
      phone: "(555) 123-4567",
      isPrimary: true,
      lastActivity: "2024-05-02T10:30:00"
    },
    {
      id: "2",
      name: "Sarah Williams",
      title: "VP of Operations",
      email: "sarah.williams@example.com",
      phone: "(555) 987-6543",
      isPrimary: false,
      lastActivity: "2024-04-28T14:15:00"
    },
    {
      id: "3",
      name: "Mark Davis",
      title: "Procurement Manager",
      email: "mark.davis@example.com",
      phone: "(555) 555-1234",
      isPrimary: false,
      lastActivity: "2024-04-20T09:00:00"
    },
    {
      id: "4",
      name: "Jennifer Lee",
      title: "IT Director",
      email: "jennifer.lee@example.com",
      phone: "(555) 222-3333",
      isPrimary: false,
      lastActivity: "2024-04-15T11:45:00"
    }
  ];

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Never";
    
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input 
            placeholder="Search contacts..." 
            className="max-w-sm"
            icon={<Search className="h-4 w-4" />}
          />
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="gap-1">
            <ArrowDownUp className="h-3.5 w-3.5" />
            <span>Sort</span>
          </Button>
          <Button size="sm" className="gap-1">
            <Plus className="h-3.5 w-3.5" />
            <span>Add Contact</span>
          </Button>
        </div>
      </div>
      
      {contacts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {contacts.map(contact => (
            <Card key={contact.id} className="hover:bg-muted/40 transition-colors">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={contact.avatarUrl} alt={contact.name} />
                    <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium flex items-center gap-1">
                        {contact.name}
                        {contact.isPrimary && (
                          <Badge variant="outline" className="text-xs font-normal bg-primary/10 ml-2">
                            Primary
                          </Badge>
                        )}
                      </h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{contact.title}</p>
                    <div className="text-sm flex items-center gap-1 pt-1">
                      <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                      <a href={`mailto:${contact.email}`} className="text-primary hover:underline">{contact.email}</a>
                    </div>
                    <div className="text-sm flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                      <a href={`tel:${contact.phone}`} className="hover:underline">{contact.phone}</a>
                    </div>
                    {contact.lastActivity && (
                      <div className="text-xs text-muted-foreground mt-2">
                        Last activity: {formatDate(contact.lastActivity)}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border rounded-md">
          <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="font-medium">No contacts found</p>
          <p className="text-sm text-muted-foreground mt-1">
            Add contacts to this organization
          </p>
          <Button variant="outline" className="mt-4 gap-1">
            <UserCircle className="h-4 w-4" />
            <span>Add First Contact</span>
          </Button>
        </div>
      )}
      
      {contacts.length > 0 && (
        <div className="flex justify-between items-center text-sm text-muted-foreground pt-2">
          <span>Showing {contacts.length} contacts</span>
          {contacts.length >= 4 && (
            <Button variant="link" size="sm" className="gap-1 h-8 p-0">
              View All Contacts
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default OrganizationContacts;
