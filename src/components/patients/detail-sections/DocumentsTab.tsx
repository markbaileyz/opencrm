
import React from "react";
import { PatientDocument } from "@/types/patient";
import DocumentManagement from "../DocumentManagement";

interface DocumentsTabProps {
  documents: PatientDocument[];
  patientId: string;
  onAddDocument: (document: PatientDocument) => void;
  onDeleteDocument: (documentId: string) => void;
  documentUploads?: {
    insuranceCardFront?: string;
    insuranceCardBack?: string;
    driversLicenseFront?: string;
    driversLicenseBack?: string;
  };
}

const DocumentsTab: React.FC<DocumentsTabProps> = ({
  documents,
  patientId,
  onAddDocument,
  onDeleteDocument,
  documentUploads
}) => {
  return (
    <div className="space-y-6">
      {documentUploads && Object.keys(documentUploads).some(key => !!documentUploads[key as keyof typeof documentUploads]) && (
        <div className="border rounded-md p-4">
          <h3 className="text-lg font-medium mb-4">Uploaded Identification Documents</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {documentUploads.insuranceCardFront && (
              <div className="border rounded-md overflow-hidden">
                <div className="aspect-w-3 aspect-h-2">
                  <img 
                    src={documentUploads.insuranceCardFront} 
                    alt="Insurance Card (Front)" 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-2 bg-muted">
                  <p className="text-sm font-medium">Insurance Card (Front)</p>
                </div>
              </div>
            )}
            
            {documentUploads.insuranceCardBack && (
              <div className="border rounded-md overflow-hidden">
                <div className="aspect-w-3 aspect-h-2">
                  <img 
                    src={documentUploads.insuranceCardBack} 
                    alt="Insurance Card (Back)" 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-2 bg-muted">
                  <p className="text-sm font-medium">Insurance Card (Back)</p>
                </div>
              </div>
            )}
            
            {documentUploads.driversLicenseFront && (
              <div className="border rounded-md overflow-hidden">
                <div className="aspect-w-3 aspect-h-2">
                  <img 
                    src={documentUploads.driversLicenseFront} 
                    alt="Driver's License (Front)" 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-2 bg-muted">
                  <p className="text-sm font-medium">Driver's License (Front)</p>
                </div>
              </div>
            )}
            
            {documentUploads.driversLicenseBack && (
              <div className="border rounded-md overflow-hidden">
                <div className="aspect-w-3 aspect-h-2">
                  <img 
                    src={documentUploads.driversLicenseBack} 
                    alt="Driver's License (Back)" 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-2 bg-muted">
                  <p className="text-sm font-medium">Driver's License (Back)</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      <DocumentManagement
        documents={documents}
        patientId={patientId}
        onAddDocument={onAddDocument}
        onDeleteDocument={onDeleteDocument}
      />
    </div>
  );
};

export default DocumentsTab;
