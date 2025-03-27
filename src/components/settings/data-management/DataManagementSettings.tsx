
import React, { useState } from "react";
import SettingsCard from "../SettingsCard";
import { Database, Upload, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExportDataSection from "./ExportDataSection";
import ImportDataSection from "./ImportDataSection";
import ImportSuccessDialog from "./ImportSuccessDialog";

const DataManagementSettings = () => {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [importStats, setImportStats] = useState({
    contacts: 0,
    organizations: 0,
    deals: 0,
  });

  const handleImportSuccess = (stats: { contacts: number; organizations: number; deals: number }) => {
    setImportStats(stats);
    setShowSuccessDialog(true);
  };

  return (
    <SettingsCard
      title="Data Management"
      description="Import, export, and manage your CRM data"
      icon={<Database className="h-5 w-5" />}
    >
      <Tabs defaultValue="import" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="import" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            <span>Import Data</span>
          </TabsTrigger>
          <TabsTrigger value="export" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Export Data</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="import">
          <ImportDataSection 
            onFileSelect={(file) => {}}
            onImportStart={() => {}}
            importFile={null}
            isImporting={false}
            importProgress={0}
            onImportSuccess={handleImportSuccess} 
          />
        </TabsContent>
        
        <TabsContent value="export">
          <ExportDataSection />
        </TabsContent>
      </Tabs>

      {showSuccessDialog && (
        <ImportSuccessDialog
          open={showSuccessDialog}
          onOpenChange={setShowSuccessDialog}
          onConfirm={() => setShowSuccessDialog(false)}
          stats={importStats}
        />
      )}
    </SettingsCard>
  );
};

export default DataManagementSettings;
