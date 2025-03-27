
import React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, FileSpreadsheet } from "lucide-react";

interface ImportDataSectionProps {
  onFileSelect: (file: File | null) => void;
  onImportStart: () => void;
  importFile: File | null;
  isImporting: boolean;
  importProgress: number;
  onImportSuccess?: (stats: { contacts: number; organizations: number; deals: number }) => void;
}

const ImportDataSection: React.FC<ImportDataSectionProps> = ({
  onFileSelect,
  onImportStart,
  importFile,
  isImporting,
  importProgress,
  onImportSuccess
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileSelect(file);
  };

  const handleImportComplete = () => {
    if (onImportSuccess) {
      onImportSuccess({
        contacts: 127,
        organizations: 43,
        deals: 56
      });
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Import Data</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Import contacts, organizations, and deals from CSV or Excel files
      </p>

      <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-6 text-center">
        {!importFile ? (
          <>
            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm mb-4">
              Drag and drop your file here, or click to browse
            </p>
            <Button variant="outline" asChild>
              <label className="cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileChange}
                />
                Choose File
              </label>
            </Button>
          </>
        ) : (
          <div className="space-y-4">
            <FileSpreadsheet className="h-10 w-10 mx-auto text-primary" />
            <div className="flex items-center justify-center gap-2 text-sm font-medium">
              <span>{importFile.name}</span>
              <span className="text-xs text-muted-foreground">
                ({Math.round(importFile.size / 1024)} KB)
              </span>
            </div>

            {isImporting ? (
              <div className="space-y-2">
                <Progress value={importProgress} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  Importing data... {importProgress}%
                </p>
              </div>
            ) : (
              <div className="flex gap-2 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onFileSelect(null)}
                >
                  Remove
                </Button>
                <Button 
                  size="sm"
                  onClick={() => {
                    onImportStart();
                    // Simulate import completion for demo
                    if (importProgress === 100) {
                      handleImportComplete();
                    }
                  }}
                >
                  Start Import
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 text-sm text-muted-foreground">
        <p className="font-medium mb-1">Supported formats:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>CSV files (.csv)</li>
          <li>Excel spreadsheets (.xlsx, .xls)</li>
        </ul>
      </div>
    </div>
  );
};

export default ImportDataSection;
