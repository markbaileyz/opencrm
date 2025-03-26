
import React from "react";

export type FilterType = "all" | "implemented" | "coming-soon";

interface FeatureFiltersProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}

const FeatureFilters: React.FC<FeatureFiltersProps> = ({ filter, setFilter }) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="inline-flex rounded-md shadow-sm">
        <button
          type="button"
          className={`px-4 py-2 text-sm font-medium border rounded-l-lg ${
            filter === "all"
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background text-foreground border-border hover:bg-muted"
          }`}
          onClick={() => setFilter("all")}
        >
          All Features
        </button>
        <button
          type="button"
          className={`px-4 py-2 text-sm font-medium border-t border-b border-r ${
            filter === "implemented"
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background text-foreground border-border hover:bg-muted"
          }`}
          onClick={() => setFilter("implemented")}
        >
          Implemented
        </button>
        <button
          type="button"
          className={`px-4 py-2 text-sm font-medium border-t border-b border-r rounded-r-lg ${
            filter === "coming-soon"
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background text-foreground border-border hover:bg-muted"
          }`}
          onClick={() => setFilter("coming-soon")}
        >
          Coming Soon
        </button>
      </div>
    </div>
  );
};

export default FeatureFilters;
