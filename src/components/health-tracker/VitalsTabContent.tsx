
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { LineChart, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useHealthData, VitalRecord } from "@/hooks/health-tracker/useHealthData";
import VitalForm from "./vitals/VitalForm";
import VitalCardsList from "./vitals/VitalCardsList";
import VitalRecordsTable from "./vitals/VitalRecordsTable";

const VitalsTabContent: React.FC = () => {
  const { vitalRecords, addVitalRecord } = useHealthData();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newVital, setNewVital] = useState<Partial<VitalRecord>>({
    date: new Date().toISOString().split('T')[0],
    systolic: 120,
    diastolic: 80,
    heartRate: 72,
    temperature: 98.6,
    oxygenSaturation: 98,
    glucoseLevel: 85,
    notes: ''
  });

  const handleAddVital = () => {
    if (!newVital.date || !newVital.systolic || !newVital.diastolic || !newVital.heartRate) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }

    addVitalRecord(newVital as Omit<VitalRecord, 'id'>);
    toast({
      title: "Vitals Added",
      description: "Your vitals have been recorded successfully",
      variant: "success"
    });
    setIsDialogOpen(false);
    setNewVital({
      date: new Date().toISOString().split('T')[0],
      systolic: 120,
      diastolic: 80,
      heartRate: 72,
      temperature: 98.6,
      oxygenSaturation: 98,
      glucoseLevel: 85,
      notes: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Vital Signs</h3>
        {/* Wrap the DialogTrigger with Dialog component */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Vitals
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>

      <VitalCardsList vitalRecords={vitalRecords} />
      
      <VitalRecordsTable vitalRecords={vitalRecords} />
      
      <div className="flex justify-end">
        <Button variant="outline" className="flex items-center gap-2">
          <LineChart className="h-4 w-4" />
          View Trends
        </Button>
      </div>

      <VitalForm 
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        newVital={newVital}
        setNewVital={setNewVital}
        handleAddVital={handleAddVital}
      />
    </div>
  );
};

export default VitalsTabContent;
