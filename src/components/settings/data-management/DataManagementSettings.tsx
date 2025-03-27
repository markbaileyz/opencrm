
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useDataManagement } from "@/hooks/useDataManagement";
import ExportDataSection from "./ExportDataSection";
import ImportDataSection from "./ImportDataSection";
import ImportSuccessDialog from "./ImportSuccessDialog";

const DataManagementSettings: React.FC = () => {
  const {
    isImporting,
    importProgress,
    showImportDialog,
    importFile,
    setImportFile,
    handleImport,
    handleImportConfirm,
    setShowImportDialog
  } = useDataManagement();

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
