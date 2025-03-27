
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Patient } from "@/types/patient";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { patientSchema, PatientFormValues, mapFormValuesToPatient, mapPatientToFormValues } from "./PatientFormTypes";
import BasicInfoForm from "./form-sections/BasicInfoForm";
import InsuranceForm from "./form-sections/InsuranceForm";
import MedicalInfoForm from "./form-sections/MedicalInfoForm";
import EmergencyContactForm from "./form-sections/EmergencyContactForm";

interface PatientFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient: Patient | null;
  onSave: (patient: Patient, isNew: boolean) => void;
  onSubmit?: (data: any) => void; // For backward compatibility
}

const PatientFormDialog: React.FC<PatientFormDialogProps> = ({
  open,
  onOpenChange,
  patient,
  onSave,
  onSubmit
}) => {
  const isNew = !patient;
  
  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: mapPatientToFormValues(patient)
  });

  const handleSubmit = (data: PatientFormValues) => {
    // Convert the form data to a Patient object
    const patientData = mapFormValuesToPatient(data);
    
    // Support both the new onSave and legacy onSubmit patterns
    if (onSave) {
      onSave(patientData, isNew);
    } else if (onSubmit) {
      onSubmit(patientData);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isNew ? "Add New Patient" : "Edit Patient"}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <Tabs defaultValue="basic">
              <TabsList className="mb-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="insurance">Insurance</TabsTrigger>
                <TabsTrigger value="medical">Medical Info</TabsTrigger>
                <TabsTrigger value="emergency">Emergency Contact</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic">
                <BasicInfoForm form={form} />
              </TabsContent>
              
              <TabsContent value="insurance">
                <InsuranceForm form={form} />
              </TabsContent>
              
              <TabsContent value="medical">
                <MedicalInfoForm form={form} />
              </TabsContent>
              
              <TabsContent value="emergency">
                <EmergencyContactForm form={form} />
              </TabsContent>
            </Tabs>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {isNew ? "Add Patient" : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PatientFormDialog;
