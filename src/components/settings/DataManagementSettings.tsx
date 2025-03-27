
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Upload, FileText, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

const DataManagementSettings: React.FC = () => {
  const { toast } = useToast();
  const [exportFormat, setExportFormat] = useState("json");
  const [exportType, setExportType] = useState("all");
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);

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
    }, 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImportFile(e.target.files[0]);
    }
  };

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
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-medium mb-4">Import Data</h3>
            <div className="bg-muted/30 p-4 rounded-lg border border-dashed border-muted-foreground/30 text-center mb-4">
              <FileText className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag and drop your file here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Supports JSON, CSV, and XLSX files up to 10MB
              </p>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".json,.csv,.xlsx"
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload">
                <Button variant="outline" className="mr-2" asChild>
                  <span>
                    <Upload className="mr-2 h-4 w-4" />
                    Browse Files
                  </span>
                </Button>
              </label>
              
              {importFile && (
                <div className="mt-4 text-left bg-background p-3 rounded-md">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-primary" />
                    <span className="text-sm">{importFile.name}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">
                      {(importFile.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                    <Button size="sm" variant="default" onClick={handleImport} disabled={isImporting}>
                      {isImporting ? "Importing..." : "Start Import"}
                    </Button>
                  </div>
                  {isImporting && (
                    <div className="mt-2">
                      <Progress value={importProgress} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        Processing... {importProgress}%
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-md">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-yellow-500">Important</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Importing data will merge with your existing data. This action cannot be undone.
                    Make sure to export your current data as a backup before proceeding.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
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
                  <li>127 contacts added/updated</li>
                  <li>43 organizations added/updated</li>
                  <li>56 deals added/updated</li>
                  <li>94 activities added</li>
                </ul>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleImportConfirm}>
                Continue
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default DataManagementSettings;
