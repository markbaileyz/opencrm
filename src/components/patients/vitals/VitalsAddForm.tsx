
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface VitalsAddFormProps {
  onSave: (data: any) => void;
  onCancel: () => void;
}

const VitalsAddForm: React.FC<VitalsAddFormProps> = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    systolic: 120,
    diastolic: 80,
    heartRate: 72,
    temperature: 98.6,
    respiratoryRate: 16,
    oxygenSaturation: 98,
    weight: 70,
    recordedBy: "",
    notes: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "date" || name === "recordedBy" || name === "notes" ? value : Number(value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      bloodPressure: `${formData.systolic}/${formData.diastolic}`
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Record New Vital Signs</h2>
        <p className="text-sm text-muted-foreground">Enter the latest measurements for this patient</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="recordedBy">Recorded By</Label>
          <Input
            id="recordedBy"
            name="recordedBy"
            value={formData.recordedBy}
            onChange={handleChange}
            placeholder="Name of recorder"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="systolic">Systolic (mmHg)</Label>
          <Input
            id="systolic"
            name="systolic"
            type="number"
            value={formData.systolic}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="diastolic">Diastolic (mmHg)</Label>
          <Input
            id="diastolic"
            name="diastolic"
            type="number"
            value={formData.diastolic}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
          <Input
            id="heartRate"
            name="heartRate"
            type="number"
            value={formData.heartRate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="temperature">Temperature (°F)</Label>
          <Input
            id="temperature"
            name="temperature"
            type="number"
            step="0.1"
            value={formData.temperature}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="respiratoryRate">Respiratory Rate (breaths/min)</Label>
          <Input
            id="respiratoryRate"
            name="respiratoryRate"
            type="number"
            value={formData.respiratoryRate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="oxygenSaturation">Oxygen Saturation (%)</Label>
          <Input
            id="oxygenSaturation"
            name="oxygenSaturation"
            type="number"
            value={formData.oxygenSaturation}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="weight">Weight (kg)</Label>
        <Input
          id="weight"
          name="weight"
          type="number"
          step="0.1"
          value={formData.weight}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Any additional observations or notes"
          className="min-h-[80px]"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save Vitals
        </Button>
      </div>
    </form>
  );
};

export default VitalsAddForm;
