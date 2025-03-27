
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Plus,
  Search,
  SlidersHorizontal
} from "lucide-react";

const DealFilters = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-end mb-6">
      <div className="relative w-full md:w-1/3">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          type="search" 
          placeholder="Search deals..." 
          className="pl-8"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:w-1/2">
        <Select defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="Deal Stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stages</SelectItem>
            <SelectItem value="lead">Lead</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
            <SelectItem value="proposal">Proposal</SelectItem>
            <SelectItem value="negotiation">Negotiation</SelectItem>
            <SelectItem value="closed-won">Closed Won</SelectItem>
            <SelectItem value="closed-lost">Closed Lost</SelectItem>
          </SelectContent>
        </Select>
        
        <Select defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="Amount" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Amounts</SelectItem>
            <SelectItem value="0-5000">$0 - $5,000</SelectItem>
            <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
            <SelectItem value="10000-25000">$10,000 - $25,000</SelectItem>
            <SelectItem value="25000+">$25,000+</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="outline" size="icon" className="h-10 w-10">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="ml-auto">
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Deal
        </Button>
      </div>
    </div>
  );
};

export default DealFilters;
