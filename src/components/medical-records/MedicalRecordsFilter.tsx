
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, Filter, Check } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { MedicalRecordFilter } from "@/types/medicalRecord";

interface MedicalRecordsFilterProps {
  onFilterChange: (filters: MedicalRecordFilter) => void;
}

const recordTypes = [
  { id: "visit", label: "Office Visit" },
  { id: "lab", label: "Lab Results" },
  { id: "imaging", label: "Imaging" },
  { id: "procedure", label: "Procedure" },
  { id: "vaccination", label: "Vaccination" },
  { id: "allergy", label: "Allergy" },
  { id: "diagnosis", label: "Diagnosis" },
  { id: "note", label: "Clinical Note" },
];

const statuses = [
  { id: "draft", label: "Draft" },
  { id: "final", label: "Final" },
  { id: "amended", label: "Amended" },
];

const providers = [
  { id: "dr-smith", label: "Dr. Smith" },
  { id: "dr-johnson", label: "Dr. Johnson" },
  { id: "dr-patel", label: "Dr. Patel" },
  { id: "dr-williams", label: "Dr. Williams" },
];

const MedicalRecordsFilter: React.FC<MedicalRecordsFilterProps> = ({ onFilterChange }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});

  const handleApplyFilters = () => {
    onFilterChange({
      recordType: selectedTypes.length > 0 ? selectedTypes : undefined,
      status: selectedStatuses.length > 0 ? selectedStatuses : undefined,
      provider: selectedProviders.length > 0 ? selectedProviders.map(p => {
        const found = providers.find(provider => provider.id === p);
        return found ? found.label : p;
      }) : undefined,
      dateRange: dateRange.from && dateRange.to ? {
        from: dateRange.from.toISOString(),
        to: dateRange.to.toISOString(),
      } : undefined,
    });
  };

  const handleResetFilters = () => {
    setSelectedTypes([]);
    setSelectedStatuses([]);
    setSelectedProviders([]);
    setDateRange({});
    onFilterChange({});
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Filter className="h-3.5 w-3.5" />
          <span>Filter</span>
          {(selectedTypes.length > 0 || selectedStatuses.length > 0 || selectedProviders.length > 0 || dateRange.from) && (
            <span className="ml-1 rounded-full bg-primary w-2 h-2" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0" align="end">
        <Card className="border-0 shadow-none">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Filter Records</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium">Record Type</Label>
              <div className="grid grid-cols-2 gap-2">
                {recordTypes.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`type-${type.id}`}
                      checked={selectedTypes.includes(type.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedTypes([...selectedTypes, type.id]);
                        } else {
                          setSelectedTypes(selectedTypes.filter((id) => id !== type.id));
                        }
                      }}
                    />
                    <Label htmlFor={`type-${type.id}`} className="text-xs">
                      {type.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">Status</Label>
              <div className="flex flex-wrap gap-2">
                {statuses.map((status) => (
                  <div key={status.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`status-${status.id}`}
                      checked={selectedStatuses.includes(status.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedStatuses([...selectedStatuses, status.id]);
                        } else {
                          setSelectedStatuses(selectedStatuses.filter((id) => id !== status.id));
                        }
                      }}
                    />
                    <Label htmlFor={`status-${status.id}`} className="text-xs">
                      {status.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">Provider</Label>
              <div className="grid grid-cols-2 gap-2">
                {providers.map((provider) => (
                  <div key={provider.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`provider-${provider.id}`}
                      checked={selectedProviders.includes(provider.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedProviders([...selectedProviders, provider.id]);
                        } else {
                          setSelectedProviders(selectedProviders.filter((id) => id !== provider.id));
                        }
                      }}
                    />
                    <Label htmlFor={`provider-${provider.id}`} className="text-xs">
                      {provider.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">Date Range</Label>
              <div className="grid gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`w-full justify-start text-left font-normal ${
                        !dateRange.from && !dateRange.to ? "text-muted-foreground" : ""
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {dateRange.from.toLocaleDateString()} - {dateRange.to.toLocaleDateString()}
                          </>
                        ) : (
                          dateRange.from.toLocaleDateString()
                        )
                      ) : (
                        <span>Select date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t px-6 py-4">
            <Button variant="outline" size="sm" onClick={handleResetFilters}>
              Reset
            </Button>
            <Button size="sm" onClick={handleApplyFilters} className="gap-1">
              <Check className="h-3.5 w-3.5" />
              Apply Filters
            </Button>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default MedicalRecordsFilter;
