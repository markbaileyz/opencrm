
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Patient, PatientDocument, PatientTask } from "@/types/patient";
import { AlertTriangle } from "lucide-react";

// Import new component sections
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
  const [documents, setDocuments] = useState<PatientDocument[]>(patient.documents || []);
  const [tasks, setTasks] = useState<PatientTask[]>(patient.tasks || []);

  // Document management functions
  const handleAddDocument = (document: PatientDocument) => {
    setDocuments([...documents, document]);
  };

  const handleDeleteDocument = (documentId: string) => {
    setDocuments(documents.filter(doc => doc.id !== documentId));
  };

  // Task management functions
  const handleAddTask = (task: PatientTask) => {
    setTasks([...tasks, task]);
  };

  const handleUpdateTask = (taskId: string, updates: Partial<PatientTask>) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

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
