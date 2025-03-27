
import React, { useState } from 'react';
import { Contact } from "@/types/contact";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  UserPlus, 
  Filter, 
  ArrowUpDown,
  Calendar,
  CircleDot,
  ArrowDown,
  ArrowUp
} from "lucide-react";
import ContactStatusBadge from "./ContactStatusBadge";
import ContactPriorityBadge from "./ContactPriorityBadge";
import { Badge } from "@/components/ui/badge";
import { Tooltip } from "../ui/tooltip";

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

  // Simple helper function to check if a date is today
  function isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ArrowUp className="h-3 w-3 ml-1" /> : <ArrowDown className="h-3 w-3 ml-1" />;
  };

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
            
            {overdueCount > 0 && (
              <Tooltip content={`${overdueCount} overdue follow-ups`}>
                <Badge variant="destructive" className="flex items-center gap-1 ml-2">
                  <Calendar className="h-3 w-3" />
                  <span>{overdueCount}</span>
                </Badge>
              </Tooltip>
            )}
            
            {dueTodayCount > 0 && (
              <Tooltip content={`${dueTodayCount} follow-ups due today`}>
                <Badge variant="warning" className="flex items-center gap-1 ml-2">
                  <Calendar className="h-3 w-3" />
                  <span>{dueTodayCount}</span>
                </Badge>
              </Tooltip>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              className="pl-8"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          
          {showFilters && (
            <div className="bg-muted/40 p-2 rounded-md space-y-2 mt-2">
              <div>
                <p className="text-xs font-medium mb-1">Status</p>
                <div className="flex flex-wrap gap-1">
                  <Badge 
                    variant={statusFilter.includes('lead') ? "default" : "outline"} 
                    className="cursor-pointer" 
                    onClick={() => toggleStatusFilter('lead')}
                  >
                    Lead
                  </Badge>
                  <Badge 
                    variant={statusFilter.includes('prospect') ? "default" : "outline"} 
                    className="cursor-pointer" 
                    onClick={() => toggleStatusFilter('prospect')}
                  >
                    Prospect
                  </Badge>
                  <Badge 
                    variant={statusFilter.includes('customer') ? "default" : "outline"} 
                    className="cursor-pointer" 
                    onClick={() => toggleStatusFilter('customer')}
                  >
                    Customer
                  </Badge>
                  <Badge 
                    variant={statusFilter.includes('inactive') ? "default" : "outline"} 
                    className="cursor-pointer" 
                    onClick={() => toggleStatusFilter('inactive')}
                  >
                    Inactive
                  </Badge>
                </div>
              </div>
              
              <div>
                <p className="text-xs font-medium mb-1">Priority</p>
                <div className="flex flex-wrap gap-1">
                  <Badge 
                    variant={priorityFilter.includes('high') ? "default" : "outline"} 
                    className="cursor-pointer" 
                    onClick={() => togglePriorityFilter('high')}
                  >
                    High
                  </Badge>
                  <Badge 
                    variant={priorityFilter.includes('medium') ? "default" : "outline"} 
                    className="cursor-pointer" 
                    onClick={() => togglePriorityFilter('medium')}
                  >
                    Medium
                  </Badge>
                  <Badge 
                    variant={priorityFilter.includes('low') ? "default" : "outline"} 
                    className="cursor-pointer" 
                    onClick={() => togglePriorityFilter('low')}
                  >
                    Low
                  </Badge>
                </div>
              </div>
            </div>
          )}
          
          <div className="border rounded-md mt-2">
            <div className="flex justify-between border-b bg-muted/50 p-2 text-xs font-medium">
              <button 
                className="flex items-center hover:text-primary" 
                onClick={() => handleSort('name')}
                aria-label="Sort by name"
              >
                Name {getSortIcon('name')}
              </button>
              <div className="flex space-x-2">
                <button 
                  className="flex items-center hover:text-primary" 
                  onClick={() => handleSort('status')}
                  aria-label="Sort by status"
                >
                  Status {getSortIcon('status')}
                </button>
                <button 
                  className="flex items-center hover:text-primary" 
                  onClick={() => handleSort('priority')}
                  aria-label="Sort by priority"
                >
                  Priority {getSortIcon('priority')}
                </button>
                <button 
                  className="flex items-center hover:text-primary" 
                  onClick={() => handleSort('lastContact')}
                  aria-label="Sort by last contact"
                >
                  Last Contact {getSortIcon('lastContact')}
                </button>
              </div>
            </div>
            
            <div className="max-h-[500px] overflow-y-auto">
              {filteredAndSortedContacts.length > 0 ? (
                filteredAndSortedContacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => onSelectContact(contact)}
                    className={`w-full flex items-center justify-between p-2 hover:bg-muted/50 text-left border-b last:border-b-0 ${
                      selectedContactId === contact.id ? 'bg-primary/10' : ''
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
