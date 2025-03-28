
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import GuideBuilder from "./GuideBuilder";

interface GuideBuilderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editGuideId?: string;
}

const GuideBuilderDialog: React.FC<GuideBuilderDialogProps> = ({
  open,
  onOpenChange,
  editGuideId,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editGuideId ? "Edit Guide" : "Create New Guide"}</DialogTitle>
        </DialogHeader>
        <GuideBuilder onClose={() => onOpenChange(false)} editGuideId={editGuideId} />
      </DialogContent>
    </Dialog>
  );
};

export default GuideBuilderDialog;
