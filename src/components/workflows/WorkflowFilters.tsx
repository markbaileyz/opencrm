
import React, { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WorkflowStatus } from "@/types/workflow";

interface WorkflowFiltersProps {
  onSearchChange: (search: string) => void;
  onStatusFilterChange: (statuses: WorkflowStatus[]) => void;
  onReset: () => void;
  searchValue: string;
  selectedStatuses: WorkflowStatus[];
  disabled?: boolean; // Added disabled prop
}

const WorkflowFilters: React.FC<WorkflowFiltersProps> = ({
  onSearchChange,
  onStatusFilterChange,
  onReset,
  searchValue,
  selectedStatuses,
  disabled = false // Default to false
}) => {
  const [search, setSearch] = useState(searchValue);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearchChange(value);
  };

  const handleStatusToggle = (status: WorkflowStatus) => {
    let newSelectedStatuses: WorkflowStatus[];
    
    if (selectedStatuses.includes(status)) {
      newSelectedStatuses = selectedStatuses.filter(s => s !== status);
    } else {
      newSelectedStatuses = [...selectedStatuses, status];
    }
    
    onStatusFilterChange(newSelectedStatuses);
  };

  const handleReset = () => {
    setSearch("");
    onReset();
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-grow">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search workflows..."
          className="pl-8"
          value={search}
          onChange={handleSearch}
          disabled={disabled} // Apply disabled prop to input
        />
      </div>
      
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2" disabled={disabled}>
              <Filter className="h-4 w-4" />
              <span>Filter</span>
              {selectedStatuses.length > 0 && (
                <span className="ml-1 rounded-full bg-primary w-5 h-5 text-[10px] flex items-center justify-center text-primary-foreground">
                  {selectedStatuses.length}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={selectedStatuses.includes("active")}
              onCheckedChange={() => handleStatusToggle("active")}
            >
              Active
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedStatuses.includes("paused")}
              onCheckedChange={() => handleStatusToggle("paused")}
            >
              Paused
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedStatuses.includes("draft")}
              onCheckedChange={() => handleStatusToggle("draft")}
            >
              Draft
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedStatuses.includes("error")}
              onCheckedChange={() => handleStatusToggle("error")}
            >
              Error
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {(search || selectedStatuses.length > 0) && (
          <Button variant="ghost" onClick={handleReset} disabled={disabled}>
            Reset
          </Button>
        )}
      </div>
    </div>
  );
};

export default WorkflowFilters;
