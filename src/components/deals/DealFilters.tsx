
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  FilterX, 
  Calendar, 
  Save, 
  ChevronDown, 
  Filter 
} from "lucide-react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export interface DealFiltersProps {
  filters: {
    search: string;
    stage: string;
    value: string;
    sortBy: string;
    organization?: string;
    closeDate?: string;
    probability?: string;
    tags?: string[];
  };
  onFilterChange: (filters: any) => void;
}

// Define this type to fix the TypeScript error in dealFilters.ts
export type DealFiltersState = {
  search: string;
  stage: string;
  value: string;
  sortBy: string;
  organization?: string;
  closeDate?: string;
  probability?: string;
  tags?: string[];
};

// Define a type for saved filters
type SavedFilter = {
  id: string;
  name: string;
  filters: Partial<DealFiltersState>;
};

const DealFilters: React.FC<DealFiltersProps> = ({ 
  filters = { search: "", stage: "", value: "", sortBy: "newest" },
  onFilterChange = () => {}
}) => {
  const { toast } = useToast();
  const [localFilters, setLocalFilters] = useState<DealFiltersState>(filters);
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
    const resetFilters = { search: "", stage: "all", value: "all", sortBy: "newest" };
    setLocalFilters(resetFilters as DealFiltersState);
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
        organization: filter.filters.organization,
        closeDate: filter.filters.closeDate,
        probability: filter.filters.probability,
        tags: filter.filters.tags
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

  return (
    <>
      <Card>
        <CardContent className="p-4">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search deals..."
                className="pl-8"
                value={localFilters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>
            
            <Select 
              value={localFilters.stage} 
              onValueChange={(value) => handleFilterChange("stage", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Stages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="lead">Lead</SelectItem>
                <SelectItem value="qualification">Qualification</SelectItem>
                <SelectItem value="proposal">Proposal</SelectItem>
                <SelectItem value="negotiation">Negotiation</SelectItem>
                <SelectItem value="closed-won">Closed Won</SelectItem>
                <SelectItem value="closed-lost">Closed Lost</SelectItem>
              </SelectContent>
            </Select>
            
            <Select 
              value={localFilters.value} 
              onValueChange={(value) => handleFilterChange("value", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Values" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Values</SelectItem>
                <SelectItem value="small">&lt; $10k</SelectItem>
                <SelectItem value="medium">$10k - $50k</SelectItem>
                <SelectItem value="large">$50k - $100k</SelectItem>
                <SelectItem value="xlarge">&gt; $100k</SelectItem>
              </SelectContent>
            </Select>
            
            <Select 
              value={localFilters.sortBy} 
              onValueChange={(value) => handleFilterChange("sortBy", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="highest">Highest Value</SelectItem>
                <SelectItem value="lowest">Lowest Value</SelectItem>
                <SelectItem value="probability">Highest Probability</SelectItem>
                <SelectItem value="closing-soon">Closing Soon</SelectItem>
              </SelectContent>
            </Select>
            
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
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Save className="h-4 w-4" />
                      Saved Filters
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72">
                    <div className="space-y-2">
                      <h3 className="font-medium">Saved Filters</h3>
                      <Separator />
                      {savedFilters.length > 0 ? (
                        <div className="max-h-[200px] overflow-auto space-y-1">
                          {savedFilters.map((filter) => (
                            <div
                              key={filter.id}
                              className="flex items-center justify-between p-2 rounded hover:bg-muted cursor-pointer"
                              onClick={() => loadSavedFilter(filter.id)}
                            >
                              <span>{filter.name}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={(e) => deleteSavedFilter(filter.id, e)}
                              >
                                <FilterX className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-2 text-center text-muted-foreground">
                          <p>No saved filters</p>
                        </div>
                      )}
                      <Separator />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => setShowSaveDialog(true)}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Current Filter
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              
              <Button variant="outline" size="sm" onClick={handleResetFilters} className="gap-1">
                <FilterX className="h-4 w-4" />
                Reset Filters
              </Button>
            </div>
            
            {showAdvancedFilters && (
              <div className="md:col-span-4 grid md:grid-cols-3 gap-4 mt-2 border-t pt-4">
                <div>
                  <Select
                    value={localFilters.organization}
                    onValueChange={(value) => handleFilterChange("organization", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Organizations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Organizations</SelectItem>
                      <SelectItem value="org1">Acme Corporation</SelectItem>
                      <SelectItem value="org2">Globex Industries</SelectItem>
                      <SelectItem value="org3">Initech</SelectItem>
                      <SelectItem value="org4">Umbrella Corp</SelectItem>
                      <SelectItem value="org5">Stark Industries</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Select
                    value={localFilters.closeDate}
                    onValueChange={(value) => handleFilterChange("closeDate", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Closing Date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Time</SelectItem>
                      <SelectItem value="this-week">This Week</SelectItem>
                      <SelectItem value="this-month">This Month</SelectItem>
                      <SelectItem value="next-month">Next Month</SelectItem>
                      <SelectItem value="this-quarter">This Quarter</SelectItem>
                      <SelectItem value="next-quarter">Next Quarter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Select
                    value={localFilters.probability}
                    onValueChange={(value) => handleFilterChange("probability", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Win Probability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Probability</SelectItem>
                      <SelectItem value="low">Low (&lt; 25%)</SelectItem>
                      <SelectItem value="medium">Medium (25% - 75%)</SelectItem>
                      <SelectItem value="high">High (&gt; 75%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Save Filter</DialogTitle>
            <DialogDescription>
              Give your filter a name to save it for future use.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Filter name"
              value={savedFilterName}
              onChange={(e) => setSavedFilterName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveFilter}>Save Filter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DealFilters;
