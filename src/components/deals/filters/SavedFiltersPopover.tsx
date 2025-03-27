
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Save, FilterX } from "lucide-react";
import { SavedFilter } from "@/hooks/useDealFilters";

interface SavedFiltersPopoverProps {
  savedFilters: SavedFilter[];
  onLoadFilter: (id: string) => void;
  onDeleteFilter: (id: string, e: React.MouseEvent) => void;
  onOpenSaveDialog: () => void;
}

const SavedFiltersPopover: React.FC<SavedFiltersPopoverProps> = ({
  savedFilters,
  onLoadFilter,
  onDeleteFilter,
  onOpenSaveDialog
}) => {
  return (
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
                  onClick={() => onLoadFilter(filter.id)}
                >
                  <span>{filter.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => onDeleteFilter(filter.id, e)}
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
            onClick={onOpenSaveDialog}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Current Filter
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SavedFiltersPopover;
