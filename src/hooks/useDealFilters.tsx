
import { useState } from "react";
import { DealFiltersState } from "@/components/deals/types/dealFilterTypes";
import { useToast } from "@/hooks/use-toast";

export type SavedFilter = {
  id: string;
  name: string;
  filters: Partial<DealFiltersState>;
};

export const useDealFilters = (
  initialFilters: DealFiltersState,
  onFilterChange: (filters: DealFiltersState) => void
) => {
  const { toast } = useToast();
  const [localFilters, setLocalFilters] = useState<DealFiltersState>(initialFilters);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [savedFilterName, setSavedFilterName] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([
    { id: "1", name: "High Value Leads", filters: { stage: "lead", value: "large" } },
    { id: "2", name: "Closing This Month", filters: { closeDate: "this-month", probability: "high" } }
  ]);

  const handleFilterChange = (key: string, value: string | string[]) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleResetFilters = () => {
    const resetFilters: DealFiltersState = { 
      search: "", 
      stage: "all", 
      value: "all", 
      sortBy: "newest",
      organization: "all",
      closeDate: "all",
      probability: "all" 
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const handleSaveFilter = () => {
    if (!savedFilterName.trim()) {
      toast({
        title: "Error",
        description: "Filter name cannot be empty",
        variant: "destructive"
      });
      return;
    }

    // Add the new saved filter
    const newFilter: SavedFilter = {
      id: `saved-${Date.now()}`,
      name: savedFilterName,
      filters: { ...localFilters }
    };

    setSavedFilters([...savedFilters, newFilter]);
    setShowSaveDialog(false);
    setSavedFilterName("");

    toast({
      title: "Filter saved",
      description: `Filter "${savedFilterName}" has been saved`,
    });
  };

  const loadSavedFilter = (id: string) => {
    const filter = savedFilters.find(f => f.id === id);
    if (filter) {
      // Create a complete filters object with all required properties
      const loadedFilters: DealFiltersState = {
        search: filter.filters.search || "",
        stage: filter.filters.stage || "all",
        value: filter.filters.value || "all",
        sortBy: filter.filters.sortBy || "newest",
        organization: filter.filters.organization || "all",
        closeDate: filter.filters.closeDate || "all",
        probability: filter.filters.probability || "all",
        tags: filter.filters.tags || []
      };
      
      setLocalFilters(loadedFilters);
      onFilterChange(loadedFilters);

      toast({
        title: "Filter loaded",
        description: `Filter "${filter.name}" has been applied`,
      });
    }
  };

  const deleteSavedFilter = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filter = savedFilters.find(f => f.id === id);
    if (filter) {
      setSavedFilters(savedFilters.filter(f => f.id !== id));
      
      toast({
        title: "Filter deleted",
        description: `Filter "${filter.name}" has been removed`,
      });
    }
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters.stage && localFilters.stage !== "all") count++;
    if (localFilters.value && localFilters.value !== "all") count++;
    if (localFilters.organization && localFilters.organization !== "all") count++;
    if (localFilters.closeDate && localFilters.closeDate !== "all") count++;
    if (localFilters.probability && localFilters.probability !== "all") count++;
    if (localFilters.tags && localFilters.tags.length > 0) count++;
    return count;
  };

  return {
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
  };
};
