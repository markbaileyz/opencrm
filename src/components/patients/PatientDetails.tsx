
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Patient, PatientDocument, PatientTask } from "@/types/patient";
import { Edit, Trash, AlertTriangle, MapPin, Mail, Phone, User, Calendar, FileText } from "lucide-react";
import DocumentManagement from "./DocumentManagement";
import TaskManagement from "./TaskManagement";

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
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <CardTitle className="text-2xl">
                {patient.firstName} {patient.lastName}
              </CardTitle>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>#{patient.id}</span>
                <Badge variant={patient.status === "active" ? "default" : "secondary"}>
                  {patient.status}
                </Badge>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={onEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={onDelete}>
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm text-muted-foreground">Contact Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{patient.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{patient.email}</span>
                      </div>
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <span>{patient.address}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm text-muted-foreground">Demographics</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-sm text-muted-foreground">Date of Birth</div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{new Date(patient.dateOfBirth).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Gender</div>
                        <div className="capitalize">{patient.gender}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm text-muted-foreground">Emergency Contact</h3>
                    {patient.emergencyContact ? (
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium">{patient.emergencyContact.name}</span>
                          <span className="text-sm text-muted-foreground ml-2">
                            ({patient.emergencyContact.relationship})
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{patient.emergencyContact.phone}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                        No emergency contact provided
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm text-muted-foreground">Primary Care</h3>
                    {patient.primaryCarePhysician ? (
                      <div>{patient.primaryCarePhysician}</div>
                    ) : (
                      <div className="text-sm text-muted-foreground">No primary care physician on record</div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="medical">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Medical Conditions</h3>
                    {patient.medicalConditions && patient.medicalConditions.length > 0 ? (
                      <ul className="list-disc pl-5 space-y-1">
                        {patient.medicalConditions.map((condition, index) => (
                          <li key={index}>{condition}</li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-sm text-muted-foreground">No medical conditions recorded</div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Allergies</h3>
                    {patient.allergies && patient.allergies.length > 0 ? (
                      <ul className="list-disc pl-5 space-y-1">
                        {patient.allergies.map((allergy, index) => (
                          <li key={index}>{allergy}</li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-sm text-muted-foreground">No allergies recorded</div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Medications</h3>
                    {patient.medications && patient.medications.length > 0 ? (
                      <ul className="list-disc pl-5 space-y-1">
                        {patient.medications.map((medication, index) => (
                          <li key={index}>{medication}</li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-sm text-muted-foreground">No medications recorded</div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Notes</h3>
                    {patient.notes ? (
                      <p className="text-sm">{patient.notes}</p>
                    ) : (
                      <div className="text-sm text-muted-foreground">No notes available</div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="insurance">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Insurance Provider</h3>
                    <p>{patient.insuranceProvider}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Coverage Type</h3>
                    <p>{patient.coverageType}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Policy Number</h3>
                    <p>{patient.policyNumber}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Group Number</h3>
                    <p>{patient.groupNumber || <span className="text-muted-foreground">N/A</span>}</p>
                  </div>
                </div>
                
                {patient.insuranceHistory && patient.insuranceHistory.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-medium">Insurance History</h3>
                    <div className="border rounded-md overflow-hidden">
                      <table className="min-w-full">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="py-2 px-4 text-left text-sm font-medium">Provider</th>
                            <th className="py-2 px-4 text-left text-sm font-medium">Policy #</th>
                            <th className="py-2 px-4 text-left text-sm font-medium">Coverage</th>
                            <th className="py-2 px-4 text-left text-sm font-medium">Date Range</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {patient.insuranceHistory.map((insurance, index) => (
                            <tr key={index} className="bg-card">
                              <td className="py-2 px-4 text-sm">{insurance.provider}</td>
                              <td className="py-2 px-4 text-sm">{insurance.policyNumber}</td>
                              <td className="py-2 px-4 text-sm">{insurance.coverageType}</td>
                              <td className="py-2 px-4 text-sm">
                                {insurance.startDate} - {insurance.endDate || "Present"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="documents">
              <DocumentManagement
                documents={documents}
                patientId={patient.id}
                onAddDocument={handleAddDocument}
                onDeleteDocument={handleDeleteDocument}
              />
            </TabsContent>
            
            <TabsContent value="tasks">
              <TaskManagement
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
