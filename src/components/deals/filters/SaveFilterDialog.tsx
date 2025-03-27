
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface SaveFilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filterName: string;
  onFilterNameChange: (value: string) => void;
  onSave: () => void;
}

const SaveFilterDialog: React.FC<SaveFilterDialogProps> = ({
  open,
  onOpenChange,
  filterName,
  onFilterNameChange,
  onSave
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            value={filterName}
            onChange={(e) => onFilterNameChange(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSave}>Save Filter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SaveFilterDialog;
