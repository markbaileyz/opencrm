
import React from "react";
import { ArrowLeft, FileText, FilePlus, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PrescriptionHeader: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/dashboard");
  };
  
  const handlePharmacyIntegration = () => {
    navigate("/pharmacy-integration");
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={handleBack} size="sm">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Button>
        <h1 className="text-2xl font-bold">Prescriptions</h1>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={handlePharmacyIntegration}>
          <Pill className="h-4 w-4 mr-1" />
          Pharmacy Integration
        </Button>
        <Button variant="outline" size="sm">
          <FileText className="h-4 w-4 mr-1" />
          Export
        </Button>
        <Button size="sm">
          <FilePlus className="h-4 w-4 mr-1" />
          New Prescription
        </Button>
      </div>
    </div>
  );
};

export default PrescriptionHeader;
