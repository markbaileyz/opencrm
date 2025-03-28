
import React, { useState } from "react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Filter, X } from "lucide-react";
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList, 
  CommandSeparator 
} from "@/components/ui/command";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { MedicalRecordFilter } from "@/types/medicalRecord";

const recordTypes = [
  { value: "visit", label: "Visit" },
  { value: "lab", label: "Lab Test" },
  { value: "imaging", label: "Imaging" },
  { value: "procedure", label: "Procedure" },
  { value: "vaccination", label: "Vaccination" },
  { value: "allergy", label: "Allergy" },
  { value: "diagnosis", label: "Diagnosis" },
  { value: "note", label: "Note" }
];

const statuses = [
  { value: "draft", label: "Draft" },
  { value: "final", label: "Final" },
  { value: "amended", label: "Amended" }
];

const providers = [
  { value: "Dr. Smith", label: "Dr. Smith" },
  { value: "Dr. Johnson", label: "Dr. Johnson" },
  { value: "Dr. Williams", label: "Dr. Williams" },
  { value: "Dr. Davis", label: "Dr. Davis" },
  { value: "Dr. Miller", label: "Dr. Miller" }
];

interface MedicalRecordsFilterProps {
  onFilterChange: (filter: MedicalRecordFilter) => void;
}

const MedicalRecordsFilter: React.FC<MedicalRecordsFilterProps> = ({ onFilterChange }) => {
  const [open, setOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined
  });

  const handleTypeSelect = (value: string) => {
    setSelectedTypes(prev => {
      const newSelection = prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value];
      
      updateFilters({
        recordType: newSelection.length > 0 ? newSelection : undefined,
      });
      
      return newSelection;
    });
  };

  const handleProviderSelect = (value: string) => {
    setSelectedProviders(prev => {
      const newSelection = prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value];
      
      updateFilters({
        provider: newSelection.length > 0 ? newSelection : undefined,
      });
      
      return newSelection;
    });
  };

  const handleStatusSelect = (value: string) => {
    setSelectedStatuses(prev => {
      const newSelection = prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value];
      
      updateFilters({
        status: newSelection.length > 0 ? newSelection : undefined,
      });
      
      return newSelection;
    });
  };

  const handleDateSelect = (range: { from: Date; to: Date }) => {
    setDateRange(range);
    
    if (range.from && range.to) {
      updateFilters({
        dateRange: { 
          from: format(range.from, 'yyyy-MM-dd'), 
          to: format(range.to, 'yyyy-MM-dd') 
        },
      });
    }
  };

  const updateFilters = (partialFilter: Partial<MedicalRecordFilter>) => {
    const filter: MedicalRecordFilter = {};
    
    if (selectedTypes.length > 0) {
      filter.recordType = selectedTypes;
    }
    
    if (selectedProviders.length > 0) {
      filter.provider = selectedProviders;
    }
    
    if (selectedStatuses.length > 0) {
      filter.status = selectedStatuses;
    }
    
    if (dateRange.from && dateRange.to) {
      filter.dateRange = {
        from: format(dateRange.from, 'yyyy-MM-dd'),
        to: format(dateRange.to, 'yyyy-MM-dd')
      };
    }
    
    // Apply partial filter updates
    Object.assign(filter, partialFilter);
    
    onFilterChange(filter);
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedProviders([]);
    setSelectedStatuses([]);
    setDateRange({ from: undefined, to: undefined });
    onFilterChange({});
  };

  const hasActiveFilters = selectedTypes.length > 0 || 
    selectedProviders.length > 0 || 
    selectedStatuses.length > 0 || 
    (dateRange.from && dateRange.to);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className={cn(
            "flex items-center gap-1",
            hasActiveFilters && "bg-primary/10 border-primary/20"
          )}
        >
          <Filter className="h-4 w-4" />
          <span>Filter</span>
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-1 h-5 px-1">
              {selectedTypes.length + selectedProviders.length + selectedStatuses.length + (dateRange.from && dateRange.to ? 1 : 0)}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search filters..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            
            <CommandGroup heading="Record Type">
              {recordTypes.map((type) => (
                <CommandItem 
                  key={type.value}
                  onSelect={() => handleTypeSelect(type.value)}
                  className="flex items-center justify-between"
                >
                  <span>{type.label}</span>
                  {selectedTypes.includes(type.value) && (
                    <Check className="h-4 w-4" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
            
            <CommandSeparator />
            
            <CommandGroup heading="Provider">
              {providers.map((provider) => (
                <CommandItem 
                  key={provider.value}
                  onSelect={() => handleProviderSelect(provider.value)}
                  className="flex items-center justify-between"
                >
                  <span>{provider.label}</span>
                  {selectedProviders.includes(provider.value) && (
                    <Check className="h-4 w-4" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
            
            <CommandSeparator />
            
            <CommandGroup heading="Status">
              {statuses.map((status) => (
                <CommandItem 
                  key={status.value}
                  onSelect={() => handleStatusSelect(status.value)}
                  className="flex items-center justify-between"
                >
                  <span>{status.label}</span>
                  {selectedStatuses.includes(status.value) && (
                    <Check className="h-4 w-4" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
            
            <CommandSeparator />
            
            <CommandGroup heading="Date Range">
              <div className="p-2">
                <Calendar
                  mode="range"
                  selected={{
                    from: dateRange.from || new Date(),
                    to: dateRange.to || new Date(),
                  }}
                  onSelect={(range) => {
                    if (range?.from && range?.to) {
                      handleDateSelect(range as { from: Date; to: Date });
                    }
                  }}
                  numberOfMonths={1}
                  defaultMonth={new Date()}
                />
              </div>
            </CommandGroup>
          </CommandList>
          
          <div className="border-t p-2 flex justify-between">
            <Button
              variant="outline" 
              size="sm"
              onClick={clearFilters}
              disabled={!hasActiveFilters}
              className="flex items-center gap-1"
            >
              <X className="h-3 w-3" />
              <span>Clear</span>
            </Button>
            <Button
              size="sm"
              onClick={() => setOpen(false)}
              className="flex items-center gap-1"
            >
              <span>Apply</span>
              <ChevronsUpDown className="h-3 w-3" />
            </Button>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default MedicalRecordsFilter;
