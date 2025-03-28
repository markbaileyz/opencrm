
import React, { useState } from "react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Filter, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface CallFiltersState {
  search: string;
  dateRange: {
    from?: Date;
    to?: Date;
  };
  callTypes: string[];
  minDuration?: number;
  maxDuration?: number;
  tags: string[];
  hasFollowUp?: boolean;
}

interface CallAdvancedFiltersProps {
  filters: CallFiltersState;
  onFiltersChange: (filters: CallFiltersState) => void;
  availableTags: string[];
}

const CallAdvancedFilters: React.FC<CallAdvancedFiltersProps> = ({
  filters,
  onFiltersChange,
  availableTags,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<CallFiltersState>(filters);
  
  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    setIsOpen(false);
  };
  
  const handleReset = () => {
    const resetFilters: CallFiltersState = {
      search: "",
      dateRange: {},
      callTypes: [],
      tags: [],
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };
  
  const updateFilter = <K extends keyof CallFiltersState>(
    key: K,
    value: CallFiltersState[K]
  ) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  
  const toggleCallType = (type: string) => {
    if (localFilters.callTypes.includes(type)) {
      updateFilter(
        "callTypes",
        localFilters.callTypes.filter((t) => t !== type)
      );
    } else {
      updateFilter("callTypes", [...localFilters.callTypes, type]);
    }
  };
  
  const toggleTag = (tag: string) => {
    if (localFilters.tags.includes(tag)) {
      updateFilter(
        "tags",
        localFilters.tags.filter((t) => t !== tag)
      );
    } else {
      updateFilter("tags", [...localFilters.tags, tag]);
    }
  };
  
  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters.search) count++;
    if (localFilters.dateRange.from || localFilters.dateRange.to) count++;
    if (localFilters.callTypes.length) count++;
    if (localFilters.tags.length) count++;
    if (localFilters.minDuration || localFilters.maxDuration) count++;
    if (localFilters.hasFollowUp !== undefined) count++;
    return count;
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Filter className="h-3.5 w-3.5" />
          <span>Filter</span>
          {getActiveFilterCount() > 0 && (
            <Badge 
              variant="secondary" 
              className="ml-1 h-5 px-1.5 text-xs font-semibold"
            >
              {getActiveFilterCount()}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[320px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Filter Calls</SheetTitle>
        </SheetHeader>
        
        <div className="py-6 space-y-6">
          <div className="space-y-3">
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Search by name, notes, or purpose..."
              value={localFilters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="space-y-3">
            <Label>Date Range</Label>
            <div className="flex flex-col sm:flex-row gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal flex-1",
                      !localFilters.dateRange.from && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {localFilters.dateRange.from ? (
                      format(localFilters.dateRange.from, "PPP")
                    ) : (
                      <span>From date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={localFilters.dateRange.from}
                    onSelect={(date) =>
                      updateFilter("dateRange", {
                        ...localFilters.dateRange,
                        from: date,
                      })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal flex-1",
                      !localFilters.dateRange.to && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {localFilters.dateRange.to ? (
                      format(localFilters.dateRange.to, "PPP")
                    ) : (
                      <span>To date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={localFilters.dateRange.to}
                    onSelect={(date) =>
                      updateFilter("dateRange", {
                        ...localFilters.dateRange,
                        to: date,
                      })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            {(localFilters.dateRange.from || localFilters.dateRange.to) && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8"
                onClick={() => updateFilter("dateRange", {})}
              >
                <X className="h-3.5 w-3.5 mr-1" />
                Clear dates
              </Button>
            )}
          </div>
          
          <div className="space-y-3">
            <Label>Call Type</Label>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="call-type-incoming"
                  checked={localFilters.callTypes.includes("incoming")}
                  onCheckedChange={() => toggleCallType("incoming")}
                />
                <Label htmlFor="call-type-incoming" className="cursor-pointer">Incoming</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="call-type-outgoing"
                  checked={localFilters.callTypes.includes("outgoing")}
                  onCheckedChange={() => toggleCallType("outgoing")}
                />
                <Label htmlFor="call-type-outgoing" className="cursor-pointer">Outgoing</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="call-type-missed"
                  checked={localFilters.callTypes.includes("missed")}
                  onCheckedChange={() => toggleCallType("missed")}
                />
                <Label htmlFor="call-type-missed" className="cursor-pointer">Missed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="call-type-scheduled"
                  checked={localFilters.callTypes.includes("scheduled")}
                  onCheckedChange={() => toggleCallType("scheduled")}
                />
                <Label htmlFor="call-type-scheduled" className="cursor-pointer">Scheduled</Label>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <Label>Duration (seconds)</Label>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                placeholder="Min"
                value={localFilters.minDuration || ""}
                onChange={(e) => updateFilter("minDuration", e.target.value ? Number(e.target.value) : undefined)}
                className="w-24"
                min={0}
              />
              <span className="text-muted-foreground">to</span>
              <Input
                type="number"
                placeholder="Max"
                value={localFilters.maxDuration || ""}
                onChange={(e) => updateFilter("maxDuration", e.target.value ? Number(e.target.value) : undefined)}
                className="w-24"
                min={0}
              />
            </div>
          </div>
          
          {availableTags.length > 0 && (
            <div className="space-y-3">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={localFilters.tags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="has-follow-up"
                checked={localFilters.hasFollowUp}
                onCheckedChange={(checked) => updateFilter("hasFollowUp", checked === true ? true : undefined)}
              />
              <Label htmlFor="has-follow-up" className="cursor-pointer">Has Follow-up</Label>
            </div>
          </div>
        </div>
        
        <SheetFooter>
          <div className="flex justify-between w-full">
            <Button variant="ghost" onClick={handleReset}>
              Reset Filters
            </Button>
            <Button onClick={handleApplyFilters}>Apply Filters</Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CallAdvancedFilters;
