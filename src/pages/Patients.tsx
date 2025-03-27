
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Users, FileText, Calendar, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import PatientList from "@/components/patients/PatientList";
import PatientDetails from "@/components/patients/PatientDetails";
import PatientFormDialog from "@/components/patients/PatientFormDialog";
import { Patient } from "@/types/patient";

// Sample data for demonstration
const initialPatients: Patient[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: "1980-05-15",
    gender: "male",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, CA 12345",
    insuranceProvider: "Blue Cross Blue Shield",
    policyNumber: "BCBS-12345678",
    groupNumber: "GRP-87654",
    coverageType: "PPO",
    primaryCarePhysician: "Dr. Sarah Johnson",
    emergencyContact: {
      name: "Jane Doe",
      relationship: "Spouse",
      phone: "(555) 987-6543"
    },
    medicalConditions: ["Hypertension", "Type 2 Diabetes"],
    allergies: ["Penicillin"],
    medications: ["Lisinopril 10mg", "Metformin 500mg"],
    notes: "Patient prefers afternoon appointments.",
    status: "active"
  },
  {
    id: "2",
    firstName: "Emily",
    lastName: "Smith",
    dateOfBirth: "1975-08-22",
    gender: "female",
    email: "emily.smith@example.com",
    phone: "(555) 234-5678",
    address: "456 Oak Ave, Somewhere, NY 54321",
    insuranceProvider: "Aetna",
    policyNumber: "AET-87654321",
    groupNumber: "GRP-12345",
    coverageType: "HMO",
    primaryCarePhysician: "Dr. Michael Chen",
    emergencyContact: {
      name: "Robert Smith",
      relationship: "Husband",
      phone: "(555) 876-5432"
    },
    medicalConditions: ["Asthma"],
    allergies: ["Sulfa drugs", "Peanuts"],
    medications: ["Albuterol inhaler"],
    notes: "Patient requires reminder calls for appointments.",
    status: "active"
  },
  {
    id: "3",
    firstName: "Robert",
    lastName: "Johnson",
    dateOfBirth: "1968-11-03",
    gender: "male",
    email: "robert.johnson@example.com",
    phone: "(555) 345-6789",
    address: "789 Pine St, Elsewhere, TX 67890",
    insuranceProvider: "UnitedHealthcare",
    policyNumber: "UHC-23456789",
    groupNumber: "GRP-34567",
    coverageType: "EPO",
    primaryCarePhysician: "Dr. Lisa Wong",
    emergencyContact: {
      name: "Mary Johnson",
      relationship: "Wife",
      phone: "(555) 765-4321"
    },
    medicalConditions: ["Arthritis", "High Cholesterol"],
    allergies: ["Codeine"],
    medications: ["Atorvastatin 20mg", "Ibuprofen as needed"],
    notes: "Prefers early morning appointments.",
    status: "inactive"
  }
];

const Patients = () => {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const { toast } = useToast();

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  const handleAddPatient = () => {
    setSelectedPatient(null);
    setFormOpen(true);
  };

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setFormOpen(true);
  };

  const handleSavePatient = (patient: Patient, isNew: boolean) => {
    if (isNew) {
      const newPatient = { ...patient, id: String(patients.length + 1) };
      setPatients([...patients, newPatient]);
      toast({
        title: "Patient added",
        description: `${patient.firstName} ${patient.lastName} has been added successfully.`,
        variant: "success",
      });
    } else {
      setPatients(patients.map(p => p.id === patient.id ? patient : p));
      toast({
        title: "Patient updated",
        description: `${patient.firstName} ${patient.lastName}'s information has been updated.`,
        variant: "success",
      });
    }
    setFormOpen(false);
  };

  const handleDeletePatient = (id: string) => {
    setPatients(patients.filter(p => p.id !== id));
    setSelectedPatient(null);
    toast({
      title: "Patient removed",
      description: "The patient has been removed successfully.",
      variant: "destructive",
    });
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">Patients</h1>
            <p className="text-muted-foreground">
              Manage patient information, appointments, and care plans
            </p>
          </div>
          <Button onClick={handleAddPatient}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Patient
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <PatientList 
              patients={patients} 
              selectedPatientId={selectedPatient?.id}
              onSelectPatient={handleSelectPatient}
            />
          </div>
          
          <div className="lg:col-span-2">
            {selectedPatient ? (
              <PatientDetails 
                patient={selectedPatient}
                onEdit={() => handleEditPatient(selectedPatient)}
                onDelete={() => handleDeletePatient(selectedPatient.id)}
              />
            ) : (
              <div className="bg-muted/40 rounded-lg p-8 h-full flex flex-col items-center justify-center text-center">
                <Users className="h-12 w-12 mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-2">Select a patient to view details</p>
                <p className="text-muted-foreground text-sm mb-4">or</p>
                <Button onClick={handleAddPatient} variant="outline">
                  Add New Patient
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <PatientFormDialog
          open={formOpen}
          onOpenChange={setFormOpen}
          patient={selectedPatient}
          onSave={handleSavePatient}
        />
      </div>
    </DashboardLayout>
  );
};

export default Patients;
