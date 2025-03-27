
import React, { useState } from "react";
import { Contact } from "@/types/contact";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, User, Filter, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import ContactStatusBadge from "./ContactStatusBadge";
import ContactPriorityBadge from "./ContactPriorityBadge";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { isPast, isToday } from "date-fns";

interface ContactsListProps {
  contacts: Contact[];
  selectedContactId?: string;
  onSelectContact: (contact: Contact) => void;
}

const ContactsList = ({ contacts, selectedContactId, onSelectContact }: ContactsListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilters, setStatusFilters] = useState<Contact["status"][]>([]);
  const [priorityFilters, setPriorityFilters] = useState<Contact["priority"][]>([]);
  const [followUpFilters, setFollowUpFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"name" | "lastContact" | "company" | "followUp">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  
  const toggleStatusFilter = (status: Contact["status"]) => {
    setStatusFilters(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };
  
  const togglePriorityFilter = (priority: Contact["priority"]) => {
    if (!priority) return;
    setPriorityFilters(prev => 
      prev.includes(priority) 
        ? prev.filter(p => p !== priority)
        : [...prev, priority]
    );
  };

  const toggleFollowUpFilter = (filter: string) => {
    setFollowUpFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };
  
  const filteredContacts = contacts.filter((contact) => {
    // Text search filter
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (contact.tags && contact.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    
    // Status filter
    const matchesStatus = statusFilters.length === 0 || statusFilters.includes(contact.status);
    
    // Priority filter
    const matchesPriority = priorityFilters.length === 0 || 
      (contact.priority && priorityFilters.includes(contact.priority));
    
    // Follow-up filter
    const matchesFollowUp = followUpFilters.length === 0 || 
      (followUpFilters.includes("none") && !contact.followUp) ||
      (followUpFilters.includes("pending") && contact.followUp && contact.followUp.status === "pending") ||
      (followUpFilters.includes("completed") && contact.followUp && contact.followUp.status === "completed") ||
      (followUpFilters.includes("overdue") && contact.followUp && contact.followUp.status === "pending" && 
        isPast(new Date(contact.followUp.dueDate)) && !isToday(new Date(contact.followUp.dueDate)));
    
    return matchesSearch && matchesStatus && matchesPriority && matchesFollowUp;
  });
  
  // Sort contacts
  const sortedContacts = [...filteredContacts].sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === "name") {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === "lastContact") {
      comparison = new Date(a.lastContact).getTime() - new Date(b.lastContact).getTime();
    } else if (sortBy === "company") {
      comparison = a.company.localeCompare(b.company);
    } else if (sortBy === "followUp") {
      // Sort by follow-up due date (contacts with follow-ups first, then by due date)
      const aHasFollowUp = !!a.followUp && a.followUp.status === "pending";
      const bHasFollowUp = !!b.followUp && b.followUp.status === "pending";
      
      if (aHasFollowUp && !bHasFollowUp) return -1;
      if (!aHasFollowUp && bHasFollowUp) return 1;
      
      if (aHasFollowUp && bHasFollowUp) {
        return new Date(a.followUp!.dueDate).getTime() - new Date(b.followUp!.dueDate).getTime();
      }
      
      return 0;
    }
    
    return sortDirection === "asc" ? comparison : -comparison;
  });
  
  const handleResetFilters = () => {
    setStatusFilters([]);
    setPriorityFilters([]);
    setFollowUpFilters([]);
    setSortBy("name");
    setSortDirection("asc");
  };

  const activeFilterCount = statusFilters.length + priorityFilters.length + followUpFilters.length + 
    (sortBy !== "name" || sortDirection !== "asc" ? 1 : 0);

  // Helper function to determine follow-up status indicator
  const getFollowUpIndicator = (contact: Contact) => {
    if (!contact.followUp) return null;
    
    const dueDate = new Date(contact.followUp.dueDate);
    const isOverdue = isPast(dueDate) && !isToday(dueDate) && contact.followUp.status === "pending";
    const isDueToday = isToday(dueDate) && contact.followUp.status === "pending";
    const isCompleted = contact.followUp.status === "completed";
    
    if (isOverdue) {
      return <Bell className="h-4 w-4 text-red-500" title="Overdue follow-up" />;
    } else if (isDueToday) {
      return <Bell className="h-4 w-4 text-yellow-500" title="Follow-up due today" />;
    } else if (isCompleted) {
      return <Bell className="h-4 w-4 text-green-500" title="Completed follow-up" />;
    } else {
      return <Bell className="h-4 w-4 text-blue-500" title="Pending follow-up" />;
    }
  };
  
  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Popover open={showFilters} onOpenChange={setShowFilters}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                className={activeFilterCount > 0 ? "relative" : ""}
              >
                <Filter className="h-4 w-4" />
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] flex items-center justify-center text-primary-foreground">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <div className="space-y-4">
                <h4 className="font-medium text-sm">Filter Contacts</h4>
                
                <div className="space-y-2">
                  <h5 className="text-xs text-muted-foreground">Status</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {["lead", "prospect", "customer", "inactive"].map((status) => (
                      <div key={status} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`status-${status}`} 
                          checked={statusFilters.includes(status as Contact["status"])}
                          onCheckedChange={() => toggleStatusFilter(status as Contact["status"])}
                        />
                        <Label 
                          htmlFor={`status-${status}`}
                          className="text-sm capitalize"
                        >
                          {status}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h5 className="text-xs text-muted-foreground">Priority</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {["low", "medium", "high"].map((priority) => (
                      <div key={priority} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`priority-${priority}`} 
                          checked={priorityFilters.includes(priority as Contact["priority"])}
                          onCheckedChange={() => togglePriorityFilter(priority as Contact["priority"])}
                        />
                        <Label 
                          htmlFor={`priority-${priority}`}
                          className="text-sm capitalize"
                        >
                          {priority}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-xs text-muted-foreground">Follow-up</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "none", label: "No follow-up" },
                      { id: "pending", label: "Pending" },
                      { id: "overdue", label: "Overdue" },
                      { id: "completed", label: "Completed" }
                    ].map((followUp) => (
                      <div key={followUp.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`follow-up-${followUp.id}`} 
                          checked={followUpFilters.includes(followUp.id)}
                          onCheckedChange={() => toggleFollowUpFilter(followUp.id)}
                        />
                        <Label 
                          htmlFor={`follow-up-${followUp.id}`}
                          className="text-sm"
                        >
                          {followUp.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h5 className="text-xs text-muted-foreground">Sort By</h5>
                  <div className="flex space-x-2">
                    <Select
                      value={sortBy}
                      onValueChange={(value) => setSortBy(value as any)}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="company">Company</SelectItem>
                        <SelectItem value="lastContact">Last Contact</SelectItem>
                        <SelectItem value="followUp">Follow-up Date</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select
                      value={sortDirection}
                      onValueChange={(value) => setSortDirection(value as "asc" | "desc")}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asc">Asc</SelectItem>
                        <SelectItem value="desc">Desc</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-between pt-2">
                  <Button variant="outline" size="sm" onClick={handleResetFilters}>
                    Reset
                  </Button>
                  <Button size="sm" onClick={() => setShowFilters(false)}>
                    Apply
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2 mt-2 max-h-[calc(100vh-16rem)] overflow-y-auto pr-2">
          {sortedContacts.length > 0 ? (
            sortedContacts.map((contact) => (
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
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{contact.name}</p>
                      {getFollowUpIndicator(contact)}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {contact.company}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <ContactStatusBadge status={contact.status} size="sm" />
                      {contact.priority && (
                        <ContactPriorityBadge priority={contact.priority} size="sm" />
                      )}
                    </div>
                    {contact.tags && contact.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {contact.tags.slice(0, 2).map(tag => (
                          <div key={tag} className="text-xs px-1.5 py-0 bg-secondary text-secondary-foreground rounded-sm">
                            {tag}
                          </div>
                        ))}
                        {contact.tags.length > 2 && (
                          <div className="text-xs text-muted-foreground">
                            +{contact.tags.length - 2} more
                          </div>
                        )}
                      </div>
                    )}
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
