
import { useState, useEffect } from "react";
import { Contact, ContactActivity, FollowUp } from "@/types/contact";
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
    ],
    followUp: {
      id: "f1",
      contactId: "1",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
      description: "Follow up on proposal and pricing discussion",
      status: "pending",
      priority: "high"
    }
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
    activities: [],
    followUp: {
      id: "f2",
      contactId: "3",
      dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days ago (overdue)
      description: "Schedule demo of new marketing features",
      status: "pending",
      priority: "medium"
    }
  },
];

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    search: "",
    status: [] as string[],
    priority: [] as string[]
  });

  // Get selected contact
  const selectedContact = contacts.find(c => c.id === selectedContactId) || null;

  // Filter contacts based on search, status, and priority
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = filters.search === "" || 
      contact.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      contact.email.toLowerCase().includes(filters.search.toLowerCase()) ||
      contact.company.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesStatus = filters.status.length === 0 || 
      filters.status.includes(contact.status);
    
    const matchesPriority = filters.priority.length === 0 || 
      (contact.priority && filters.priority.includes(contact.priority));
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Add a new contact
  const addContact = (contactData: Omit<Contact, "id" | "activities">) => {
    const newContact: Contact = {
      ...contactData,
      id: uuidv4(),
      activities: [],
      lastContact: new Date().toISOString().split('T')[0]
    };
    
    setContacts([...contacts, newContact]);
    setSelectedContactId(newContact.id);
    return newContact;
  };

  // Update an existing contact
  const updateContact = (updatedContact: Contact) => {
    setContacts(
      contacts.map(contact => 
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
    return updatedContact;
  };

  // Delete a contact
  const deleteContact = (contactId: string) => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
    if (selectedContactId === contactId) {
      setSelectedContactId(null);
    }
  };

  // Add an activity to a contact
  const addActivity = (contactId: string, type: ContactActivity["type"], description: string) => {
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
    
    // Return the updated contact
    return updatedContacts.find(c => c.id === contactId);
  };

  // Filter contacts
  const filterContacts = (search: string, status: string[], priority: string[]) => {
    setFilters({
      search,
      status,
      priority
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      search: "",
      status: [],
      priority: []
    });
  };

  return {
    contacts,
    selectedContact,
    isLoading,
    filteredContacts,
    setSelectedContactId,
    addContact,
    updateContact,
    deleteContact,
    addActivity,
    filterContacts,
    clearFilters
  };
};
