
import React from "react";
import { OrganizationFilters, OrganizationType, OrganizationStatus } from "@/types/organization";
import { useOrganizations } from "@/context/OrganizationsContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const OrganizationsFilters: React.FC = () => {
  const { filters, setFilters } = useOrganizations();

  const organizationTypes: OrganizationType[] = [
    "Hospital",
    "Clinic",
    "Laboratory",
    "Pharmacy",
    "Insurance",
    "Other",
  ];

  const organizationStatuses: OrganizationStatus[] = [
    "Active",
    "Inactive",
    "Pending",
    "Archived",
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const handleTypeChange = (value: string) => {
    setFilters({
      ...filters,
      type: value as OrganizationType,
    });
  };

  const handleStatusChange = (value: string) => {
    setFilters({
      ...filters,
      status: value as OrganizationStatus,
    });
  };

  const clearFilters = () => {
    setFilters({});
  };

  const hasFilters = filters.search || filters.type || filters.status;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search organizations..."
            className="pl-8"
            value={filters.search || ""}
            onChange={handleSearchChange}
          />
        </div>
        <Select
          value={filters.type || ""}
          onValueChange={handleTypeChange}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Organization Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Types</SelectItem>
            {organizationTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filters.status || ""}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Statuses</SelectItem>
            {organizationStatuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {hasFilters && (
          <Button variant="outline" onClick={clearFilters} className="sm:w-auto">
            <X className="mr-2 h-4 w-4" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};

export default OrganizationsFilters;
