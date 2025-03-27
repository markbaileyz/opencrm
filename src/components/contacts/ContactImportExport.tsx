
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Import, Download, Check, X } from "lucide-react";
import { Contact } from "@/types/contact";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

interface ContactImportExportProps {
  onImport: (contacts: Partial<Contact>[]) => void;
  contacts: Contact[];
}

const ContactImportExport = ({ onImport, contacts }: ContactImportExportProps) => {
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [parsedContacts, setParsedContacts] = useState<Partial<Contact>[]>([]);
  const [importProgress, setImportProgress] = useState(0);
  const [importError, setImportError] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImportStatus('processing');
    setImportProgress(10);

    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        setImportProgress(50);
        const content = e.target?.result as string;
        
        // Simple CSV parsing (could be enhanced with a library in a production app)
        const lines = content.split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        
        const parsedData = lines.slice(1)
          .filter(line => line.trim())
          .map(line => {
            const values = line.split(',').map(v => v.trim());
            const contact: Record<string, any> = {};
            
            headers.forEach((header, index) => {
              if (values[index] !== undefined) {
                // Convert tags from string to array if present
                if (header === 'tags' && values[index]) {
                  contact[header] = values[index].split(';').map((tag: string) => tag.trim());
                } else {
                  contact[header] = values[index];
                }
              }
            });
            
            return contact as Partial<Contact>;
          });
        
        setImportProgress(90);
        setParsedContacts(parsedData);
        setImportStatus('success');
        setImportProgress(100);
      } catch (error) {
        setImportStatus('error');
        setImportError('Failed to parse CSV file. Please check the format.');
        console.error('Import error:', error);
      }
    };

    reader.onerror = () => {
      setImportStatus('error');
      setImportError('Failed to read the file. Please try again.');
    };

    reader.readAsText(file);
  };

  const handleImportConfirm = () => {
    onImport(parsedContacts);
    setImportDialogOpen(false);
    resetImportState();
  };

  const resetImportState = () => {
    setImportStatus('idle');
    setParsedContacts([]);
    setImportProgress(0);
    setImportError(null);
  };

  const handleExport = () => {
    // Create CSV content
    const headers = ["id", "name", "email", "phone", "company", "position", "lastContact", "status", "notes", "tags", "priority"];
    const csvContent = [
      headers.join(','),
      ...contacts.map(contact => [
        contact.id,
        contact.name,
        contact.email,
        contact.phone,
        contact.company,
        contact.position,
        contact.lastContact,
        contact.status,
        contact.notes?.replace(/,/g, ' ').replace(/\n/g, ' '), // Sanitize notes
        contact.tags?.join(';') || '',
        contact.priority || ''
      ].join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `contacts_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex justify-end gap-2 mb-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setImportDialogOpen(true)}
      >
        <Import className="h-4 w-4 mr-2" />
        Import
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleExport}
      >
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>

      <Dialog open={importDialogOpen} onOpenChange={(open) => {
        setImportDialogOpen(open);
        if (!open) resetImportState();
      }}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Import Contacts</DialogTitle>
            <DialogDescription>
              Upload a CSV file with contact information.
            </DialogDescription>
          </DialogHeader>
          
          {importStatus === 'idle' && (
            <div className="py-6 flex flex-col items-center">
              <input
                type="file"
                accept=".csv"
                className="hidden"
                id="contact-import"
                onChange={handleFileUpload}
              />
              <label 
                htmlFor="contact-import" 
                className="cursor-pointer border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 flex flex-col items-center justify-center text-center w-full"
              >
                <Import className="h-8 w-8 text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-1">Click to upload CSV</p>
                <p className="text-sm text-muted-foreground max-w-xs">
                  The CSV should include columns for name, email, phone, company, etc.
                </p>
              </label>
            </div>
          )}

          {importStatus === 'processing' && (
            <div className="py-8 space-y-4">
              <div className="text-center text-muted-foreground">Processing file...</div>
              <Progress value={importProgress} className="w-full" />
            </div>
          )}

          {importStatus === 'error' && (
            <div className="py-4">
              <Alert variant="destructive">
                <AlertDescription>{importError}</AlertDescription>
              </Alert>
              <div className="mt-4 text-center">
                <Button onClick={resetImportState}>Try Again</Button>
              </div>
            </div>
          )}

          {importStatus === 'success' && (
            <div className="py-4 space-y-4">
              <div className="flex items-center text-sm text-green-600 mb-2">
                <Check className="h-4 w-4 mr-2" />
                <span>Successfully parsed {parsedContacts.length} contacts</span>
              </div>
              
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Company</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {parsedContacts.slice(0, 5).map((contact, index) => (
                      <TableRow key={index}>
                        <TableCell>{contact.name || "-"}</TableCell>
                        <TableCell>{contact.email || "-"}</TableCell>
                        <TableCell>{contact.company || "-"}</TableCell>
                      </TableRow>
                    ))}
                    {parsedContacts.length > 5 && (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-muted-foreground">
                          ... and {parsedContacts.length - 5} more contacts
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setImportDialogOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            {importStatus === 'success' && (
              <Button onClick={handleImportConfirm}>
                <Check className="h-4 w-4 mr-2" />
                Import {parsedContacts.length} Contacts
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactImportExport;
