
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ExportDataSection: React.FC = () => {
  const [exportFormat, setExportFormat] = useState("json");
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      
      // In a real app, this would trigger a download
      console.log(`Exporting data in ${exportFormat} format`);
      
      // Create a fake download to simulate the functionality
      const element = document.createElement("a");
      element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent("Exported CRM data"));
      element.setAttribute("download", `crm-export.${exportFormat}`);
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 2000);
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Export Data</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <div className="text-sm font-medium">Data Format</div>
          <Select 
            value={exportFormat} 
            onValueChange={setExportFormat}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <Button 
            onClick={handleExport} 
            disabled={isExporting}
            className="w-full"
          >
            {isExporting ? (
              <>Exporting...</>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div className="mt-4 bg-muted/30 p-3 rounded-md text-sm">
        <div className="flex items-start">
          <FileText className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-muted-foreground">
              This will export all of your data including contacts, organizations, deals, 
              activities, notes, and custom fields.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportDataSection;
