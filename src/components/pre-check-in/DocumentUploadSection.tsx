
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DocumentUploadSectionProps {
  documents: {
    insuranceCardFront: string | null;
    insuranceCardBack: string | null;
    driversLicenseFront: string | null;
    driversLicenseBack: string | null;
  };
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>, documentType: string) => void;
  removeDocument: (documentType: string) => void;
  startCamera: (documentType: string) => void;
}

const DocumentUploadSection: React.FC<DocumentUploadSectionProps> = ({
  documents,
  handleFileUpload,
  removeDocument,
  startCamera,
}) => {
  const renderDocumentUpload = (documentType: keyof typeof documents, label: string) => {
    const documentPreview = documents[documentType];
    
    return (
      <div className="border rounded-md p-4 mb-4">
        <h4 className="font-medium mb-2">{label}</h4>
        
        {documentPreview ? (
          <div className="mb-4">
            <div className="relative">
              <img 
                src={documentPreview} 
                alt={label} 
                className="max-w-full h-auto rounded-md mb-2 border" 
              />
              <Button 
                type="button" 
                variant="destructive" 
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => removeDocument(documentType)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <div className="flex-1">
              <Button 
                type="button" 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => startCamera(documentType)}
              >
                <Camera className="mr-2 h-4 w-4" />
                Take Photo
              </Button>
            </div>
            <div className="flex-1">
              <label className="w-full">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full justify-start"
                  asChild
                >
                  <div>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </div>
                </Button>
                <Input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => handleFileUpload(e, documentType)}
                />
              </label>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="bg-muted p-3 rounded-md mb-4">
        <p className="text-sm text-muted-foreground">
          Please upload or take photos of your documents. This will speed up your check-in process.
        </p>
      </div>
      
      {renderDocumentUpload("insuranceCardFront", "Insurance Card (Front)")}
      {renderDocumentUpload("insuranceCardBack", "Insurance Card (Back)")}
      {renderDocumentUpload("driversLicenseFront", "Driver's License (Front)")}
      {renderDocumentUpload("driversLicenseBack", "Driver's License (Back)")}
    </div>
  );
};

export default DocumentUploadSection;
