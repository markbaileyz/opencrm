
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Calendar, 
  ClipboardList, 
  Mail, 
  MessageSquare, 
  Phone, 
  User, 
  FileText,
  Activity,
  Clock,
  AlertCircle
} from "lucide-react";
import PatientVitals from "@/components/patients/PatientVitals";
import PatientAppointments from "@/components/patients/PatientAppointments";
import PatientNotes from "@/components/patients/PatientNotes";
import PatientDocuments from "@/components/patients/PatientDocuments";
import PatientHeader from "@/components/patients/PatientHeader";
import PatientAlerts from "@/components/patients/PatientAlerts";
import { usePatientData } from "@/hooks/usePatientData";
import { Patient as PatientType } from "@/types/patient";

const PatientDetail: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const { patient, isLoading, error } = usePatientData(patientId);
  const [activeTab, setActiveTab] = useState("overview");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading patient information...</p>
        </div>
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/patients")} 
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Patients
        </Button>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center h-40">
              <AlertCircle className="h-12 w-12 text-destructive mb-4" />
              <h2 className="text-xl font-bold">Patient Not Found</h2>
              <p className="text-muted-foreground">
                The patient you're looking for doesn't exist or you don't have permission to view it.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Ensuring the patient object has all required fields for rendering
  const typedPatient = patient as PatientType;

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <Button 
        variant="ghost" 
        onClick={() => navigate("/patients")} 
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Patients
      </Button>

      <PatientHeader patient={typedPatient} />
      <PatientAlerts patient={typedPatient} className="mt-6" />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="w-full sm:w-auto border-b">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="vitals" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span>Vitals</span>
          </TabsTrigger>
          <TabsTrigger value="appointments" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Appointments</span>
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            <span>Notes</span>
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Documents</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Patient Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Full Name</h4>
                    <p>{patient.firstName} {patient.lastName}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Date of Birth</h4>
                    <p>{patient.dateOfBirth} {patient.age ? `(${patient.age} years)` : ''}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Gender</h4>
                    <p>{patient.gender}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Patient ID</h4>
                    <p>{patient.id}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Phone</h4>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <p>{patient.phone}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Email</h4>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <p>{patient.email}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Address</h4>
                    <p>{patient.address}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Insurance</h4>
                    <p>{patient.insuranceProvider}</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div>
                  <h4 className="text-sm font-medium mb-2">Medical History</h4>
                  <div className="space-y-2">
                    {patient.medicalHistory?.length ? (
                      patient.medicalHistory.map((item, index) => (
                        <div key={index} className="border p-3 rounded-md">
                          <div className="flex justify-between">
                            <p className="font-medium">{item.condition}</p>
                            <Badge variant="outline">{item.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{item.notes}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-sm">No medical history recorded</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointment</CardTitle>
                </CardHeader>
                <CardContent>
                  {patient.upcomingAppointment ? (
                    <div>
                      <div className="flex items-center mb-3">
                        <Calendar className="h-5 w-5 mr-2 text-primary" />
                        <div>
                          <p className="font-medium">{patient.upcomingAppointment.date}</p>
                          <p className="text-sm text-muted-foreground">{patient.upcomingAppointment.time}</p>
                        </div>
                      </div>
                      <p className="text-sm"><span className="font-medium">Reason:</span> {patient.upcomingAppointment.reason}</p>
                      <p className="text-sm"><span className="font-medium">Provider:</span> {patient.upcomingAppointment.provider}</p>
                      <div className="mt-3 flex space-x-2">
                        <Button size="sm" variant="outline">Reschedule</Button>
                        <Button size="sm" variant="destructive">Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-4">
                      <Calendar className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground text-center">No upcoming appointments</p>
                      <Button size="sm" className="mt-3">Schedule Appointment</Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  {patient.recentActivity?.length ? (
                    <div className="space-y-3">
                      {patient.recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="mt-0.5">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm">{activity.description}</p>
                            <p className="text-xs text-muted-foreground">{activity.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">No recent activity</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="vitals" className="mt-6">
          <PatientVitals patientId={patient.id} />
        </TabsContent>

        <TabsContent value="appointments" className="mt-6">
          <PatientAppointments patientId={patient.id} />
        </TabsContent>

        <TabsContent value="notes" className="mt-6">
          <PatientNotes patientId={patient.id} />
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <PatientDocuments patientId={patient.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientDetail;
