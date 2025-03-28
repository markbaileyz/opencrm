
import React, { useState } from "react";
import { ArrowLeft, Pill, Plus, Search, Filter, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import MedicationDetail from "@/components/medications/MedicationDetail";
import MedicationHistory from "@/components/medications/MedicationHistory";
import MedicationInteractions from "@/components/medications/MedicationInteractions";
import { currentMedications, medicationHistory, medicationInteractions } from "@/data/medicationsData";

const MedicationsPage = () => {
  const navigate = useNavigate();
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [medicationDetailOpen, setMedicationDetailOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleOpenMedication = (medication) => {
    setSelectedMedication(medication);
    setMedicationDetailOpen(true);
  };

  const handleCloseMedication = () => {
    setMedicationDetailOpen(false);
  };

  const filteredMedications = searchTerm 
    ? currentMedications.filter(med => 
        med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.dosage.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : currentMedications;

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={handleBack} size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold">Medications</h1>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Medication
            </Button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search medications..." 
            className="max-w-md pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs defaultValue="current">
          <TabsList>
            <TabsTrigger value="current">Current Medications</TabsTrigger>
            <TabsTrigger value="history">Medication History</TabsTrigger>
            <TabsTrigger value="interactions">Interactions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMedications.length > 0 ? (
                filteredMedications.map((med) => (
                  <MedicationCard 
                    key={med.id}
                    medication={med}
                    onClick={() => handleOpenMedication(med)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-muted-foreground">No medications found matching your search</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4">
            <MedicationHistory history={medicationHistory} />
          </TabsContent>
          
          <TabsContent value="interactions" className="space-y-4">
            <MedicationInteractions 
              currentMedications={currentMedications.map(med => med.name)}
              interactions={medicationInteractions}
            />
          </TabsContent>
        </Tabs>

        <Dialog open={medicationDetailOpen} onOpenChange={setMedicationDetailOpen}>
          <DialogContent className="max-w-3xl overflow-y-auto max-h-[90vh]">
            {selectedMedication && (
              <MedicationDetail 
                medication={selectedMedication} 
                onClose={handleCloseMedication} 
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

interface MedicationCardProps {
  medication: any;
  onClick: () => void;
}

const MedicationCard: React.FC<MedicationCardProps> = ({ medication, onClick }) => {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold">{medication.name}</h3>
            <p className="text-sm text-muted-foreground">{medication.dosage}</p>
          </div>
          <Pill className="h-5 w-5 text-muted-foreground" />
        </div>
        
        <div className="space-y-2 text-sm mt-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Schedule:</span>
            <span>{medication.schedule}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Type:</span>
            <span className={medication.type === "Prescription" ? "text-blue-600" : "text-green-600"}>
              {medication.type}
            </span>
          </div>
          {medication.endDate && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Expires:</span>
              <span>{medication.endDate}</span>
            </div>
          )}
        </div>
        
        {medication.interactions && medication.interactions.some(i => i.severity === "high") && (
          <div className="mt-3 flex items-center gap-1 text-xs text-amber-600">
            <AlertTriangle className="h-3 w-3" />
            <span>Has important interactions</span>
          </div>
        )}
        
        <Button variant="outline" size="sm" className="w-full mt-4">
          View Details
        </Button>
      </div>
    </Card>
  );
};

export default MedicationsPage;
