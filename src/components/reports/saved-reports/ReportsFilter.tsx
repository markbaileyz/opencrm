
import React, { useContext } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Calendar, Star, X } from "lucide-react";
import { SavedReportsContext } from "./SavedReportsContext";

const ReportsFilter: React.FC = () => {
  const { 
    filterText, 
    setFilterText, 
    showFavoritesOnly, 
    setShowFavoritesOnly,
    showScheduledOnly,
    setShowScheduledOnly,
    clearFilters
  } = useContext(SavedReportsContext);
  
  const hasActiveFilters = filterText || showFavoritesOnly || showScheduledOnly;

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search reports..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="pl-8"
        />
      </div>
      
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="favorites" 
            checked={showFavoritesOnly}
            onCheckedChange={(checked) => setShowFavoritesOnly(checked === true)}
          />
          <label
            htmlFor="favorites"
            className="text-sm font-medium flex items-center cursor-pointer"
          >
            <Star className="h-3.5 w-3.5 mr-1.5 text-yellow-400" />
            Favorites
          </label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="scheduled" 
            checked={showScheduledOnly}
            onCheckedChange={(checked) => setShowScheduledOnly(checked === true)}
          />
          <label
            htmlFor="scheduled"
            className="text-sm font-medium flex items-center cursor-pointer"
          >
            <Calendar className="h-3.5 w-3.5 mr-1.5 text-primary" />
            Scheduled
          </label>
        </div>
        
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="ml-auto h-7 px-2 text-xs"
          >
            <X className="h-3.5 w-3.5 mr-1" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};

export default ReportsFilter;
