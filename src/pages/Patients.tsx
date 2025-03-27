
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import PatientList from "@/components/patients/PatientList";
import PatientDetails from "@/components/patients/PatientDetails";
import PatientFormDialog from "@/components/patients/PatientFormDialog";
import { useToast } from "@/hooks/use-toast";

const Patients = () => {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

  // Mock patient data - in a real app, this would come from an API
  const patients = [
    {
      id: "1",
      name: "John Smith",
      dateOfBirth: "1980-05-15",
      gender: "male",
      phone: "(555) 123-4567",
      email: "john.smith@example.com",
      address: "123 Main St, Anytown, USA",
      insurance: {
        provider: "Blue Cross",
        policyNumber: "BC123456789",
        group: "GRP-1234"
      },
      status: "active",
      lastVisit: "2023-11-15",
      medicalHistory: [
        { condition: "Hypertension", diagnosedDate: "2018-03-10" },
        { condition: "Type 2 Diabetes", diagnosedDate: "2019-07-22" }
      ]
    },
    {
      id: "2",
      name: "Sarah Johnson",
      dateOfBirth: "1992-09-23",
      gender: "female",
      phone: "(555) 987-6543",
      email: "sarah.johnson@example.com",
      address: "456 Oak Ave, Somewhere, USA",
      insurance: {
        provider: "Aetna",
        policyNumber: "AET987654321",
        group: "GRP-5678"
      },
      status: "active",
      lastVisit: "2023-12-01",
      medicalHistory: [
        { condition: "Asthma", diagnosedDate: "2010-05-17" }
      ]
    },
    {
      id: "3",
      name: "Michael Chen",
      dateOfBirth: "1975-11-08",
      gender: "male",
      phone: "(555) 456-7890",
      email: "michael.chen@example.com",
      address: "789 Pine St, Nowhere, USA",
      insurance: {
        provider: "UnitedHealthcare",
        policyNumber: "UHC567891234",
        group: "GRP-9012"
      },
      status: "inactive",
      lastVisit: "2023-09-10",
      medicalHistory: [
        { condition: "Arthritis", diagnosedDate: "2015-12-03" },
        { condition: "High Cholesterol", diagnosedDate: "2016-02-14" }
      ]
    },
    {
      id: "4",
      name: "Emily Rodriguez",
      dateOfBirth: "1988-03-12",
      gender: "female",
      phone: "(555) 789-0123",
      email: "emily.rodriguez@example.com",
      address: "101 Maple Dr, Elsewhere, USA",
      insurance: {
        provider: "Cigna",
        policyNumber: "CG432109876",
        group: "GRP-3456"
      },
      status: "pending",
      lastVisit: null,
      medicalHistory: []
    }
  ];

  const handleViewDetails = (patientId: string) => {
    setSelectedPatientId(patientId);
  };

  const handleAddPatient = () => {
    setIsFormOpen(true);
  };

  const handleCloseDetails = () => {
    setSelectedPatientId(null);
  };

  const handleFormSubmit = (data: any) => {
    // In a real app, this would save the patient to an API
    console.log("Form submitted:", data);
    setIsFormOpen(false);
    
    toast({
      title: "Patient added",
      description: "The patient has been successfully added.",
    });
  };

  const selectedPatient = patients.find(p => p.id === selectedPatientId);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Patients</h1>
          <p className="text-muted-foreground">
            Manage patient records and medical history
          </p>
        </div>
        
        {selectedPatient ? (
          <PatientDetails 
            patient={selectedPatient} 
            onBack={handleCloseDetails}
          />
        ) : (
          <PatientList 
            patients={patients}
            onViewDetails={handleViewDetails}
            onAddPatient={handleAddPatient}
          />
        )}
        
        <PatientFormDialog
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          onSubmit={handleFormSubmit}
        />
      </div>
    </DashboardLayout>
  );
};

export default Patients;
