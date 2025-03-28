
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Activity, Plus, Calendar, ArrowUp, ArrowDown } from "lucide-react";
import { useVitalsData } from "@/hooks/useVitalsData";

interface PatientVitalsProps {
  patientId: string;
}

const PatientVitals: React.FC<PatientVitalsProps> = ({ patientId }) => {
  const { vitals, isLoading, error } = useVitalsData(patientId);
  const [timeRange, setTimeRange] = useState("recent");
  
  if (isLoading) {
    return <div className="flex justify-center p-8">Loading vitals data...</div>;
  }
  
  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center p-6">
            <p className="text-destructive">Error loading vitals data</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold flex items-center">
          <Activity className="mr-2 h-5 w-5 text-primary" />
          Patient Vitals
        </h2>
        
        <div className="flex items-center gap-2">
          <Tabs value={timeRange} onValueChange={setTimeRange}>
            <TabsList>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="month">30 Days</TabsTrigger>
              <TabsTrigger value="year">12 Months</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            Record New
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <VitalsCard
          title="Blood Pressure"
          value={vitals?.bloodPressure.current || "N/A"}
          trend={vitals?.bloodPressure.trend}
          history={vitals?.bloodPressure.history}
          unit="mmHg"
        />
        
        <VitalsCard
          title="Heart Rate"
          value={vitals?.heartRate.current?.toString() || "N/A"}
          trend={vitals?.heartRate.trend}
          history={vitals?.heartRate.history?.map(item => ({
            date: item.date,
            value: item.value.toString()
          }))}
          unit="bpm"
        />
        
        <VitalsCard
          title="Temperature"
          value={vitals?.temperature.current?.toString() || "N/A"}
          trend={vitals?.temperature.trend}
          history={vitals?.temperature.history?.map(item => ({
            date: item.date,
            value: item.value.toString()
          }))}
          unit="°F"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <VitalsCard
          title="Respiratory Rate"
          value={vitals?.respiratoryRate.current?.toString() || "N/A"}
          trend={vitals?.respiratoryRate.trend}
          history={vitals?.respiratoryRate.history?.map(item => ({
            date: item.date,
            value: item.value.toString()
          }))}
          unit="breaths/min"
        />
        
        <VitalsCard
          title="Oxygen Saturation"
          value={vitals?.oxygenSaturation.current?.toString() || "N/A"}
          trend={vitals?.oxygenSaturation.trend}
          history={vitals?.oxygenSaturation.history?.map(item => ({
            date: item.date,
            value: item.value.toString()
          }))}
          unit="%"
        />
        
        <VitalsCard
          title="Weight"
          value={vitals?.weight.current?.toString() || "N/A"}
          trend={vitals?.weight.trend}
          history={vitals?.weight.history?.map(item => ({
            date: item.date,
            value: item.value.toString()
          }))}
          unit="kg"
        />
      </div>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Vitals History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vitals?.history?.length ? (
              vitals.history.map((entry, index) => (
                <div key={index} className="border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium">{entry.date}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{entry.recordedBy}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Blood Pressure</p>
                      <p>{entry.bloodPressure} mmHg</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Heart Rate</p>
                      <p>{entry.heartRate} bpm</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Temperature</p>
                      <p>{entry.temperature} °F</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground">No history available</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper component for each vital sign card
const VitalsCard = ({ 
  title, 
  value, 
  trend, 
  history, 
  unit 
}: { 
  title: string; 
  value: string; 
  trend?: 'up' | 'down' | 'stable'; 
  history?: { date: string; value: string }[];
  unit: string;
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-sm text-muted-foreground">{unit}</div>
        </div>
        
        {trend && (
          <div className="flex items-center mt-1">
            {trend === 'up' && <ArrowUp className="h-4 w-4 text-destructive mr-1" />}
            {trend === 'down' && <ArrowDown className="h-4 w-4 text-green-500 mr-1" />}
            <span className={
              trend === 'up' 
                ? 'text-xs text-destructive' 
                : trend === 'down' 
                  ? 'text-xs text-green-500' 
                  : 'text-xs text-muted-foreground'
            }>
              {trend === 'up' ? 'Increased' : trend === 'down' ? 'Decreased' : 'Stable'} from last reading
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PatientVitals;
