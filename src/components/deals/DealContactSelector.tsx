
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, UserRound } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";

// Sample contact data
// In a real application, this would come from your API or context
const contacts = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Smith", email: "jane@example.com" },
  { id: "3", name: "Mike Johnson", email: "mike@example.com" },
  { id: "4", name: "Sarah Williams", email: "sarah@example.com" },
  { id: "5", name: "David Brown", email: "david@example.com" },
];

interface DealContactSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const DealContactSelector: React.FC<DealContactSelectorProps> = ({
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  
  const selectedContact = contacts.find(contact => contact.id === value);

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
            {value && selectedContact ? (
              <>
                <UserRound className="mr-2 h-4 w-4" />
                <span>{selectedContact.name}</span>
              </>
            ) : (
              <span className="text-muted-foreground">Select contact</span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search contacts..." />
          <CommandEmpty>No contact found.</CommandEmpty>
          <CommandGroup>
            {contacts.map((contact) => (
              <CommandItem
                key={contact.id}
                value={contact.id}
                onSelect={() => {
                  onChange(contact.id === value ? "" : contact.id);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === contact.id ? "opacity-100" : "opacity-0"
                  )}
                />
                <div className="flex flex-col">
                  <span>{contact.name}</span>
                  <span className="text-xs text-muted-foreground">{contact.email}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default DealContactSelector;
