
import React from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { DealFiltersState } from "../types/dealFilterTypes";

interface AdvancedFiltersSectionProps {
  filters: DealFiltersState;
  onFilterChange: (key: string, value: string) => void;
}

const AdvancedFiltersSection: React.FC<AdvancedFiltersSectionProps> = ({
  filters,
  onFilterChange
}) => {
  return (
    <div className="md:col-span-4 grid md:grid-cols-3 gap-4 mt-2 border-t pt-4">
      <div>
        <Select
          value={filters.organization}
          onValueChange={(value) => onFilterChange("organization", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Organizations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Organizations</SelectItem>
            <SelectItem value="org1">Acme Corporation</SelectItem>
            <SelectItem value="org2">Globex Industries</SelectItem>
            <SelectItem value="org3">Initech</SelectItem>
            <SelectItem value="org4">Umbrella Corp</SelectItem>
            <SelectItem value="org5">Stark Industries</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Select
          value={filters.closeDate}
          onValueChange={(value) => onFilterChange("closeDate", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Closing Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Time</SelectItem>
            <SelectItem value="this-week">This Week</SelectItem>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="next-month">Next Month</SelectItem>
            <SelectItem value="this-quarter">This Quarter</SelectItem>
            <SelectItem value="next-quarter">Next Quarter</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Select
          value={filters.probability}
          onValueChange={(value) => onFilterChange("probability", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Win Probability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Probability</SelectItem>
            <SelectItem value="low">Low (&lt; 25%)</SelectItem>
            <SelectItem value="medium">Medium (25% - 75%)</SelectItem>
            <SelectItem value="high">High (&gt; 75%)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AdvancedFiltersSection;
