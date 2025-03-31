
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Activity, Heart, Thermometer, Droplet, Scale } from "lucide-react";
import { useVitalsData } from "@/hooks/useVitalsData";
import VitalsChart from "./vitals/VitalsChart";
import VitalsInteractiveChart from "./vitals/VitalsInteractiveChart";
import VitalsComparativeAnalysis from "./vitals/VitalsComparativeAnalysis";
import VitalsAddForm from "./vitals/VitalsAddForm";
import VitalsTable from "./vitals/VitalsTable";
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface PatientVitalsProps {
  patientId: string;
}

const PatientVitals: React.FC<PatientVitalsProps> = ({ patientId }) => {
  const { vitals, isLoading, error, addVitalReading } = useVitalsData(patientId);
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week");
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !vitals) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-destructive">Failed to load vital signs data.</p>
            <Button variant="outline" size="sm" className="mt-4">Retry</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleAddVitals = (data: any) => {
    addVitalReading(data);
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Vital Signs</h2>
          <p className="text-muted-foreground">Track and monitor patient vital signs over time</p>
        </div>

        <div className="flex gap-2">
          <select
            className="border rounded p-2 text-sm"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="year">Last Year</option>
          </select>

          <AlertDialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <AlertDialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Record Vitals
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="sm:max-w-[425px]">
              <VitalsAddForm onSave={handleAddVitals} onCancel={() => setIsFormOpen(false)} />
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <Activity className="h-4 w-4 mr-2 text-primary" />
              <CardTitle className="text-lg">Blood Pressure</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{vitals.bloodPressure.current}</div>
            <div className="text-sm text-muted-foreground">mmHg</div>
            {vitals.bloodPressure.trend && (
              <div className={`text-sm mt-1 flex items-center ${
                vitals.bloodPressure.trend === "up" ? "text-red-500" : 
                vitals.bloodPressure.trend === "down" ? "text-green-500" : 
                "text-muted-foreground"
              }`}>
                {vitals.bloodPressure.trend === "up" ? "↑" : 
                 vitals.bloodPressure.trend === "down" ? "↓" : "→"} 
                {vitals.bloodPressure.trend === "stable" ? "Stable" : `${vitals.bloodPressure.trend === "up" ? "Higher" : "Lower"} than last reading`}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <Heart className="h-4 w-4 mr-2 text-red-500" />
              <CardTitle className="text-lg">Heart Rate</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{vitals.heartRate.current}</div>
            <div className="text-sm text-muted-foreground">bpm</div>
            {vitals.heartRate.trend && (
              <div className={`text-sm mt-1 flex items-center ${
                vitals.heartRate.trend === "up" ? "text-red-500" : 
                vitals.heartRate.trend === "down" ? "text-green-500" : 
                "text-muted-foreground"
              }`}>
                {vitals.heartRate.trend === "up" ? "↑" : 
                 vitals.heartRate.trend === "down" ? "↓" : "→"} 
                {vitals.heartRate.trend === "stable" ? "Stable" : `${vitals.heartRate.trend === "up" ? "Higher" : "Lower"} than last reading`}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <Thermometer className="h-4 w-4 mr-2 text-orange-500" />
              <CardTitle className="text-lg">Temperature</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{vitals.temperature.current.toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">°F</div>
            {vitals.temperature.trend && (
              <div className={`text-sm mt-1 flex items-center ${
                vitals.temperature.trend === "up" ? "text-red-500" : 
                vitals.temperature.trend === "down" ? "text-green-500" : 
                "text-muted-foreground"
              }`}>
                {vitals.temperature.trend === "up" ? "↑" : 
                 vitals.temperature.trend === "down" ? "↓" : "→"} 
                {vitals.temperature.trend === "stable" ? "Stable" : `${vitals.temperature.trend === "up" ? "Higher" : "Lower"} than last reading`}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <Droplet className="h-4 w-4 mr-2 text-blue-500" />
              <CardTitle className="text-lg">Oxygen Saturation</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{vitals.oxygenSaturation.current}</div>
            <div className="text-sm text-muted-foreground">%</div>
            {vitals.oxygenSaturation.trend && (
              <div className={`text-sm mt-1 flex items-center ${
                vitals.oxygenSaturation.trend === "down" ? "text-red-500" : 
                vitals.oxygenSaturation.trend === "up" ? "text-green-500" : 
                "text-muted-foreground"
              }`}>
                {vitals.oxygenSaturation.trend === "up" ? "↑" : 
                 vitals.oxygenSaturation.trend === "down" ? "↓" : "→"} 
                {vitals.oxygenSaturation.trend === "stable" ? "Stable" : `${vitals.oxygenSaturation.trend === "up" ? "Higher" : "Lower"} than last reading`}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <Scale className="h-4 w-4 mr-2 text-purple-500" />
              <CardTitle className="text-lg">Weight</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{vitals.weight.current.toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">kg</div>
            {vitals.weight.trend && (
              <div className={`text-sm mt-1 flex items-center ${
                vitals.weight.trend === "up" ? "text-amber-500" : 
                vitals.weight.trend === "down" ? "text-blue-500" : 
                "text-muted-foreground"
              }`}>
                {vitals.weight.trend === "up" ? "↑" : 
                 vitals.weight.trend === "down" ? "↓" : "→"} 
                {vitals.weight.trend === "stable" ? "Stable" : `${vitals.weight.trend === "up" ? "Higher" : "Lower"} than last reading`}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="charts">
        <TabsList>
          <TabsTrigger value="charts">Standard Charts</TabsTrigger>
          <TabsTrigger value="interactive">Interactive Charts</TabsTrigger>
          <TabsTrigger value="comparative">Comparative Analysis</TabsTrigger>
          <TabsTrigger value="table">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="charts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <VitalsChart 
              data={vitals.chartData}
              vitalType="bloodPressure"
              title="Blood Pressure History"
              description="Systolic and diastolic readings over time"
              unit="mmHg"
              normalRange={{ min: 90, max: 130 }}
            />
            
            <VitalsChart 
              data={vitals.chartData}
              vitalType="heartRate"
              title="Heart Rate History"
              description="Pulse readings over time"
              unit="bpm"
              normalRange={{ min: 60, max: 100 }}
            />
            
            <VitalsChart 
              data={vitals.chartData}
              vitalType="temperature"
              title="Temperature History"
              description="Body temperature readings over time"
              unit="°F"
              normalRange={{ min: 97, max: 99 }}
            />
            
            <VitalsChart 
              data={vitals.chartData}
              vitalType="oxygenSaturation"
              title="Oxygen Saturation History"
              description="Blood oxygen level readings over time"
              unit="%"
              normalRange={{ min: 95, max: 100 }}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="interactive">
          <VitalsInteractiveChart
            data={vitals.chartData}
            title="Interactive Vital Signs Explorer"
            description="Select which vital signs to display and analyze patterns"
          />
        </TabsContent>
        
        <TabsContent value="comparative">
          <VitalsComparativeAnalysis patientId={patientId} />
        </TabsContent>
        
        <TabsContent value="table">
          <VitalsTable readings={vitals.readings} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientVitals;
