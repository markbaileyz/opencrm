
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ImportSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const ImportSuccessDialog: React.FC<ImportSuccessDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center text-green-500">
            <CheckCircle2 className="h-5 w-5 mr-2" />
            Import Successful
          </DialogTitle>
          <DialogDescription>
            Your data has been successfully imported into your CRM.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="bg-muted p-3 rounded-md text-sm">
            <p className="font-medium">Import Summary:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
              <li>127 contacts added/updated</li>
              <li>43 organizations added/updated</li>
              <li>56 deals added/updated</li>
              <li>94 activities added</li>
            </ul>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onConfirm}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportSuccessDialog;
