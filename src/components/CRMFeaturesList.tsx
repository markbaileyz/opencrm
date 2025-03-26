
import React, { useState } from "react";
import { featuresList } from "@/data/featuresList";
import FeatureFilters, { FilterType } from "./roadmap/FeatureFilters";
import FeatureCategory from "./roadmap/FeatureCategory";
import CategoryQuickFilters from "./roadmap/CategoryQuickFilters";
import SortOptions from "./roadmap/SortOptions";

interface CRMFeaturesListProps {
  searchQuery?: string;
  filterType?: FilterType;
  sortOption?: SortType;
  categoryFilter?: string | null;
  setSelectedCategory?: (category: string | null) => void;
}

export type SortType = "popular" | "az" | "za" | "implemented" | "coming-soon";

const CRMFeaturesList: React.FC<CRMFeaturesListProps> = ({ 
  searchQuery = "", 
  filterType = "all",
  sortOption = "popular",
  categoryFilter = null,
  setSelectedCategory = () => {},
}) => {
  const [filter, setFilter] = useState<FilterType>(filterType);
  const [activeSort, setActiveSort] = useState<SortType>(sortOption);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(categoryFilter);
  
  // Update local state when props change
  React.useEffect(() => {
    setFilter(filterType);
    setActiveSort(sortOption);
    setActiveCategoryFilter(categoryFilter);
  }, [filterType, sortOption, categoryFilter]);
  
  // Get all unique category names for the quick filters
  const categoryNames = Array.from(new Set(featuresList.map(category => category.name)));
  
  // Handle category filter change
  const handleCategoryChange = (category: string | null) => {
    setActiveCategoryFilter(category);
    if (setSelectedCategory) {
      setSelectedCategory(category);
    }
  };
  
  let filteredFeaturesList = featuresList.map(category => ({
    ...category,
    features: category.features.filter(feature => {
      // Filter by status
      const statusMatch = 
        filter === "all" || 
        (filter === "implemented" && feature.implemented) || 
        (filter === "coming-soon" && feature.comingSoon);
      
      // Filter by search query
      const searchMatch = searchQuery === "" || 
        feature.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        feature.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return statusMatch && searchMatch;
    })
  }));
  
  // Filter by category if categoryFilter is set
  if (activeCategoryFilter) {
    filteredFeaturesList = filteredFeaturesList.filter(
      category => category.name === activeCategoryFilter
    );
  }
  
  // Filter out empty categories
  filteredFeaturesList = filteredFeaturesList.filter(category => category.features.length > 0);
  
  // Sort features within each category
  filteredFeaturesList = filteredFeaturesList.map(category => {
    let sortedFeatures = [...category.features];
    
    switch (activeSort) {
      case "popular":
        sortedFeatures.sort((a, b) => (b.votes || 0) - (a.votes || 0));
        break;
      case "az":
        sortedFeatures.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "za":
        sortedFeatures.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "implemented":
        sortedFeatures.sort((a, b) => {
          if (a.implemented && !b.implemented) return -1;
          if (!a.implemented && b.implemented) return 1;
          return 0;
        });
        break;
      case "coming-soon":
        sortedFeatures.sort((a, b) => {
          if (a.comingSoon && !b.comingSoon) return -1;
          if (!a.comingSoon && b.comingSoon) return 1;
          return 0;
        });
        break;
    }
    
    return {
      ...category,
      features: sortedFeatures
    };
  });

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">NextCRM Roadmap</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Our planned features and current development status. We're constantly
          improving NextCRM to meet your business needs.
        </p>
      </div>

      <div className="flex flex-col gap-6 mb-8">
        {!filterType && (
          <FeatureFilters filter={filter} setFilter={setFilter} />
        )}
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <CategoryQuickFilters 
            categories={categoryNames} 
            activeCategory={activeCategoryFilter} 
            setActiveCategory={handleCategoryChange} 
          />
          
          {!sortOption && (
            <SortOptions sortOption={activeSort} setSortOption={setActiveSort} />
          )}
        </div>
      </div>

      {filteredFeaturesList.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">
            {searchQuery 
              ? `No features found matching "${searchQuery}". Try another search term.` 
              : activeCategoryFilter
                ? `No features found in category "${activeCategoryFilter}" with the current filters.`
                : "No features found matching the selected filter."}
          </p>
        </div>
      ) : (
        <div className="space-y-16">
          {filteredFeaturesList.map((category) => (
            <FeatureCategory key={category.name} category={category} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CRMFeaturesList;
