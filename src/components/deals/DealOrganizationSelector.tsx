
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Building2 } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";

// Sample organization data
// In a real application, this would come from your API or context
const organizations = [
  { id: "1", name: "Acme Corp", type: "Healthcare" },
  { id: "2", name: "Globex", type: "Technology" },
  { id: "3", name: "Initech", type: "Finance" },
  { id: "4", name: "Massive Dynamic", type: "Research" },
  { id: "5", name: "Umbrella Corporation", type: "Pharmaceutical" },
];

interface DealOrganizationSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const DealOrganizationSelector: React.FC<DealOrganizationSelectorProps> = ({
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  
  const selectedOrganization = organizations.find(org => org.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <div className="flex items-center">
            {value && selectedOrganization ? (
              <>
                <Building2 className="mr-2 h-4 w-4" />
                <span>{selectedOrganization.name}</span>
              </>
            ) : (
              <span className="text-muted-foreground">Select organization</span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search organizations..." />
          <CommandEmpty>No organization found.</CommandEmpty>
          <CommandGroup>
            {organizations.map((org) => (
              <CommandItem
                key={org.id}
                value={org.id}
                onSelect={() => {
                  onChange(org.id === value ? "" : org.id);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === org.id ? "opacity-100" : "opacity-0"
                  )}
                />
                <div className="flex flex-col">
                  <span>{org.name}</span>
                  <span className="text-xs text-muted-foreground">{org.type}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default DealOrganizationSelector;
