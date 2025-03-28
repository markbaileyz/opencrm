
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CallFiltersState } from "./CallAdvancedFilters";
import CallAdvancedFilters from "./CallAdvancedFilters";

interface CallFilterToolbarProps {
  filters: CallFiltersState;
  onFiltersChange: (filters: CallFiltersState) => void;
  onSearchChange: (search: string) => void;
  availableTags: string[];
}

const CallFilterToolbar: React.FC<CallFilterToolbarProps> = ({
  filters,
  onFiltersChange,
  onSearchChange,
  availableTags,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const clearFilter = (type: keyof CallFiltersState) => {
    if (type === "callTypes") {
      onFiltersChange({
        ...filters,
        callTypes: [],
      });
    } else if (type === "dateRange") {
      onFiltersChange({
        ...filters,
        dateRange: {},
      });
    } else if (type === "tags") {
      onFiltersChange({
        ...filters,
        tags: [],
      });
    } else if (type === "search") {
      onFiltersChange({
        ...filters,
        search: "",
      });
      onSearchChange("");
    } else {
      onFiltersChange({
        ...filters,
        [type]: undefined,
      });
    }
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.dateRange.from || filters.dateRange.to) count++;
    if (filters.callTypes.length) count++;
    if (filters.tags.length) count++;
    if (filters.minDuration || filters.maxDuration) count++;
    if (filters.hasFollowUp !== undefined) count++;
    return count;
  };

  const formatDate = (date?: Date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search calls..."
            value={filters.search}
            onChange={handleSearchChange}
            className="pl-8"
          />
        </div>
        <CallAdvancedFilters
          filters={filters}
          onFiltersChange={onFiltersChange}
          availableTags={availableTags}
        />
      </div>

      {getActiveFiltersCount() > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.search && (
            <Badge variant="secondary" className="gap-1">
              Search: {filters.search}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => clearFilter("search")}
              >
                &times;
              </Button>
            </Badge>
          )}

          {(filters.dateRange.from || filters.dateRange.to) && (
            <Badge variant="secondary" className="gap-1">
              Date: {formatDate(filters.dateRange.from)} - {formatDate(filters.dateRange.to)}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => clearFilter("dateRange")}
              >
                &times;
              </Button>
            </Badge>
          )}

          {filters.callTypes.length > 0 && (
            <Badge variant="secondary" className="gap-1">
              Types: {filters.callTypes.join(", ")}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => clearFilter("callTypes")}
              >
                &times;
              </Button>
            </Badge>
          )}

          {filters.tags.length > 0 && (
            <Badge variant="secondary" className="gap-1">
              Tags: {filters.tags.join(", ")}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => clearFilter("tags")}
              >
                &times;
              </Button>
            </Badge>
          )}

          {(filters.minDuration !== undefined || filters.maxDuration !== undefined) && (
            <Badge variant="secondary" className="gap-1">
              Duration: {filters.minDuration || "0"} - {filters.maxDuration || "∞"}s
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => {
                  clearFilter("minDuration");
                  clearFilter("maxDuration");
                }}
              >
                &times;
              </Button>
            </Badge>
          )}

          {filters.hasFollowUp && (
            <Badge variant="secondary" className="gap-1">
              Has Follow-up
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => clearFilter("hasFollowUp")}
              >
                &times;
              </Button>
            </Badge>
          )}

          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-xs"
            onClick={() => {
              onFiltersChange({
                search: "",
                dateRange: {},
                callTypes: [],
                tags: [],
              });
              onSearchChange("");
            }}
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};

export default CallFilterToolbar;
