
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface ExportDataSectionProps {
  onExportComplete?: () => void;
}

const ExportDataSection: React.FC<ExportDataSectionProps> = ({ onExportComplete }) => {
  const { toast } = useToast();
  const [exportFormat, setExportFormat] = useState("json");
  const [exportType, setExportType] = useState("all");
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      
      toast({
        title: "Export complete",
        description: `Your data has been exported in ${exportFormat.toUpperCase()} format.`,
      });
      
      // Simulate file download
      const link = document.createElement("a");
      link.href = "#";
      link.download = `crm-export-${Date.now()}.${exportFormat}`;
      link.click();
      
      if (onExportComplete) {
        onExportComplete();
      }
    }, 2000);
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Export Data</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Data to Export</label>
          <Select value={exportType} onValueChange={setExportType}>
            <SelectTrigger>
              <SelectValue placeholder="Select data to export" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Data</SelectItem>
              <SelectItem value="contacts">Contacts Only</SelectItem>
              <SelectItem value="deals">Deals Only</SelectItem>
              <SelectItem value="organizations">Organizations Only</SelectItem>
              <SelectItem value="activities">Activities Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Export Format</label>
          <Select value={exportFormat} onValueChange={setExportFormat}>
            <SelectTrigger>
              <SelectValue placeholder="Select export format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={handleExport} disabled={isExporting} className="w-full md:w-auto">
        {isExporting ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Exporting...
          </>
        ) : (
          <>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </>
        )}
      </Button>
    </div>
  );
};

export default ExportDataSection;
