
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import ExportDataSection from "./data-management/ExportDataSection";
import ImportDataSection from "./data-management/ImportDataSection";
import ImportSuccessDialog from "./data-management/ImportSuccessDialog";

const DataManagementSettings: React.FC = () => {
  const { toast } = useToast();
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);

  const handleImport = () => {
    if (!importFile) return;
    
    setIsImporting(true);
    setImportProgress(0);
    
    // Simulate import process with progress
    const interval = setInterval(() => {
      setImportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsImporting(false);
          setShowImportDialog(true);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleImportConfirm = () => {
    setShowImportDialog(false);
    setImportFile(null);
    
    toast({
      title: "Import complete",
      description: "Your data has been successfully imported.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Management</CardTitle>
        <CardDescription>
          Export your CRM data or import data from external sources
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <ExportDataSection />
          
          <Separator />
          
          <ImportDataSection 
            onFileSelect={setImportFile}
            onImportStart={handleImport}
            importFile={importFile}
            isImporting={isImporting}
            importProgress={importProgress}
          />
        </div>

        <ImportSuccessDialog 
          open={showImportDialog} 
          onOpenChange={setShowImportDialog}
          onConfirm={handleImportConfirm}
        />
      </CardContent>
    </Card>
  );
};

export default DataManagementSettings;
