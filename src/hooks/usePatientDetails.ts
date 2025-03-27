
import { useState } from "react";
import { Patient, PatientDocument, PatientTask } from "@/types/patient";

interface UsePatientDetailsProps {
  patient: Patient;
}

export function usePatientDetails({ patient }: UsePatientDetailsProps) {
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

  return {
    documents,
    tasks,
    handleAddDocument,
    handleDeleteDocument,
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask
  };
}
