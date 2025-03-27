
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const useDataManagement = () => {
  const { toast } = useToast();
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);

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

  return {
    isImporting,
    importProgress,
    showImportDialog,
    importFile,
    setImportFile,
    handleImport,
    handleImportConfirm,
    setShowImportDialog
  };
};
