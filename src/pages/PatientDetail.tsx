
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Calendar, 
  ClipboardList, 
  Mail, 
  MessageSquare, 
  Phone, 
  User, 
  FileText,
  Activity
} from "lucide-react";
import PatientVitals from "@/components/patients/PatientVitals";
import PatientAppointments from "@/components/patients/PatientAppointments";
import PatientNotes from "@/components/patients/PatientNotes";
import PatientDocuments from "@/components/patients/PatientDocuments";
import PatientHeader from "@/components/patients/PatientHeader";
import PatientAlerts from "@/components/patients/PatientAlerts";
import PatientOverview from "@/components/patients/detail-tabs/PatientOverview";
import LoadingState from "@/components/patients/common/LoadingState";
import ErrorState from "@/components/patients/common/ErrorState";
import { usePatientData } from "@/hooks/usePatientData";
import { Patient as PatientType } from "@/types/patient";

const PatientDetail: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const { patient, isLoading, error } = usePatientData(patientId);
  const [activeTab, setActiveTab] = useState("overview");

  if (isLoading) {
    return <LoadingState />;
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
        <ErrorState />
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
          <PatientOverview patient={typedPatient} />
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
