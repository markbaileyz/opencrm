
import React from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ImportDataSectionProps {
  onFileSelect: (file: File) => void;
  onImportStart: () => void;
  importFile: File | null;
  isImporting: boolean;
  importProgress: number;
}

const ImportDataSection: React.FC<ImportDataSectionProps> = ({
  onFileSelect,
  onImportStart,
  importFile,
  isImporting,
  importProgress,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
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
              <Button size="sm" variant="default" onClick={onImportStart} disabled={isImporting}>
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
  );
};

export default ImportDataSection;
