
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { VitalRecord } from "@/hooks/health-tracker/useHealthData";
import { useToast } from "@/hooks/use-toast";

interface VitalFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  newVital: Partial<VitalRecord>;
  setNewVital: React.Dispatch<React.SetStateAction<Partial<VitalRecord>>>;
  handleAddVital: () => void;
}

const VitalForm: React.FC<VitalFormProps> = ({
  isOpen,
  setIsOpen,
  newVital,
  setNewVital,
  handleAddVital
}) => {
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewVital({
      ...newVital,
      [name]: name === 'notes' ? value : Number(value)
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Record New Vitals</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Input 
              id="date"
              name="date"
              type="date"
              value={newVital.date || ''}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="systolic">Systolic (mmHg)</Label>
              <Input 
                id="systolic"
                name="systolic"
                type="number"
                value={newVital.systolic || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="diastolic">Diastolic (mmHg)</Label>
              <Input 
                id="diastolic"
                name="diastolic"
                type="number"
                value={newVital.diastolic || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
              <Input 
                id="heartRate"
                name="heartRate"
                type="number"
                value={newVital.heartRate || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="temperature">Temperature (°F)</Label>
              <Input 
                id="temperature"
                name="temperature"
                type="number"
                step="0.1"
                value={newVital.temperature || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="oxygenSaturation">Oxygen Saturation (%)</Label>
              <Input 
                id="oxygenSaturation"
                name="oxygenSaturation"
                type="number"
                value={newVital.oxygenSaturation || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="glucoseLevel">Glucose (mg/dL)</Label>
              <Input 
                id="glucoseLevel"
                name="glucoseLevel"
                type="number"
                value={newVital.glucoseLevel || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea 
              id="notes"
              name="notes"
              placeholder="Add any additional notes"
              value={newVital.notes || ''}
              onChange={handleInputChange}
            />
          </div>
          
          <Button className="w-full" onClick={handleAddVital}>
            Save Vitals
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VitalForm;
