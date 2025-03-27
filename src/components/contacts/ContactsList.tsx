
import React, { useState } from 'react';
import { Contact } from "@/types/contact";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Tooltip } from "../ui/tooltip";
import ContactsFilter from "./ContactsFilter";
import ContactListItem from "./ContactListItem";
import ContactSortableHeader from "./ContactSortableHeader";
import ContactFollowUpIndicator from "./ContactFollowUpIndicator";

interface ContactsListProps {
  contacts: Contact[];
  selectedContactId?: string;
  onSelectContact: (contact: Contact) => void;
  className?: string;
}

type SortField = 'name' | 'lastContact' | 'priority' | 'status';
type SortDirection = 'asc' | 'desc';

const ContactsList = ({ 
  contacts, 
  selectedContactId, 
  onSelectContact,
  className 
}: ContactsListProps) => {
  const [filter, setFilter] = useState("");
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const toggleStatusFilter = (status: string) => {
    if (statusFilter.includes(status)) {
      setStatusFilter(statusFilter.filter(s => s !== status));
    } else {
      setStatusFilter([...statusFilter, status]);
    }
  };

  const togglePriorityFilter = (priority: string) => {
    if (priorityFilter.includes(priority)) {
      setPriorityFilter(priorityFilter.filter(p => p !== priority));
    } else {
      setPriorityFilter([...priorityFilter, priority]);
    }
  };
  
  // Filter and sort contacts
  const filteredAndSortedContacts = contacts
    .filter(contact => {
      // Apply text filter
      const matchesText = filter === "" || 
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.email.toLowerCase().includes(filter.toLowerCase()) ||
        contact.company.toLowerCase().includes(filter.toLowerCase());
      
      // Apply status filter
      const matchesStatus = statusFilter.length === 0 || 
        statusFilter.includes(contact.status);
      
      // Apply priority filter
      const matchesPriority = priorityFilter.length === 0 || 
        (contact.priority && priorityFilter.includes(contact.priority));
      
      return matchesText && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      if (sortField === 'name') {
        return sortDirection === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortField === 'lastContact') {
        return sortDirection === 'asc'
          ? new Date(a.lastContact).getTime() - new Date(b.lastContact).getTime()
          : new Date(b.lastContact).getTime() - new Date(a.lastContact).getTime();
      } else if (sortField === 'priority') {
        const priorityValue = { 'high': 3, 'medium': 2, 'low': 1, undefined: 0 };
        return sortDirection === 'asc'
          ? (priorityValue[a.priority || 'low'] || 0) - (priorityValue[b.priority || 'low'] || 0)
          : (priorityValue[b.priority || 'low'] || 0) - (priorityValue[a.priority || 'low'] || 0);
      } else if (sortField === 'status') {
        const statusValue = { 'customer': 4, 'prospect': 3, 'lead': 2, 'inactive': 1 };
        return sortDirection === 'asc'
          ? statusValue[a.status] - statusValue[b.status]
          : statusValue[b.status] - statusValue[a.status];
      }
      return 0;
    });

  // Simple helper function to check if a date is today
  function isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  }

  // Calculate counts for follow-ups
  const overdueCount = contacts.filter(c => 
    c.followUp && 
    c.followUp.status === 'pending' && 
    new Date(c.followUp.dueDate) < new Date() && 
    !isToday(new Date(c.followUp.dueDate))
  ).length;

  const dueTodayCount = contacts.filter(c => 
    c.followUp && 
    c.followUp.status === 'pending' && 
    isToday(new Date(c.followUp.dueDate))
  ).length;

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Contacts</CardTitle>
          <div className="flex space-x-2">
            <Tooltip content="Filter contacts">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowFilters(!showFilters)}
                aria-label="Filter contacts"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </Tooltip>
            
            <ContactFollowUpIndicator 
              overdueCount={overdueCount} 
              dueTodayCount={dueTodayCount} 
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <ContactsFilter 
            filter={filter}
            setFilter={setFilter}
            statusFilter={statusFilter}
            toggleStatusFilter={toggleStatusFilter}
            priorityFilter={priorityFilter}
            togglePriorityFilter={togglePriorityFilter}
            showFilters={showFilters}
          />
          
          <div className="border rounded-md mt-2">
            <ContactSortableHeader 
              sortField={sortField}
              sortDirection={sortDirection}
              handleSort={handleSort}
            />
            
            <div className="max-h-[500px] overflow-y-auto">
              {filteredAndSortedContacts.length > 0 ? (
                filteredAndSortedContacts.map((contact) => (
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
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactsList;
