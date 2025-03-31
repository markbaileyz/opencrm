
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MedicationHeader from "./detail/MedicationHeader";
import MedicationOverview from "./detail/MedicationOverview";
import MedicationInteractions from "./detail/MedicationInteractions";
import MedicationHistory from "./detail/MedicationHistory";
import MedicationDocuments from "./detail/MedicationDocuments";
import MedicationFooter from "./detail/MedicationFooter";

interface MedicationDetailProps {
  medication: {
    name: string;
    dosage: string;
    schedule: string;
    type: string;
    startDate?: string;
    endDate?: string;
    prescribedBy?: string;
    notes?: string;
    refills?: number;
    sideEffects?: string[];
    interactions?: {
      medication: string;
      severity: "low" | "medium" | "high";
      description: string;
      mechanism?: string;
      recommendation?: string;
    }[];
    attachments?: string[];
  };
  onClose: () => void;
}

const MedicationDetail: React.FC<MedicationDetailProps> = ({ medication, onClose }) => {
  return (
    <Card className="w-full">
      <MedicationHeader medication={medication} onClose={onClose} />
      
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="interactions">
              Interactions
              {medication.interactions && medication.interactions.some(i => i.severity === "high") && (
                <span className="ml-1 text-red-500">•</span>
              )}
            </TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-4">
            <MedicationOverview medication={medication} />
          </TabsContent>
          
          <TabsContent value="interactions" className="mt-4">
            <MedicationInteractions 
              medicationName={medication.name} 
              interactions={medication.interactions} 
            />
          </TabsContent>
          
          <TabsContent value="history" className="mt-4">
            <MedicationHistory />
          </TabsContent>
          
          <TabsContent value="documents" className="mt-4">
            <MedicationDocuments attachments={medication.attachments} />
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <MedicationFooter />
    </Card>
  );
};

export default MedicationDetail;
