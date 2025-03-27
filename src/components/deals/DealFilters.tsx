
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";

export interface DealFiltersState {
  search: string;
  stage: string;
  organization: string;
  closeDate: string;
  value: string;
}

interface DealFiltersProps {
  filters: DealFiltersState;
  onFilterChange: (filters: Partial<DealFiltersState>) => void;
}

const DealFilters: React.FC<DealFiltersProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-muted/30 rounded-lg p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search deals..." 
            className="pl-9"
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 flex-1">
          <Select 
            value={filters.stage} 
            onValueChange={(value) => onFilterChange({ stage: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Deal Stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stages</SelectItem>
              <SelectItem value="lead">Lead</SelectItem>
              <SelectItem value="qualification">Qualification</SelectItem>
              <SelectItem value="proposal">Proposal</SelectItem>
              <SelectItem value="negotiation">Negotiation</SelectItem>
              <SelectItem value="closed-won">Closed Won</SelectItem>
              <SelectItem value="closed-lost">Closed Lost</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={filters.organization} 
            onValueChange={(value) => onFilterChange({ organization: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Organization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Organizations</SelectItem>
              <SelectItem value="1">Acme Corp</SelectItem>
              <SelectItem value="2">Globex</SelectItem>
              <SelectItem value="3">Initech</SelectItem>
              <SelectItem value="4">Massive Dynamic</SelectItem>
              <SelectItem value="5">Umbrella Corp</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={filters.closeDate} 
            onValueChange={(value) => onFilterChange({ closeDate: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Close Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dates</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="next-month">Next Month</SelectItem>
              <SelectItem value="this-quarter">This Quarter</SelectItem>
              <SelectItem value="next-quarter">Next Quarter</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={filters.value} 
            onValueChange={(value) => onFilterChange({ value: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Value" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Values</SelectItem>
              <SelectItem value="low">&lt; $10,000</SelectItem>
              <SelectItem value="medium">$10,000 - $50,000</SelectItem>
              <SelectItem value="high">$50,000 - $100,000</SelectItem>
              <SelectItem value="very-high">&gt; $100,000</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button variant="outline" className="flex-shrink-0">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>
    </div>
  );
};

export default DealFilters;
