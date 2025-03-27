
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Patient } from "@/types/patient";
import { usePatientDetails } from "@/hooks/usePatientDetails";

// Import component sections
import PatientHeader from "./detail-sections/PatientHeader";
import BasicInfoTab from "./detail-sections/BasicInfoTab";
import MedicalTab from "./detail-sections/MedicalTab";
import InsuranceTab from "./detail-sections/InsuranceTab";
import DocumentsTab from "./detail-sections/DocumentsTab";
import TasksTab from "./detail-sections/TasksTab";

interface PatientDetailsProps {
  patient: Patient;
  onEdit: () => void;
  onDelete: () => void;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({
  patient,
  onEdit,
  onDelete,
}) => {
  const {
    documents,
    tasks,
    handleAddDocument,
    handleDeleteDocument,
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask
  } = usePatientDetails({ patient });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <PatientHeader 
            patient={patient} 
            onEdit={onEdit} 
            onDelete={onDelete} 
          />
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="info">
            <TabsList className="mb-4">
              <TabsTrigger value="info">Basic Info</TabsTrigger>
              <TabsTrigger value="medical">Medical</TabsTrigger>
              <TabsTrigger value="insurance">Insurance</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info">
              <BasicInfoTab patient={patient} />
            </TabsContent>
            
            <TabsContent value="medical">
              <MedicalTab patient={patient} />
            </TabsContent>
            
            <TabsContent value="insurance">
              <InsuranceTab patient={patient} />
            </TabsContent>
            
            <TabsContent value="documents">
              <DocumentsTab
                documents={documents}
                patientId={patient.id}
                onAddDocument={handleAddDocument}
                onDeleteDocument={handleDeleteDocument}
              />
            </TabsContent>
            
            <TabsContent value="tasks">
              <TasksTab
                tasks={tasks}
                patientId={patient.id}
                onAddTask={handleAddTask}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientDetails;
