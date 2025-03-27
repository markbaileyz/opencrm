
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Download } from "lucide-react";
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
  onDownloadReport?: () => void;
  stats: {
    contacts: number;
    organizations: number;
    deals: number;
    activities?: number;
    duplicatesSkipped?: number;
    totalRecords?: number;
  };
}

const ImportSuccessDialog: React.FC<ImportSuccessDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  onDownloadReport,
  stats = { contacts: 127, organizations: 43, deals: 56, activities: 94 }
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
              <li>{stats.contacts} contacts added/updated</li>
              <li>{stats.organizations} organizations added/updated</li>
              <li>{stats.deals} deals added/updated</li>
              <li>{stats.activities || 0} activities added</li>
              {stats.duplicatesSkipped !== undefined && (
                <li>{stats.duplicatesSkipped} duplicate records skipped</li>
              )}
              {stats.totalRecords !== undefined && (
                <li className="font-medium mt-2">
                  {stats.totalRecords} total records processed
                </li>
              )}
            </ul>
          </div>
        </div>
        <DialogFooter className="flex items-center justify-between sm:justify-end">
          {onDownloadReport && (
            <Button variant="outline" onClick={onDownloadReport} className="sm:mr-2">
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          )}
          <Button onClick={onConfirm}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportSuccessDialog;
