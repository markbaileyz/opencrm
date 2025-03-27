
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FilterType } from "@/components/roadmap/FeatureFilters";
import { SortType } from "@/components/CRMFeaturesList";
import FilterOptions from "./FilterOptions";

interface RoadmapHeaderProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showSearch: boolean;
  setShowSearch: (show: boolean) => void;
  activeFilter: FilterType;
  setActiveFilter: (filter: FilterType) => void;
  activeSort: SortType;
  setActiveSort: (sort: SortType) => void;
  scrollToFeatures: () => void;
}

const RoadmapHeader: React.FC<RoadmapHeaderProps> = ({
  showFilters,
  setShowFilters,
  searchQuery,
  setSearchQuery,
  showSearch,
  setShowSearch,
  activeFilter,
  setActiveFilter,
  activeSort,
  setActiveSort,
  scrollToFeatures
}) => {
  return (
    <div className="bg-gradient-to-b from-primary/10 to-background pt-16 pb-12 mb-8">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">OpenCRM Product Roadmap</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          See what features we've implemented and what's coming next in our development journey.
          Use the filters below to focus on specific feature statuses.
        </p>
        <div className="flex justify-center items-center gap-2">
          <Button 
            variant="outline" 
            className="mx-auto"
            onClick={scrollToFeatures}
          >
            Explore Our Roadmap <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "bg-primary/10" : ""}
          >
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter features</span>
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setShowSearch(!showSearch)}
            className={showSearch ? "bg-primary/10" : ""}
          >
            <Search className="h-4 w-4" />
            <span className="sr-only">Search features</span>
          </Button>
        </div>
        
        {showSearch && (
          <div className="mt-4 max-w-md mx-auto animate-fade-down">
            <Input
              type="text"
              placeholder="Search features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
        )}
        
        {showFilters && (
          <FilterOptions 
            activeFilter={activeFilter} 
            setActiveFilter={setActiveFilter} 
            activeSort={activeSort} 
            setActiveSort={setActiveSort} 
          />
        )}
      </div>
    </div>
  );
};

export default RoadmapHeader;
