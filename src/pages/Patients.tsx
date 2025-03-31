
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import PatientList from "@/components/patients/PatientList";
import PatientDetails from "@/components/patients/PatientDetails";
import PatientFormDialog from "@/components/patients/PatientFormDialog";
import { useToast } from "@/hooks/use-toast";
import { PatientListItem } from "@/types/patientList";
import { Patient } from "@/types/patient";

const Patients = () => {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const { toast } = useToast();

  // Mock patient data - in a real app, this would come from an API
  const patients: PatientListItem[] = [
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
    setEditingPatient(null);
    setIsFormOpen(true);
  };

  const handleEditPatient = () => {
    if (selectedPatient) {
      // Convert the PatientListItem to a Patient for editing
      const patientToEdit: Patient = {
        id: selectedPatient.id,
        firstName: selectedPatient.name.split(' ')[0],
        lastName: selectedPatient.name.split(' ').slice(1).join(' '),
        dateOfBirth: selectedPatient.dateOfBirth,
        gender: selectedPatient.gender as any,
        email: selectedPatient.email,
        phone: selectedPatient.phone,
        address: selectedPatient.address,
        insuranceProvider: selectedPatient.insurance.provider,
        policyNumber: selectedPatient.insurance.policyNumber,
        groupNumber: selectedPatient.insurance.group,
        coverageType: "standard", // default value
        status: selectedPatient.status as any,
      };
      
      setEditingPatient(patientToEdit);
      setIsFormOpen(true);
    }
  };

  const handleCloseDetails = () => {
    setSelectedPatientId(null);
  };

  const handleDeletePatient = () => {
    // In a real app, this would delete the patient from an API
    toast({
      title: "Patient deleted",
      description: "The patient has been successfully deleted.",
    });
    setSelectedPatientId(null);
  };

  const handleSavePatient = (patientData: Patient, isNew: boolean) => {
    // In a real app, this would save the patient to an API
    console.log("Patient saved:", patientData, "isNew:", isNew);
    setIsFormOpen(false);
    
    toast({
      title: isNew ? "Patient added" : "Patient updated",
      description: `The patient has been successfully ${isNew ? "added" : "updated"}.`,
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
            patient={selectedPatient as any} 
            onEdit={handleEditPatient}
            onDelete={handleDeletePatient}
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
          patient={editingPatient}
          onSave={handleSavePatient}
        />
      </div>
    </DashboardLayout>
  );
};

export default Patients;
