
import React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ImportFailedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  error: string;
}

const ImportFailedDialog: React.FC<ImportFailedDialogProps> = ({
  open,
  onOpenChange,
  onClose,
  error
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center text-destructive">
            <AlertCircle className="h-5 w-5 mr-2" />
            Import Failed
          </DialogTitle>
          <DialogDescription>
            There was an error while importing your data.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="bg-destructive/10 p-3 rounded-md text-sm border border-destructive/20">
            <p className="font-medium">Error details:</p>
            <p className="mt-2 text-destructive">{error}</p>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Possible solutions:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Check your file format and structure</li>
              <li>Ensure all required columns are present</li>
              <li>Make sure your file isn't corrupted</li>
              <li>Try with a smaller sample if your file is very large</li>
            </ul>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportFailedDialog;
