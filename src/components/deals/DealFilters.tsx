
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, FilterX } from "lucide-react";

export interface DealFiltersProps {
  filters: {
    search: string;
    stage: string;
    value: string;
    sortBy: string;
  };
  onFilterChange: (filters: any) => void;
}

const DealFilters: React.FC<DealFiltersProps> = ({ 
  filters = { search: "", stage: "", value: "", sortBy: "newest" },
  onFilterChange = () => {}
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (key: string, value: string) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleResetFilters = () => {
    const resetFilters = { search: "", stage: "", value: "", sortBy: "newest" };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search deals..."
              className="pl-8"
              value={localFilters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>
          
          <Select 
            value={localFilters.stage} 
            onValueChange={(value) => handleFilterChange("stage", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Stages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Stages</SelectItem>
              <SelectItem value="lead">Lead</SelectItem>
              <SelectItem value="qualification">Qualification</SelectItem>
              <SelectItem value="proposal">Proposal</SelectItem>
              <SelectItem value="negotiation">Negotiation</SelectItem>
              <SelectItem value="closed-won">Closed Won</SelectItem>
              <SelectItem value="closed-lost">Closed Lost</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={localFilters.value} 
            onValueChange={(value) => handleFilterChange("value", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Values" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Values</SelectItem>
              <SelectItem value="small">< $10k</SelectItem>
              <SelectItem value="medium">$10k - $50k</SelectItem>
              <SelectItem value="large">$50k - $100k</SelectItem>
              <SelectItem value="xlarge">> $100k</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={localFilters.sortBy} 
            onValueChange={(value) => handleFilterChange("sortBy", value)}
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
            </SelectContent>
          </Select>
          
          <div className="md:col-span-4 flex justify-end">
            <Button variant="outline" size="sm" onClick={handleResetFilters} className="gap-1">
              <FilterX className="h-4 w-4" />
              Reset Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DealFilters;
