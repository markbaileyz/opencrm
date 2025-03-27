
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ExportDataSection: React.FC = () => {
  const [exportFormat, setExportFormat] = useState("csv");
  const [exportType, setExportType] = useState("all");
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = () => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      toast({
        title: "Export complete",
        description: `Your ${exportType} data has been exported as ${exportFormat.toUpperCase()}.`,
      });
    }, 1500);
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Export Data</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Export your CRM data for backup or integration with other systems
      </p>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Export Format</label>
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV (.csv)</SelectItem>
                <SelectItem value="xlsx">Excel (.xlsx)</SelectItem>
                <SelectItem value="json">JSON (.json)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Data to Export</label>
            <Select value={exportType} onValueChange={setExportType}>
              <SelectTrigger>
                <SelectValue placeholder="Select data" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Data</SelectItem>
                <SelectItem value="contacts">Contacts Only</SelectItem>
                <SelectItem value="organizations">Organizations Only</SelectItem>
                <SelectItem value="deals">Deals Only</SelectItem>
                <SelectItem value="activities">Activities Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex gap-4">
          <Button 
            onClick={handleExport} 
            disabled={isExporting}
            className="flex items-center gap-2"
          >
            {isExporting ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Exporting...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Export Data
              </>
            )}
          </Button>
          
          <Button variant="outline" disabled={isExporting}>
            Schedule Export
          </Button>
        </div>
        
        <div className="mt-4 p-4 bg-muted/40 rounded border border-muted">
          <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
            {exportFormat === "csv" ? (
              <FileText className="h-4 w-4" />
            ) : (
              <FileSpreadsheet className="h-4 w-4" />
            )}
            <span>Export Preview</span>
          </h4>
          <div className="text-xs text-muted-foreground">
            <p>Your export will include:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              {exportType === "all" || exportType === "contacts" ? (
                <li>250 contacts with all fields and tags</li>
              ) : null}
              {exportType === "all" || exportType === "organizations" ? (
                <li>85 organizations with all associated contacts</li>
              ) : null}
              {exportType === "all" || exportType === "deals" ? (
                <li>120 deals with stages and values</li>
              ) : null}
              {exportType === "all" || exportType === "activities" ? (
                <li>430 activities and interaction history</li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportDataSection;
