
import React from 'react';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

interface ContactsFilterProps {
  filter: string;
  setFilter: (filter: string) => void;
  statusFilter: string[];
  toggleStatusFilter: (status: string) => void;
  priorityFilter: string[];
  togglePriorityFilter: (priority: string) => void;
  showFilters: boolean;
}

const ContactsFilter = ({
  filter,
  setFilter,
  statusFilter,
  toggleStatusFilter,
  priorityFilter,
  togglePriorityFilter,
  showFilters
}: ContactsFilterProps) => {
  return (
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
    </div>
  );
};

export default ContactsFilter;
