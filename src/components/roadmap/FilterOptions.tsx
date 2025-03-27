
import React from "react";
import { Button } from "@/components/ui/button";
import { FilterType } from "@/components/roadmap/FeatureFilters";
import { SortType } from "@/components/CRMFeaturesList";

interface FilterOptionsProps {
  activeFilter: FilterType;
  setActiveFilter: (filter: FilterType) => void;
  activeSort: SortType;
  setActiveSort: (sort: SortType) => void;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({
  activeFilter,
  setActiveFilter,
  activeSort,
  setActiveSort
}) => {
  return (
    <div className="mt-4 max-w-lg mx-auto p-4 border rounded-lg bg-card animate-fade-down">
      <h3 className="text-lg font-medium mb-2">Filter Options</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <h4 className="text-sm font-medium mb-1">Status</h4>
          <div className="flex flex-wrap gap-2">
            <Button 
              size="sm" 
              variant={activeFilter === "all" ? "default" : "outline"}
              onClick={() => setActiveFilter("all")}
            >
              All
            </Button>
            <Button 
              size="sm" 
              variant={activeFilter === "implemented" ? "default" : "outline"}
              onClick={() => setActiveFilter("implemented")}
            >
              Implemented
            </Button>
            <Button 
              size="sm" 
              variant={activeFilter === "coming-soon" ? "default" : "outline"}
              onClick={() => setActiveFilter("coming-soon")}
            >
              Coming Soon
            </Button>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-1">Sort By</h4>
          <div className="flex flex-wrap gap-2">
            <Button 
              size="sm" 
              variant={activeSort === "popular" ? "default" : "outline"}
              onClick={() => setActiveSort("popular")}
            >
              Most Popular
            </Button>
            <Button 
              size="sm" 
              variant={activeSort === "az" ? "default" : "outline"}
              onClick={() => setActiveSort("az")}
            >
              A-Z
            </Button>
            <Button 
              size="sm" 
              variant={activeSort === "za" ? "default" : "outline"}
              onClick={() => setActiveSort("za")}
            >
              Z-A
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterOptions;
