
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Activity, Thermometer, Droplet, Scale } from "lucide-react";
import { useVitalsData } from "@/hooks/useVitalsData";

interface VitalsComparativeAnalysisProps {
  patientId: string;
}

const VitalsComparativeAnalysis: React.FC<VitalsComparativeAnalysisProps> = ({ patientId }) => {
  const { vitals, isLoading, error, getComparativeAnalysis } = useVitalsData(patientId);
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month");
  
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
            <p className="text-destructive">Failed to load comparative analysis data.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const analysis = getComparativeAnalysis(timeRange);
  
  if (!analysis) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-muted-foreground">Not enough data for comparative analysis.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Comparative Analysis</CardTitle>
            <CardDescription>
              Compare vital statistics over time
            </CardDescription>
          </div>
          <div>
            <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as any)} className="w-[400px]">
              <TabsList className="w-full">
                <TabsTrigger value="week" className="flex-1">Last Week</TabsTrigger>
                <TabsTrigger value="month" className="flex-1">Last Month</TabsTrigger>
                <TabsTrigger value="year" className="flex-1">Last Year</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Blood Pressure */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <Activity className="h-4 w-4 mr-2 text-primary" />
                <CardTitle className="text-sm">Blood Pressure</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-muted p-2">
                    <div className="text-xs text-muted-foreground mb-1">Avg Systolic</div>
                    <div className="text-xl font-semibold">{analysis.bloodPressure.average.systolic}</div>
                  </div>
                  <div className="rounded-lg bg-muted p-2">
                    <div className="text-xs text-muted-foreground mb-1">Avg Diastolic</div>
                    <div className="text-xl font-semibold">{analysis.bloodPressure.average.diastolic}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-muted/50 p-2">
                    <div className="text-xs text-muted-foreground mb-1">Min/Max Systolic</div>
                    <div className="text-sm">{analysis.bloodPressure.min.systolic} - {analysis.bloodPressure.max.systolic}</div>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-2">
                    <div className="text-xs text-muted-foreground mb-1">Min/Max Diastolic</div>
                    <div className="text-sm">{analysis.bloodPressure.min.diastolic} - {analysis.bloodPressure.max.diastolic}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Heart Rate */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <Heart className="h-4 w-4 mr-2 text-red-500" />
                <CardTitle className="text-sm">Heart Rate</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="rounded-lg bg-muted p-2">
                  <div className="text-xs text-muted-foreground mb-1">Average</div>
                  <div className="text-xl font-semibold">{analysis.heartRate.average} <span className="text-sm font-normal">bpm</span></div>
                </div>
                <div className="rounded-lg bg-muted/50 p-2">
                  <div className="text-xs text-muted-foreground mb-1">Range</div>
                  <div className="text-sm">{analysis.heartRate.min} - {analysis.heartRate.max} bpm</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Temperature */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <Thermometer className="h-4 w-4 mr-2 text-orange-500" />
                <CardTitle className="text-sm">Temperature</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="rounded-lg bg-muted p-2">
                  <div className="text-xs text-muted-foreground mb-1">Average</div>
                  <div className="text-xl font-semibold">{analysis.temperature.average.toFixed(1)} <span className="text-sm font-normal">°F</span></div>
                </div>
                <div className="rounded-lg bg-muted/50 p-2">
                  <div className="text-xs text-muted-foreground mb-1">Range</div>
                  <div className="text-sm">{analysis.temperature.min.toFixed(1)} - {analysis.temperature.max.toFixed(1)} °F</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Oxygen Saturation */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <Droplet className="h-4 w-4 mr-2 text-blue-500" />
                <CardTitle className="text-sm">O₂ Saturation</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="rounded-lg bg-muted p-2">
                  <div className="text-xs text-muted-foreground mb-1">Average</div>
                  <div className="text-xl font-semibold">{analysis.oxygenSaturation.average} <span className="text-sm font-normal">%</span></div>
                </div>
                <div className="rounded-lg bg-muted/50 p-2">
                  <div className="text-xs text-muted-foreground mb-1">Range</div>
                  <div className="text-sm">{analysis.oxygenSaturation.min} - {analysis.oxygenSaturation.max} %</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weight */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <Scale className="h-4 w-4 mr-2 text-purple-500" />
                <CardTitle className="text-sm">Weight</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="rounded-lg bg-muted p-2">
                  <div className="text-xs text-muted-foreground mb-1">Average</div>
                  <div className="text-xl font-semibold">{analysis.weight.average.toFixed(1)} <span className="text-sm font-normal">kg</span></div>
                </div>
                <div className="rounded-lg bg-muted/50 p-2">
                  <div className="text-xs text-muted-foreground mb-1">Range</div>
                  <div className="text-sm">{analysis.weight.min.toFixed(1)} - {analysis.weight.max.toFixed(1)} kg</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default VitalsComparativeAnalysis;
