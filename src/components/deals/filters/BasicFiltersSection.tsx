
import React from "react";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { DealFiltersState } from "../types/dealFilterTypes";

interface BasicFiltersSectionProps {
  filters: DealFiltersState;
  onFilterChange: (key: string, value: string) => void;
}

const BasicFiltersSection: React.FC<BasicFiltersSectionProps> = ({
  filters,
  onFilterChange
}) => {
  return (
    <>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search deals..."
          className="pl-8"
          value={filters.search}
          onChange={(e) => onFilterChange("search", e.target.value)}
        />
      </div>
      
      <Select 
        value={filters.stage} 
        onValueChange={(value) => onFilterChange("stage", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="All Stages" />
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
        value={filters.value} 
        onValueChange={(value) => onFilterChange("value", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="All Values" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Values</SelectItem>
          <SelectItem value="small">&lt; $10k</SelectItem>
          <SelectItem value="medium">$10k - $50k</SelectItem>
          <SelectItem value="large">$50k - $100k</SelectItem>
          <SelectItem value="xlarge">&gt; $100k</SelectItem>
        </SelectContent>
      </Select>
      
      <Select 
        value={filters.sortBy} 
        onValueChange={(value) => onFilterChange("sortBy", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="oldest">Oldest First</SelectItem>
          <SelectItem value="highest">Highest Value</SelectItem>
          <SelectItem value="lowest">Lowest Value</SelectItem>
          <SelectItem value="probability">Highest Probability</SelectItem>
          <SelectItem value="closing-soon">Closing Soon</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};

export default BasicFiltersSection;
