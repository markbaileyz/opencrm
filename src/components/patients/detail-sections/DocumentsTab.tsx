
import React from "react";
import { PatientDocument } from "@/types/patient";
import DocumentManagement from "../DocumentManagement";

interface DocumentsTabProps {
  documents: PatientDocument[];
  patientId: string;
  onAddDocument: (document: PatientDocument) => void;
  onDeleteDocument: (documentId: string) => void;
}

const DocumentsTab: React.FC<DocumentsTabProps> = ({
  documents,
  patientId,
  onAddDocument,
  onDeleteDocument
}) => {
  return (
    <DocumentManagement
      documents={documents}
      patientId={patientId}
      onAddDocument={onAddDocument}
      onDeleteDocument={onDeleteDocument}
    />
  );
};

export default DocumentsTab;
