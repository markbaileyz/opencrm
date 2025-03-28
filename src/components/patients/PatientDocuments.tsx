
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Upload, 
  Search, 
  Filter, 
  ChevronDown,
  Download,
  Eye,
  Calendar,
  Paperclip,
  File,
  FileImage,
  FilePdf,
  MoreVertical
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { usePatientDocuments } from "@/hooks/usePatientDocuments";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PatientDocumentsProps {
  patientId: string;
}

const PatientDocuments: React.FC<PatientDocumentsProps> = ({ patientId }) => {
  const { documents, isLoading, error } = usePatientDocuments(patientId);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [previewDocument, setPreviewDocument] = useState<any>(null);
  
  const filteredDocuments = documents?.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = category === "all" || doc.category === category;
    
    return matchesSearch && matchesCategory;
  });
  
  // Sort documents based on selected sorting method
  const sortedDocuments = filteredDocuments?.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortBy === "newest" ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
  });
  
  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "image/jpeg":
      case "image/png":
        return <FileImage className="h-4 w-4 text-blue-500" />;
      case "application/pdf":
        return <FilePdf className="h-4 w-4 text-red-500" />;
      default:
        return <File className="h-4 w-4 text-gray-500" />;
    }
  };
  
  const getDocumentCategories = () => {
    const categories = documents?.map(doc => doc.category) || [];
    return ["all", ...new Set(categories)];
  };
  
  if (isLoading) {
    return <div className="flex justify-center p-8">Loading documents...</div>;
  }
  
  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center p-6">
            <p className="text-destructive">Error loading patient documents</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold flex items-center">
          <FileText className="mr-2 h-5 w-5 text-primary" />
          Patient Documents
        </h2>
        
        <Button 
          size="sm" 
          className="gap-1"
          onClick={() => setShowUploadDialog(true)}
        >
          <Upload className="h-4 w-4" />
          Upload Document
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                <span className="capitalize">{category === "all" ? "All Types" : category}</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup value={category} onValueChange={setCategory}>
                {getDocumentCategories().map((cat) => (
                  <DropdownMenuRadioItem key={cat} value={cat} className="capitalize">
                    {cat === "all" ? "All Types" : cat}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{sortBy === "newest" ? "Newest First" : "Oldest First"}</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                <DropdownMenuRadioItem value="newest">
                  Newest First
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="oldest">
                  Oldest First
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {sortedDocuments?.length ? (
        <div className="space-y-3">
          {sortedDocuments.map((document, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-muted rounded-md p-3">
                      {getDocumentIcon(document.type)}
                    </div>
                    
                    <div>
                      <h3 className="font-medium">{document.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Paperclip className="h-3 w-3 mr-1.5" />
                        <span>{document.size}</span>
                        <span className="mx-2">•</span>
                        <Calendar className="h-3 w-3 mr-1.5" />
                        <span>{document.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="capitalize">
                      {document.category}
                    </Badge>
                    
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setPreviewDocument(document)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Update Category</DropdownMenuItem>
                        <DropdownMenuItem>Share Document</DropdownMenuItem>
                        <DropdownMenuItem>Print</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Delete Document
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-6 flex flex-col items-center justify-center">
            <FileText className="h-12 w-12 text-muted-foreground mb-3" />
            <h3 className="text-lg font-medium mb-1">No documents found</h3>
            <p className="text-muted-foreground text-center mb-4">
              {searchTerm || category !== "all"
                ? "No documents match your search criteria."
                : "There are no documents on record for this patient."}
            </p>
            {!searchTerm && category === "all" && (
              <Button 
                className="gap-1"
                onClick={() => setShowUploadDialog(true)}
              >
                <Upload className="h-4 w-4" />
                Upload First Document
              </Button>
            )}
          </CardContent>
        </Card>
      )}
      
      {/* Document Preview Dialog */}
      <Dialog open={!!previewDocument} onOpenChange={() => setPreviewDocument(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{previewDocument?.name}</DialogTitle>
          </DialogHeader>
          <div className="bg-muted h-[60vh] flex items-center justify-center rounded-md overflow-hidden">
            {previewDocument?.type.startsWith('image/') ? (
              <img 
                src={previewDocument?.url || '#'} 
                alt={previewDocument?.name} 
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <div className="text-center p-10">
                <FilePdf className="h-20 w-20 mx-auto mb-4 text-red-500" />
                <p className="text-lg font-medium mb-2">{previewDocument?.name}</p>
                <p className="text-sm text-muted-foreground mb-6">
                  {previewDocument?.size} • Uploaded on {previewDocument?.date}
                </p>
                <Button className="gap-2">
                  <Download className="h-4 w-4" />
                  Download Document
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Upload Document Dialog (simplified for now) */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="border-2 border-dashed rounded-md p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm mb-1">Drag and drop files here or click to browse</p>
              <p className="text-xs text-muted-foreground">
                Supported formats: PDF, JPEG, PNG, DOC
              </p>
              <Button className="mt-4" variant="outline" size="sm">
                Choose Files
              </Button>
            </div>
            <div className="text-right">
              <Button onClick={() => setShowUploadDialog(false)}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientDocuments;
