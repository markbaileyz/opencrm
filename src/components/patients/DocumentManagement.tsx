
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PatientDocument } from "@/types/patient";
import { FileText, Download, Trash, Upload, Eye, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";

interface DocumentManagementProps {
  documents: PatientDocument[];
  patientId: string;
  onAddDocument: (document: PatientDocument) => void;
  onDeleteDocument: (documentId: string) => void;
}

const DocumentManagement: React.FC<DocumentManagementProps> = ({
  documents,
  patientId,
  onAddDocument,
  onDeleteDocument,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [documentName, setDocumentName] = useState("");
  const [documentType, setDocumentType] = useState<PatientDocument["type"]>("medical");
  const [documentNotes, setDocumentNotes] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [viewDocument, setViewDocument] = useState<PatientDocument | null>(null);

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.type.includes(searchQuery.toLowerCase())
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (!documentName) {
        setDocumentName(file.name);
      }
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !documentName) return;

    // In a real app, you would upload the file to a server here
    // For this demo, we're just simulating the upload
    const newDocument: PatientDocument = {
      id: new Date().getTime().toString(),
      patientId,
      name: documentName,
      type: documentType,
      uploadDate: new Date().toISOString(),
      fileUrl: URL.createObjectURL(selectedFile), // This would normally be a server URL
      notes: documentNotes
    };

    onAddDocument(newDocument);
    resetUploadForm();
    setUploadDialogOpen(false);
  };

  const resetUploadForm = () => {
    setDocumentName("");
    setDocumentType("medical");
    setDocumentNotes("");
    setSelectedFile(null);
  };

  const getDocumentTypeColor = (type: string) => {
    switch (type) {
      case "insurance":
        return "bg-blue-500";
      case "medical":
        return "bg-green-500";
      case "consent":
        return "bg-amber-500";
      default:
        return "bg-slate-500";
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Documents</CardTitle>
            <Button size="sm" onClick={() => setUploadDialogOpen(true)}>
              <Upload className="h-4 w-4 mr-1" />
              Upload
            </Button>
          </div>
          <div className="mt-2">
            <Input 
              placeholder="Search documents..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        
        <CardContent className="max-h-[400px] overflow-y-auto">
          {filteredDocuments.length > 0 ? (
            <div className="space-y-3">
              {filteredDocuments.map((document) => (
                <div 
                  key={document.id} 
                  className="p-3 border rounded-md hover:bg-muted/50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{document.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Uploaded: {new Date(document.uploadDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge 
                            className={getDocumentTypeColor(document.type)}
                            variant="secondary"
                          >
                            {document.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => setViewDocument(document)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => window.open(document.fileUrl, '_blank')}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-destructive"
                        onClick={() => onDeleteDocument(document.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {document.notes && (
                    <div className="mt-2 text-sm pl-11">
                      <span className="text-muted-foreground">Notes: </span>
                      {document.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <FileText className="h-10 w-10 text-muted-foreground mb-3" />
              <p className="text-muted-foreground mb-1">No documents found</p>
              <p className="text-sm text-muted-foreground mb-4">
                {searchQuery 
                  ? "No documents match your search criteria"
                  : "No documents have been uploaded yet"}
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setUploadDialogOpen(true)}
              >
                <Upload className="h-4 w-4 mr-1" />
                Upload Document
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
            <DialogDescription>
              Upload a document to the patient's record
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <label htmlFor="document" className="text-sm font-medium">
                Select File
              </label>
              <Input
                id="document"
                type="file"
                onChange={handleFileChange}
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <label htmlFor="documentName" className="text-sm font-medium">
                Document Name
              </label>
              <Input
                id="documentName"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                placeholder="Enter document name"
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <label htmlFor="documentType" className="text-sm font-medium">
                Document Type
              </label>
              <select
                id="documentType"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value as PatientDocument["type"])}
              >
                <option value="medical">Medical</option>
                <option value="insurance">Insurance</option>
                <option value="consent">Consent</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <label htmlFor="documentNotes" className="text-sm font-medium">
                Notes (Optional)
              </label>
              <textarea
                id="documentNotes"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={documentNotes}
                onChange={(e) => setDocumentNotes(e.target.value)}
                placeholder="Add notes about this document"
              />
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                resetUploadForm();
                setUploadDialogOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={handleUpload} 
              disabled={!selectedFile || !documentName}
            >
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Document Dialog */}
      <Dialog open={!!viewDocument} onOpenChange={() => setViewDocument(null)}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>{viewDocument?.name}</DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <Badge 
                  className={viewDocument && getDocumentTypeColor(viewDocument.type)}
                  variant="secondary"
                >
                  {viewDocument?.type}
                </Badge>
                <span className="text-sm ml-2 text-muted-foreground">
                  Uploaded: {viewDocument && new Date(viewDocument.uploadDate).toLocaleDateString()}
                </span>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => viewDocument && window.open(viewDocument.fileUrl, '_blank')}
              >
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
            
            {viewDocument?.notes && (
              <div className="mb-4 p-3 bg-muted rounded-md">
                <div className="font-medium mb-1">Notes:</div>
                <p>{viewDocument.notes}</p>
              </div>
            )}
            
            <div className="border rounded-md overflow-hidden">
              {viewDocument && (
                <iframe 
                  src={viewDocument.fileUrl} 
                  className="w-full min-h-[400px]"
                  title={viewDocument.name}
                />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DocumentManagement;
