
import React from "react";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MedicationDocumentsProps {
  attachments?: string[];
}

const MedicationDocuments: React.FC<MedicationDocumentsProps> = ({ attachments }) => {
  if (!attachments || attachments.length === 0) {
    return (
      <div className="text-center p-6 bg-muted/20 rounded-md">
        <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
        <p className="font-medium">No Documents</p>
        <p className="text-sm text-muted-foreground mt-1">
          No attachments or documentation available for this medication.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {attachments.map((attachment, index) => (
        <div key={index} className="flex items-center justify-between p-2 border rounded-md">
          <span className="text-sm">{attachment}</span>
          <Button size="sm" variant="ghost">
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
      ))}
    </div>
  );
};

export default MedicationDocuments;
