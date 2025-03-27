
import React, { useState } from "react";
import SettingsCard from "../SettingsCard";
import { Database, Upload, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExportDataSection from "./ExportDataSection";
import ImportDataSection from "./ImportDataSection";
import ImportSuccessDialog from "./ImportSuccessDialog";
import { useToast } from "@/hooks/use-toast";

const DataManagementSettings = () => {
  const { toast } = useToast();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [importStats, setImportStats] = useState({
    contacts: 0,
    organizations: 0,
    deals: 0,
    activities: 0,
  });
  const [importFile, setImportFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);

  const handleFileSelect = (file: File | null) => {
    setImportFile(file);
  };

  const handleImportStart = () => {
    if (!importFile) return;
    
    setIsImporting(true);
    setImportProgress(0);
    
    // Simulate import process with progress
    const interval = setInterval(() => {
      setImportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsImporting(false);
          
          // Calculate stats based on file size (for simulation)
          const size = importFile.size;
          const contactCount = Math.floor(size / 1024) + 50;
          const orgCount = Math.floor(contactCount * 0.4);
          const dealCount = Math.floor(contactCount * 0.5);
          const activityCount = Math.floor(contactCount * 0.8);
          
          setImportStats({
            contacts: contactCount > 200 ? 200 : contactCount,
            organizations: orgCount > 100 ? 100 : orgCount,
            deals: dealCount > 150 ? 150 : dealCount,
            activities: activityCount > 300 ? 300 : activityCount
          });
          
          setShowSuccessDialog(true);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const handleImportSuccess = (stats: { contacts: number; organizations: number; deals: number }) => {
    setImportStats({
      ...stats,
      activities: 94, // Default value for activities
    });
    setShowSuccessDialog(true);
  };

  const handleImportConfirm = () => {
    setShowSuccessDialog(false);
    setImportFile(null);
    setImportProgress(0);
    
    toast({
      title: "Import complete",
      description: `Successfully imported ${importStats.contacts} contacts, ${importStats.organizations} organizations, and ${importStats.deals} deals.`,
    });
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
            onFileSelect={handleFileSelect}
            onImportStart={handleImportStart}
            importFile={importFile}
            isImporting={isImporting}
            importProgress={importProgress}
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
          onConfirm={handleImportConfirm}
          stats={importStats}
        />
      )}
    </SettingsCard>
  );
};

export default DataManagementSettings;
