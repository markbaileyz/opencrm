
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, Folder, ListFilter, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
    <div className="flex flex-col space-y-2 w-full">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium flex items-center gap-1">
          <ListFilter className="h-4 w-4" />
          Filter by Category
        </span>
        
        {activeCategory && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 px-2 text-xs text-muted-foreground"
            onClick={() => setActiveCategory(null)}
          >
            <X className="h-3 w-3 mr-1" />
            Clear filter
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2 items-center">
        <Button
          variant={activeCategory === null ? "secondary" : "outline"}
          size="sm"
          onClick={() => setActiveCategory(null)}
          className={cn(
            "h-8 transition-all", 
            activeCategory === null ? "px-4 font-medium" : "px-3"
          )}
        >
          {activeCategory === null && <Check className="h-3 w-3 mr-1" />}
          All Categories
          <Badge 
            variant="outline" 
            className="ml-2 bg-background text-xs font-normal"
          >
            {categories.length}
          </Badge>
        </Button>
        
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "secondary" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category)}
            className={cn(
              "h-8 transition-all", 
              activeCategory === category ? "px-4 font-medium" : "px-3"
            )}
          >
            {activeCategory === category ? (
              <Check className="h-3 w-3 mr-1" />
            ) : (
              <Folder className="h-3 w-3 mr-1 opacity-70" />
            )}
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryQuickFilters;
