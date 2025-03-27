
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useDataManagement } from "@/hooks/useDataManagement";
import ExportDataSection from "@/components/settings/data-management/ExportDataSection";
import ImportDataSection from "@/components/settings/data-management/ImportDataSection";
import ImportSuccessDialog from "@/components/settings/data-management/ImportSuccessDialog";

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

  // Default import stats to display in the success dialog
  const importStats = {
    contacts: 127,
    organizations: 43,
    deals: 56,
    activities: 94,
    duplicatesSkipped: 12,
    totalRecords: 332
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
          stats={importStats}
          onDownloadReport={() => console.log("Download report")}
        />
      </CardContent>
    </Card>
  );
};

export default DataManagementSettings;
