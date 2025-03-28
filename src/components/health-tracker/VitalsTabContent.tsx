
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Plus, ArrowUpRight, ArrowDownRight, Heart, Thermometer, Droplets, LineChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useHealthData, VitalRecord } from "@/hooks/health-tracker/useHealthData";
import VitalCard from "./VitalCard";

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewVital({
      ...newVital,
      [name]: name === 'notes' ? value : Number(value)
    });
  };

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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Vitals
            </Button>
          </DialogTrigger>
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <VitalCard 
          title="Blood Pressure"
          value={`${vitalRecords[0]?.systolic}/${vitalRecords[0]?.diastolic}`}
          unit="mmHg"
          icon={<ArrowUpRight className="h-4 w-4 text-red-500" />}
          trend={
            vitalRecords[0]?.systolic < vitalRecords[1]?.systolic ? "down" : 
            vitalRecords[0]?.systolic > vitalRecords[1]?.systolic ? "up" : "neutral"
          }
          trendDirection={
            vitalRecords[0]?.systolic < vitalRecords[1]?.systolic ? "down" : 
            vitalRecords[0]?.systolic > vitalRecords[1]?.systolic ? "up" : "neutral"
          }
          lastUpdated="Last recorded today"
        />
        
        <VitalCard 
          title="Heart Rate"
          value={vitalRecords[0]?.heartRate.toString() || "72"}
          unit="bpm"
          icon={<Heart className="h-4 w-4 text-red-500" />}
          trend={
            vitalRecords[0]?.heartRate < vitalRecords[1]?.heartRate ? "down" : 
            vitalRecords[0]?.heartRate > vitalRecords[1]?.heartRate ? "up" : "neutral"
          }
          trendDirection={
            vitalRecords[0]?.heartRate < vitalRecords[1]?.heartRate ? "down" : 
            vitalRecords[0]?.heartRate > vitalRecords[1]?.heartRate ? "up" : "neutral"
          }
          lastUpdated="Last recorded today"
        />
        
        <VitalCard 
          title="Temperature"
          value={vitalRecords[0]?.temperature?.toString() || "98.6"}
          unit="°F"
          icon={<Thermometer className="h-4 w-4 text-red-500" />}
          trend={
            (vitalRecords[0]?.temperature || 0) < (vitalRecords[1]?.temperature || 0) ? "down" : 
            (vitalRecords[0]?.temperature || 0) > (vitalRecords[1]?.temperature || 0) ? "up" : "neutral"
          }
          trendDirection={
            (vitalRecords[0]?.temperature || 0) < (vitalRecords[1]?.temperature || 0) ? "down" : 
            (vitalRecords[0]?.temperature || 0) > (vitalRecords[1]?.temperature || 0) ? "up" : "neutral"
          }
          lastUpdated="Last recorded today"
        />
        
        <VitalCard 
          title="Oxygen Saturation"
          value={vitalRecords[0]?.oxygenSaturation?.toString() || "98"}
          unit="%"
          icon={<Droplets className="h-4 w-4 text-blue-500" />}
          trend={
            (vitalRecords[0]?.oxygenSaturation || 0) < (vitalRecords[1]?.oxygenSaturation || 0) ? "down" : 
            (vitalRecords[0]?.oxygenSaturation || 0) > (vitalRecords[1]?.oxygenSaturation || 0) ? "up" : "neutral"
          }
          trendDirection={
            (vitalRecords[0]?.oxygenSaturation || 0) < (vitalRecords[1]?.oxygenSaturation || 0) ? "down" : 
            (vitalRecords[0]?.oxygenSaturation || 0) > (vitalRecords[1]?.oxygenSaturation || 0) ? "up" : "neutral"
          }
          lastUpdated="Last recorded today"
        />
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Blood Pressure</TableHead>
                <TableHead>Heart Rate</TableHead>
                <TableHead>Temperature</TableHead>
                <TableHead>O₂ Saturation</TableHead>
                <TableHead>Glucose</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vitalRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.systolic}/{record.diastolic} mmHg</TableCell>
                  <TableCell>{record.heartRate} bpm</TableCell>
                  <TableCell>{record.temperature}°F</TableCell>
                  <TableCell>{record.oxygenSaturation}%</TableCell>
                  <TableCell>{record.glucoseLevel} mg/dL</TableCell>
                  <TableCell className="max-w-[200px] truncate">{record.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button variant="outline" className="flex items-center gap-2">
          <LineChart className="h-4 w-4" />
          View Trends
        </Button>
      </div>
    </div>
  );
};

export default VitalsTabContent;
