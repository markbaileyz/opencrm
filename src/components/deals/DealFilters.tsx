
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, FilterX } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DealFiltersProps } from "./types/dealFilterTypes";
import { useDealFilters } from "@/hooks/useDealFilters";
import SavedFiltersPopover from "./filters/SavedFiltersPopover";
import SaveFilterDialog from "./filters/SaveFilterDialog";
import AdvancedFiltersSection from "./filters/AdvancedFiltersSection";
import BasicFiltersSection from "./filters/BasicFiltersSection";

const DealFilters: React.FC<DealFiltersProps> = ({ 
  filters,
  onFilterChange
}) => {
  const {
    localFilters,
    showAdvancedFilters,
    savedFilterName,
    showSaveDialog,
    savedFilters,
    handleFilterChange,
    handleResetFilters,
    handleSaveFilter,
    loadSavedFilter,
    deleteSavedFilter,
    getActiveFilterCount,
    setShowAdvancedFilters,
    setSavedFilterName,
    setShowSaveDialog
  } = useDealFilters(filters, onFilterChange);

  return (
    <>
      <Card>
        <CardContent className="p-4">
          <div className="grid gap-4 md:grid-cols-4">
            <BasicFiltersSection 
              filters={localFilters} 
              onFilterChange={handleFilterChange} 
            />
            
            <div className="md:col-span-4 flex justify-between items-center">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="gap-1"
                >
                  <Filter className="h-4 w-4" />
                  Advanced Filters
                  {getActiveFilterCount() > 0 && (
                    <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                      {getActiveFilterCount()}
                    </Badge>
                  )}
                </Button>
                
                <SavedFiltersPopover 
                  savedFilters={savedFilters}
                  onLoadFilter={loadSavedFilter}
                  onDeleteFilter={deleteSavedFilter}
                  onOpenSaveDialog={() => setShowSaveDialog(true)}
                />
              </div>
              
              <Button variant="outline" size="sm" onClick={handleResetFilters} className="gap-1">
                <FilterX className="h-4 w-4" />
                Reset Filters
              </Button>
            </div>
            
            {showAdvancedFilters && (
              <AdvancedFiltersSection 
                filters={localFilters}
                onFilterChange={handleFilterChange}
              />
            )}
          </div>
        </CardContent>
      </Card>

      <SaveFilterDialog 
        open={showSaveDialog}
        onOpenChange={setShowSaveDialog}
        filterName={savedFilterName}
        onFilterNameChange={setSavedFilterName}
        onSave={handleSaveFilter}
      />
    </>
  );
};

export default DealFilters;
