
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, FileSpreadsheet, AlertCircle, FileCheck, FileWarning } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImportDataSectionProps {
  onFileSelect: (file: File | null) => void;
  onImportStart: () => void;
  importFile: File | null;
  isImporting: boolean;
  importProgress: number;
  onImportSuccess?: (stats: { 
    contacts: number; 
    organizations: number; 
    deals: number; 
    activities?: number;
    duplicatesSkipped?: number;
    totalRecords?: number; 
  }) => void;
  onImportFailed?: (error: string) => void;
}

const ImportDataSection: React.FC<ImportDataSectionProps> = ({
  onFileSelect,
  onImportStart,
  importFile,
  isImporting,
  importProgress,
  onImportSuccess,
  onImportFailed
}) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      // Validate file type
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const validTypes = ['csv', 'xlsx', 'xls'];
      
      if (!fileExt || !validTypes.includes(fileExt)) {
        if (onImportFailed) {
          onImportFailed("Invalid file format. Please upload a CSV or Excel file.");
        } else {
          toast({
            title: "Invalid file format",
            description: "Please upload a CSV or Excel file",
            variant: "destructive",
          });
        }
        e.target.value = '';
        return;
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        if (onImportFailed) {
          onImportFailed("File size exceeds the maximum limit of 10MB.");
        } else {
          toast({
            title: "File too large",
            description: "Maximum file size is 10MB",
            variant: "destructive",
          });
        }
        e.target.value = '';
        return;
      }
    }
    
    onFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      
      // Validate file type
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const validTypes = ['csv', 'xlsx', 'xls'];
      
      if (!fileExt || !validTypes.includes(fileExt)) {
        if (onImportFailed) {
          onImportFailed("Invalid file format. Please upload a CSV or Excel file.");
        } else {
          toast({
            title: "Invalid file format",
            description: "Please upload a CSV or Excel file",
            variant: "destructive",
          });
        }
        return;
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        if (onImportFailed) {
          onImportFailed("File size exceeds the maximum limit of 10MB.");
        } else {
          toast({
            title: "File too large",
            description: "Maximum file size is 10MB",
            variant: "destructive",
          });
        }
        return;
      }
      
      onFileSelect(file);
    }
  };

  const handleImportComplete = () => {
    if (importProgress === 100 && onImportSuccess) {
      // Simulate random stats for successful import
      const contacts = Math.floor(Math.random() * 100) + 50;
      onImportSuccess({
        contacts,
        organizations: Math.floor(contacts * 0.4),
        deals: Math.floor(contacts * 0.6),
        activities: Math.floor(contacts * 0.9),
        duplicatesSkipped: Math.floor(contacts * 0.1),
        totalRecords: contacts * 3
      });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const getFileIcon = () => {
    if (!importFile) return <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />;
    
    const fileExt = importFile.name.split('.').pop()?.toLowerCase();
    
    switch(fileExt) {
      case 'csv':
        return <FileCheck className="h-10 w-10 mx-auto text-primary" />;
      case 'xlsx':
      case 'xls':
        return <FileSpreadsheet className="h-10 w-10 mx-auto text-primary" />;
      default:
        return <FileWarning className="h-10 w-10 mx-auto text-primary" />;
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Import Data</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Import contacts, organizations, and deals from CSV or Excel files
      </p>

      <div 
        className={`border-2 border-dashed rounded-lg p-6 text-center ${importFile ? 'border-primary/30' : 'border-muted-foreground/20'}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {!importFile ? (
          <>
            {getFileIcon()}
            <p className="text-sm mb-4">
              Drag and drop your file here, or click to browse
            </p>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
            />
            <Button variant="outline" onClick={triggerFileInput}>
              Choose File
            </Button>
          </>
        ) : (
          <div className="space-y-4">
            {getFileIcon()}
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

      <div className="mt-6 p-4 border rounded-lg bg-muted/30">
        <h4 className="text-sm font-medium mb-3">Import Guidelines</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-1">Supported formats:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>CSV files (.csv)</li>
              <li>Excel spreadsheets (.xlsx, .xls)</li>
            </ul>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-1">Data preparation tips:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Use headers in your spreadsheet</li>
              <li>One row per record</li>
              <li>Include email addresses for contacts</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          <p className="font-medium mb-1">Required columns for each type:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div>
              <p className="text-xs font-medium text-primary">Contacts</p>
              <ul className="list-disc list-inside text-xs">
                <li>First Name</li>
                <li>Last Name</li>
                <li>Email</li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium text-primary">Organizations</p>
              <ul className="list-disc list-inside text-xs">
                <li>Name</li>
                <li>Type</li>
                <li>Email or Phone</li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium text-primary">Deals</p>
              <ul className="list-disc list-inside text-xs">
                <li>Name</li>
                <li>Value</li>
                <li>Stage</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportDataSection;
