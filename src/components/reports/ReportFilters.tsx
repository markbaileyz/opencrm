import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Filter, Calendar as CalendarIcon, Check, X } from "lucide-react";
import ResponsiveContainer from "../ui/responsive-container";

const ReportFilters = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const reportTypes = ["Sales", "Marketing", "Customer Service", "Financial"];

  const handleTypeSelect = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const isTypeSelected = (type: string) => selectedTypes.includes(type);

  return (
    <div className="space-y-4">
      <ResponsiveContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Search Filter */}
          <div>
            <Label htmlFor="search">Search Reports</Label>
            <Input type="search" id="search" placeholder="Search by name, description..." />
          </div>

          {/* Date Range Filter */}
          <div>
            <Label>Select Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Report Type Filter */}
          <div>
            <Label>Report Type</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a report type" />
              </SelectTrigger>
              <SelectContent>
                {reportTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </ResponsiveContainer>

      {/* Mobile Filters */}
      <ResponsiveContainer
        mobileView={
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                {/* Mobile Date Range Filter */}
                <div>
                  <Label>Select Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="center">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Mobile Report Type Filter */}
                <div>
                  <Label>Report Type</Label>
                  <div className="flex flex-wrap gap-2">
                    {reportTypes.map((type) => (
                      <Button
                        key={type}
                        variant={isTypeSelected(type) ? "default" : "outline"}
                        onClick={() => handleTypeSelect(type)}
                      >
                        {isTypeSelected(type) && (
                          <Check className="mr-2 h-4 w-4" />
                        )}
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Mobile Apply Filters Button */}
                <Button className="w-full">Apply Filters</Button>
              </div>
            </PopoverContent>
          </Popover>
        }
      />
    </div>
  );
};

export default ReportFilters;
