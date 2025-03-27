
import React from "react";
import { ArrowLeft, Pill, Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";

const MedicationsPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/dashboard");
  };

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
            <Button variant="outline" size="sm">
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
          <Input 
            placeholder="Search medications..." 
            className="max-w-md"
            icon={<Search className="h-4 w-4 text-muted-foreground" />}
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
              {[
                { name: "Lisinopril", dosage: "10mg", schedule: "Once daily", type: "Prescription" },
                { name: "Metformin", dosage: "500mg", schedule: "Twice daily", type: "Prescription" },
                { name: "Atorvastatin", dosage: "20mg", schedule: "Once daily at bedtime", type: "Prescription" },
                { name: "Multivitamin", dosage: "1 tablet", schedule: "Once daily", type: "OTC" }
              ].map((med, idx) => (
                <MedicationCard 
                  key={idx}
                  name={med.name}
                  dosage={med.dosage}
                  schedule={med.schedule}
                  type={med.type}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Amoxicillin", dosage: "500mg", schedule: "3x daily", type: "Prescription", endDate: "01/15/2024" },
                { name: "Prednisone", dosage: "20mg tapering", schedule: "As directed", type: "Prescription", endDate: "11/30/2023" }
              ].map((med, idx) => (
                <MedicationCard 
                  key={idx}
                  name={med.name}
                  dosage={med.dosage}
                  schedule={med.schedule}
                  type={med.type}
                  endDate={med.endDate}
                  isHistorical={true}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="interactions" className="space-y-4">
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-4">
                No potential interactions have been identified between your current medications.
              </p>
              <Button variant="outline" size="sm">Run Interaction Check</Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

interface MedicationCardProps {
  name: string;
  dosage: string;
  schedule: string;
  type: string;
  endDate?: string;
  isHistorical?: boolean;
}

const MedicationCard: React.FC<MedicationCardProps> = ({ 
  name, 
  dosage, 
  schedule, 
  type,
  endDate,
  isHistorical
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{name}</CardTitle>
          <Pill className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription>
          {dosage}
          {isHistorical && endDate && ` • Ended: ${endDate}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Schedule:</span>
            <span>{schedule}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Type:</span>
            <Badge variant={type === "Prescription" ? "default" : "outline"}>
              {type}
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="outline" size="sm" className="w-full">
          {isHistorical ? "View History" : "Manage"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MedicationsPage;
