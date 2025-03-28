
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar as CalendarIcon, Search, SlidersHorizontal, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CallFiltersProps {
  onSearchChange: (query: string) => void;
  onTypeFilterChange: (types: string[]) => void;
  onDateRangeChange: (range: { from?: Date; to?: Date }) => void;
  onReset: () => void;
  searchQuery: string;
  selectedTypes: string[];
  dateRange: { from?: Date; to?: Date };
}

const CallFilters: React.FC<CallFiltersProps> = ({
  onSearchChange,
  onTypeFilterChange,
  onDateRangeChange,
  onReset,
  searchQuery,
  selectedTypes,
  dateRange,
}) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const callTypes = [
    { value: "incoming", label: "Incoming" },
    { value: "outgoing", label: "Outgoing" },
    { value: "missed", label: "Missed" },
    { value: "scheduled", label: "Scheduled" },
  ];

  const toggleCallType = (type: string) => {
    if (selectedTypes.includes(type)) {
      onTypeFilterChange(selectedTypes.filter(t => t !== type));
    } else {
      onTypeFilterChange([...selectedTypes, type]);
    }
  };

  const handleResetFilters = () => {
    onReset();
    setIsFiltersOpen(false);
  };

  const activeFiltersCount = (selectedTypes.length > 0 ? 1 : 0) + 
    (dateRange.from || dateRange.to ? 1 : 0);

  // Format date for display
  const formatDate = (date?: Date) => {
    return date ? date.toLocaleDateString() : '';
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search calls..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8"
          />
        </div>

        <div className="flex gap-2">
          <Popover open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium">Filter Calls</h4>
                
                <div className="space-y-2">
                  <Label className="text-sm">Call Type</Label>
                  <div className="flex flex-wrap gap-1">
                    {callTypes.map((type) => (
                      <Badge
                        key={type.value}
                        variant={selectedTypes.includes(type.value) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleCallType(type.value)}
                      >
                        {type.label}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label className="text-sm">Date Range</Label>
                  <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from || dateRange.to ? (
                          <span>
                            {formatDate(dateRange.from)} {dateRange.to ? `- ${formatDate(dateRange.to)}` : ''}
                          </span>
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        selected={dateRange}
                        onSelect={(range) => {
                          onDateRangeChange(range || {});
                          if (range?.to) setIsCalendarOpen(false);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex justify-between pt-2">
                  <Button variant="ghost" onClick={handleResetFilters} size="sm">
                    Reset filters
                  </Button>
                  <Button onClick={() => setIsFiltersOpen(false)} size="sm">
                    Apply
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="icon" onClick={onReset}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Active filters display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTypes.length > 0 && (
            <Badge variant="secondary" className="gap-1">
              Types: {selectedTypes.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ')}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onTypeFilterChange([])} 
              />
            </Badge>
          )}
          
          {(dateRange.from || dateRange.to) && (
            <Badge variant="secondary" className="gap-1">
              Dates: {formatDate(dateRange.from)} {dateRange.to ? `- ${formatDate(dateRange.to)}` : ''}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onDateRangeChange({})} 
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default CallFilters;
