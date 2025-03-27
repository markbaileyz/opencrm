
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import ContactsList from "@/components/contacts/ContactsList";
import ContactDetails from "@/components/contacts/ContactDetails";
import CreateContactButton from "@/components/contacts/CreateContactButton";
import ContactImportExport from "@/components/contacts/ContactImportExport";
import { useToast } from "@/hooks/use-toast";
import { Contact, ContactActivity } from "@/types/contact";
import { v4 as uuidv4 } from "uuid";

// Sample data for demonstration
const initialContacts: Contact[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Inc.",
    position: "CEO",
    lastContact: "2023-10-15",
    status: "customer",
    notes: "Met at the industry conference last month",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    tags: ["VIP", "Tech"],
    priority: "high",
    activities: [
      {
        id: "a1",
        contactId: "1",
        type: "meeting",
        date: "2023-10-15T14:30:00",
        description: "Initial consultation about their business needs."
      },
      {
        id: "a2",
        contactId: "1",
        type: "email",
        date: "2023-10-18T09:15:00",
        description: "Sent follow-up email with product information."
      }
    ]
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    company: "Tech Solutions LLC",
    position: "CTO",
    lastContact: "2023-09-28",
    status: "lead",
    notes: "Interested in our enterprise solution",
    profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
    tags: ["Healthcare", "Potential"],
    priority: "medium",
    activities: [
      {
        id: "a3",
        contactId: "2",
        type: "call",
        date: "2023-09-28T11:00:00",
        description: "Discussed their technical requirements."
      }
    ]
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    phone: "+1 (555) 456-7890",
    company: "Global Enterprises",
    position: "Marketing Director",
    lastContact: "2023-10-05",
    status: "prospect",
    notes: "Follow up on marketing campaign proposal",
    profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
    tags: ["Marketing", "Follow-up"],
    priority: "low",
    activities: []
  },
];

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const { toast } = useToast();

  const handleSelectContact = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const handleCreateContact = (newContact: Omit<Contact, "id">) => {
    const contact = {
      ...newContact,
      id: uuidv4(),
      tags: newContact.tags || [],
      activities: []
    };
    
    setContacts([...contacts, contact]);
    setSelectedContact(contact);
    
    toast({
      title: "Contact created",
      description: `${newContact.name} has been added to your contacts.`,
      variant: "success",
    });
  };

  const handleUpdateContact = (updatedContact: Contact) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
    setSelectedContact(updatedContact);
    
    toast({
      title: "Contact updated",
      description: `${updatedContact.name}'s information has been updated.`,
      variant: "success",
    });
  };

  const handleDeleteContact = (contactId: string) => {
    setContacts(contacts.filter((contact) => contact.id !== contactId));
    setSelectedContact(null);
    
    toast({
      title: "Contact deleted",
      description: "The contact has been removed from your list.",
      variant: "destructive",
    });
  };

  const handleAddActivity = (contactId: string, type: ContactActivity["type"], description: string) => {
    const newActivity: ContactActivity = {
      id: uuidv4(),
      contactId,
      type,
      date: new Date().toISOString(),
      description
    };

    const updatedContacts = contacts.map(contact => 
      contact.id === contactId 
        ? { 
            ...contact, 
            activities: [...(contact.activities || []), newActivity],
            lastContact: new Date().toISOString().split('T')[0]
          } 
        : contact
    );

    setContacts(updatedContacts);
    
    // Update selected contact if it's the one we're adding activity to
    if (selectedContact && selectedContact.id === contactId) {
      const updatedContact = updatedContacts.find(c => c.id === contactId);
      if (updatedContact) {
        setSelectedContact(updatedContact);
      }
    }

    toast({
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} logged`,
      description: `Activity has been added to the contact's history.`,
      variant: "success",
    });
  };

  const handleImportContacts = (importedContacts: Partial<Contact>[]) => {
    const newContacts = importedContacts.map(contact => ({
      ...contact,
      id: uuidv4(),
      tags: contact.tags || [],
      activities: [],
      lastContact: contact.lastContact || new Date().toISOString().split('T')[0],
      status: (contact.status as any) || "lead"
    })) as Contact[];

    setContacts([...contacts, ...newContacts]);

    toast({
      title: "Contacts imported",
      description: `Successfully imported ${newContacts.length} contacts.`,
      variant: "success",
    });
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Contacts</h1>
          <CreateContactButton onCreateContact={handleCreateContact} />
        </div>
        
        <ContactImportExport 
          contacts={contacts}
          onImport={handleImportContacts}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ContactsList 
              contacts={contacts} 
              selectedContactId={selectedContact?.id}
              onSelectContact={handleSelectContact}
            />
          </div>
          
          <div className="lg:col-span-2">
            {selectedContact ? (
              <ContactDetails 
                contact={selectedContact}
                onUpdateContact={handleUpdateContact}
                onDeleteContact={handleDeleteContact}
                onAddActivity={(type, description) => 
                  handleAddActivity(selectedContact.id, type, description)
                }
              />
            ) : (
              <div className="bg-muted/40 rounded-lg p-8 h-full flex flex-col items-center justify-center text-center">
                <p className="text-muted-foreground mb-2">Select a contact to view details</p>
                <p className="text-muted-foreground text-sm">or</p>
                <CreateContactButton 
                  onCreateContact={handleCreateContact} 
                  variant="outline"
                  className="mt-4"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Contacts;
