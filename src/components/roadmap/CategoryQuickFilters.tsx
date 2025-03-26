
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, ListFilter } from "lucide-react";

interface CategoryQuickFiltersProps {
  categories: string[];
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
}

const CategoryQuickFilters: React.FC<CategoryQuickFiltersProps> = ({
  categories,
  activeCategory,
  setActiveCategory,
}) => {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-sm font-medium flex items-center gap-1">
        <ListFilter className="h-4 w-4" />
        Categories:
      </span>
      
      <Button
        variant={activeCategory === null ? "secondary" : "outline"}
        size="sm"
        onClick={() => setActiveCategory(null)}
        className="h-8"
      >
        {activeCategory === null && <Check className="h-3 w-3 mr-1" />}
        All
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "secondary" : "outline"}
          size="sm"
          onClick={() => setActiveCategory(category)}
          className="h-8"
        >
          {activeCategory === category && <Check className="h-3 w-3 mr-1" />}
          {category}
        </Button>
      ))}
    </div>
  );
};

export default CategoryQuickFilters;
